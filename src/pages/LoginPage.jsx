import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../utils/api.js";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();

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
        <div>
            <h2>{isLoginMode ? "Login" : "Register"}</h2>
            <form onSubmit={isLoginMode ? handleLoginSubmit : handleRegisterSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {!isLoginMode && (
                    <>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="mnemonic">Mnemonic</label>
                            <textarea
                                id="mnemonic"
                                value={mnemonic}
                                onChange={(e) => setMnemonic(e.target.value)}
                                required
                                placeholder="Enter your recovery phrase (mnemonic)"
                            />
                        </div>
                    </>
                )}

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div style={{ color: "red" }}>{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? (isLoginMode ? "Logging in..." : "Registering...") : isLoginMode ? "Login" : "Register"}
                </button>
            </form>

            <div>
                <p>
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsLoginMode(!isLoginMode)}>
                        {isLoginMode ? "Register" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
