import { useEffect, useState } from "react";

export default function FlashMessage({ message, duration = 3000, type = "info" }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const bgColor = type === "error" ? "bg-red-500" : type === "success" ? "bg-green-500" : "bg-blue-500";

    return (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white rounded-md shadow-lg ${bgColor}`}>
            <h1>{message}</h1>
        </div>
    );
}