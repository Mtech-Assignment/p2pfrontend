import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../utils/api";
import * as Log from "react-dom/test-utils"; // Import the validateToken function

const ProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // To track if authentication check is complete
    const [loading, setLoading] = useState(true); // To handle loading state

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                // Call validateToken API to check token validity
                const response = await validateToken(token);
                if (response.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                Log.error(error);
            } finally {
                setLoading(false);
            }
        };

        checkTokenValidity();
    }, []);

    // If loading, show nothing or a loading indicator
    if (loading) {
        return <div>Loading...</div>; // Or show a loading spinner, etc.
    }

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the protected route element
    return element;
};

export default ProtectedRoute;
