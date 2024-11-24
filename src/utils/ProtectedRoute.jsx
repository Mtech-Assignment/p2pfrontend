import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
