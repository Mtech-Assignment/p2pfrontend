import { useState, useEffect } from "react";
import { validateToken } from "./api.js";
import * as Log from "react-dom/test-utils";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Call the updated validateToken API function
                const response = await validateToken(token);

                if (response.success) {
                    setIsAuthenticated(true);
                } else {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("user");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                setIsAuthenticated(false);
                Log.error(error)
            } finally {
                setLoading(false);
            }
        };

        checkTokenValidity();
    }, []);

    return { isAuthenticated, loading };
};
