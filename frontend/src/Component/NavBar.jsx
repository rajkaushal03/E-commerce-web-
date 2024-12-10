import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { RiAdminLine } from "react-icons/ri";
import { useProductContext } from "../context/ProductContext";
import { handleLogout } from "../lib/function";
import { useAdminContext } from "../context/AdminContext";

const NavBar = () => {
  const { authUser, setAuthUser, AdminAccess } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  const { cart, total } = useProductContext();
  const { searchTerm, setSearchTerm } = useAdminContext();
  return (
    <div
      className={`navbar bg-base-100  border-b-4 py-3 sticky top-0 z-30 ${
        theme === "dark" ? "text-white " : ""
      }`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Amazon</a>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered 2xl:w-96 md:w-auto"
        />

        {/* profile  */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" btn btn-ghost btn-circle avatar"
          >
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={authUser?.picture} alt="u" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className=" flex justify-between" to="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            {AdminAccess ? (
              <li>
                <Link className=" flex justify-between" to="/admin">
                  Admin
                  <span className="badge">
                    <RiAdminLine />
                  </span>
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              <a className=" flex justify-between">
                Theme
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
                />
              </a>
            </li>
            <li
              onClick={() => {
                handleLogout(setAuthUser);
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
        {/* cart */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cart.length} Items</span>
              <span className="text-info">Subtotal: ${total}</span>
              <div className="card-actions">
                <Link className="btn btn-primary btn-block " to="/cart">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
