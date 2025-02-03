import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFound from "../components/notFound/NotFound";
import About from "../pages/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/CreateProduct";
import Cart from "../pages/Cart";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MyOrder from "../pages/MyOrder";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import SingleProduct from "../pages/SingleProduct";
import VerifyPayment from "../pages/VerifyPayment";

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
        path: "my-order",
        element: <MyOrder />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/verify-payment",
        element: <VerifyPayment />,
      },
      {
        path: "shop/product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "*",
        element: <NotFound />,
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
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "create-product",
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
