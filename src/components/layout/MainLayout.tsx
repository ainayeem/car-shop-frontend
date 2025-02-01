import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

const userRole = {
  ADMIN: "admin",
};

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const userRoleValue = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navbarItems = (
    <>
      {userRoleValue === userRole.ADMIN && (
        <li>
          <Link to="/admin/adminDashboard">Dashboard</Link>
        </li>
      )}
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>

      {user ? (
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="w-[75%] mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-gray-500 font-semibold"
            >
              {navbarItems}
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl"></a> */}
          <div className="text-3xl font-bold flex items-center">
            <Link to="/">
              <span className="text-customYellow">Car</span>Shop
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-500 font-semibold gap-2">
            {navbarItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/*  */}
          <div className="">
            <Link
              to="/cart"
              className="relative flex items-center bg-yellow-100 hover:bg-customYellowHover duration-500 p-1 rounded-full hover: transition-all ease-in-out"
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

                <span className="absolute bottom-8 left-10 w-5 flex items-center justify-center text-xs font-semibold text-white bg-red-500 rounded-full border-2 border-white -translate-x-2 translate-y-2">
                  2
                </span>
              </div>
            </Link>
            {/*  */}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
