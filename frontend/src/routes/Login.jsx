import { useState } from "react";
import FlashMessage from "../helperComponents/FlashMessage.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponents/Loader.jsx";
import validateForm from "../utils/validateForm.js";

export default function Login() {
    const { dispatch } = useAuthContext();
    const [formData, setFormData] = useState({
        gmail: "",
        password: "",
    });
    const [message, setMessage] = useState(false);
    const [validation, setValidation] = useState({
        gmail: true,
        password: true,
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value,
        });

        setValidation({
            ...validation,
            [id]: value.trim() !== "",
        });
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm(validation, formData, setValidation)) {
            setMessage("Please fill in all required fields correctly.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);
            setMessage(data.message);

            if (response.ok) {
                dispatch({ type: "LOGIN", payload: data });
                navigate("/rolldice");
            }
        } catch (error) {
            setMessage("Unexpected Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                {message && <FlashMessage message={message} />}
                {loading && <Loader message={"Logging In"} />}
                <form className="space-y-4" onSubmit={loginUser}>
                    <div>
                        <label htmlFor="gmail" className="block text-sm font-medium text-gray-700">
                            Gmail
                        </label>
                        <input
                            type="email"
                            id="gmail"
                            value={formData.gmail}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                                validation.gmail ? "border-gray-300" : "border-red-500"
                            }`}
                            required
                        />
                        {!validation.gmail && <p className="text-red-500 text-xs mt-1">Please provide a valid email address.</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                                validation.password ? "border-gray-300" : "border-red-500"
                            }`}
                            required
                        />
                        {!validation.password && (
                            <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters long.</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    <Link to="/" className="text-indigo-600 hover:underline">
                        Not a user? Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}