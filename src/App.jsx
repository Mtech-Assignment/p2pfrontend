import './App.css'
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import CreateNftPage from "./pages/CreateNftPage.jsx";
import ListedItemsDetailPage from "./pages/ListedItemsDetailPage.jsx";
import MyItemsPage from "./pages/MyItemsPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import MyListedItemsPage from "./pages/MyListedItemsPage.jsx";
import OwnedItemsDetailPage from "./pages/OwnedItemsDetailPage.jsx";

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
            path: "/createnft",
            element: <ProtectedRoute element={<CreateNftPage />} />
        },
        {
            path: "/my-items",
            element: <ProtectedRoute element={<MyItemsPage />} />
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
            path: "/nft/:tokenId/:itemId",
            element: <ProtectedRoute element={<ListedItemsDetailPage />} />
        },
        {
            path: "/my-items/nft/:tokenId/:itemId",
            element: <ProtectedRoute element={<OwnedItemsDetailPage />} />
        },
    ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default App
