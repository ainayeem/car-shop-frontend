import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import Footer from "../footer/Footer";

const userRole = {
  ADMIN: "admin",
};

const MainLayout = () => {
  const cartData = useAppSelector((state) => state.cart);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const userRoleValue = (user as { role: string })?.role;
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const navbarItems = (
    <>
      {userRoleValue === userRole.ADMIN && (
        <>
          <Link
            to="/admin/admin-dashboard"
            className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/create-product"
            className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
          >
            Create Product
          </Link>
        </>
      )}
      <Link
        to="/"
        className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
      >
        Home
      </Link>
      <Link
        to="/shop"
        className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
      >
        Shop
      </Link>
      <Link
        to="/services"
        className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
      >
        Services
      </Link>

      <Link
        to="/about"
        className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
      >
        About
      </Link>
      {!user && (
        <Link
          to="/login"
          className="block px-3 py-2 text-gray-700 hover:text-customYellow transition-colors"
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-customYellow"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link to="/" className="ml-2 sm:ml-4">
                <span className="text-2xl sm:text-3xl font-bold">
                  <span className="text-customYellow">Car</span>Shop
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <nav className="flex space-x-8">{navbarItems}</nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="bg-customYellow p-2 rounded-full flex items-center justify-center relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart stroke-white"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>
                  {cartData.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white bg-yellow-500 rounded-full border-2 border-white">
                      {cartData.items.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* Profile Dropdown */}
              {user && (
                <div className="relative">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <div className="bg-customYellow p-2 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2"
                    >
                      <li>
                        <Link
                          to="/my-order"
                          className="hover:text-customYellow"
                        >
                          My Order
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/change-password"
                          className="hover:text-customYellow"
                        >
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="hover:text-customYellow"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {navbarItems}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
