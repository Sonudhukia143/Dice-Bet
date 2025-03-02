import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Loader from "../helperComponents/Loader";
import { useState } from "react";
import FlashMessage from "../helperComponents/FlashMessage.jsx";
import { useAuthContext } from "../context/AuthProvider.jsx";

export default function Navbar() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { dispatch, state } = useAuthContext();
    const navigate = useNavigate();

    async function logOut() {
        try {
            setLoading(true);
            const response = await fetch('https://dice-bet-alpha.vercel.app/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'LOGOUT', payload: null });
                setLoading(false);
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/');
                }, 50);
            } else {
                console.error('Failed to log out', data);
            }
        } catch (error) {
            setLoading(false);
            console.error('Logout request failed:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="navbar">
            {
                loading && <Loader props={"Logging Out"} />
            }
            {
                message && <FlashMessage message={message} duration={3000} type="success" />
            }
            <h1>BETEX</h1>
            <span className="routes">
                {
                    state.isLoggedIn
                        ?
                        <>
                            < NavLink to="/rolldice" className="navlink">Roll</NavLink>
                            <NavLink to="/logout" className="navlink" onClick={logOut}>Logout</NavLink>
                        </>
                        :
                        ""
                }
            </span>
        </div >
    )
}