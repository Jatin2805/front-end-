import React, { useState, useEffect } from "react";
import "../styles/LoginPage.css";
import handleLogin from "../api/handleLogin";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const hallNumber = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hallNumber="))
            ?.split("=")[1];

        if (hallNumber) {
            window.location.href = `/hall/${hallNumber}`;
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(username, password);
    };

    return (
        <div className="login-container">
            <div className="heading">
                <h1>Campus Connect</h1>
            </div>
            <div className="bottom-section">
                <div className="login-section">
                    <h2>Welcome, Coordinator!</h2>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="button-group">
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="image-section">
                    <img
                        src="/Assets/images/login_1.jpg"
                        alt="Project Related Image"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


