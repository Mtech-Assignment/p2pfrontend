import './App.css'
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Sell from "./pages/Sell.jsx";
import BuyTokenPage from "./pages/BuyTokenPage.jsx";
import MyItemsPage from "./pages/MyItemsPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import MyListedItemsPage from "./pages/MyListedItemsPage.jsx";
import ListedItemDetailsPage from "./pages/ListedItemDetailsPage.jsx";

function App() {

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute element={<Dashboard />} />
        },
        {
            path: "/login",
            element: <LoginPage />
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute element={<Dashboard />} />
        },
        {
            path: "/sell",
            element: <ProtectedRoute element={<Sell />} />
        },
        {
            path: "/my-items",
            element: <ProtectedRoute element={<MyItemsPage />} />
        },
        {
            path: "/buy-token",
            element: <ProtectedRoute element={<BuyTokenPage />} />
        },
        {
            path: "/my-items-page",
            element: <ProtectedRoute element={<MyItemsPage />} />
        },
        {
            path: "/transactions",
            element: <ProtectedRoute element={<TransactionsPage />} />
        },
        {
            path: "/my-listed-items",
            element: <ProtectedRoute element={<MyListedItemsPage />} />
        },
        {
            path: "/nft/:id",
            element: <ProtectedRoute element={<ListedItemDetailsPage />} />
        },
        {
            path: "/my-items/nft/:id",
            element: <ProtectedRoute element={<ListedItemDetailsPage />} />
        },
    ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default App
