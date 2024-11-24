import './App.css'
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute element={<Dashboard />} />
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute element={<Dashboard />} />
        }
    ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default App
