import { useState } from "react";
import FlashMessage from "../helperComponents/FlashMessage.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponents/Loader.jsx";
import validateForm from "../utils/validateForm.js";

export default function SignIn() {
    const { dispatch } = useAuthContext();
    const [formData, setFormData] = useState({
        username: "",
        gmail: "",
        password: "",
    });
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
    const [validation, setValidation] = useState({
        username: true,
        gmail: true,
        password: true,
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const createUser = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm(validation, formData, setValidation)) return;

        setLoading(true);
        try {
            const response = await fetch("https://dice-bet-alpha.vercel.app/api/signin", {
                method: "POST",
                credentials: "include",                
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                navigate("/rolldice");
                dispatch({ type: "SIGNIN", payload: data });
            }
        } catch (error) {
            setMessage("Unexpected Error" + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
                {loading && <Loader message={"Signing In"} />}
                {message && <FlashMessage message={message} />}
                <form onSubmit={createUser} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                                validation.username ? "border-gray-300" : "border-red-500"
                            }`}
                            required
                        />
                        {!validation.username && <p className="text-red-500 text-xs mt-1">Please provide a valid username.</p>}
                    </div>

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

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Already a user?
                    </Link>
                </p>
            </div>
        </div>
    );
}