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
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-500 font-semibold gap-2">
            {navbarItems}
          </ul>
        </div>
        <div className="navbar-end">
          <div>cart</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
