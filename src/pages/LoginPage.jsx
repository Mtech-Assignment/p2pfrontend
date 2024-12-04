import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../utils/api.js";
import { Form } from "react-router";
import {useAuth} from "../utils/userAuth.js";

const LoginPage = () => {
    const { isAuthenticated } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate("/"); // Redirect to home if already logged in
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login(username, password);

            if (data.success) {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));

                navigate("/");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setError(`An error occurred. Please try again later: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await register(username, email, password, mnemonic);

            if (data.success) {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));

                navigate("/");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            setError(`An error occurred. Please try again later: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">{isLoginMode ? "Login" : "Register"}</h2>

                <Form onSubmit={isLoginMode ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {!isLoginMode && (
                        <>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="mnemonic" className="block text-sm font-medium text-gray-700">Mnemonic</label>
                                <textarea
                                    id="mnemonic"
                                    value={mnemonic}
                                    onChange={(e) => setMnemonic(e.target.value)}
                                    required
                                    placeholder="Enter your recovery phrase (mnemonic)"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-400"
                    >
                        {loading ? (isLoginMode ? "Logging in..." : "Registering...") : isLoginMode ? "Login" : "Register"}
                    </button>
                </Form>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            {isLoginMode ? "Register" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
