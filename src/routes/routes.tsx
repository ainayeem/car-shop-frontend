import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import About from "../pages/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/CreateProduct";
import Blog from "../pages/Blog";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
