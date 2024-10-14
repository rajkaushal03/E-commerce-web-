import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const NavBar = ({ cart, total }) => {
  const { authUser, setAuthUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { credentials: "include" });
      const data = await res.json();
      console.log(data);
      setAuthUser(null);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="navbar bg-base-100  border-b-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Amazon</a>
      </div>

      <div className="flex-none">
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

        {/* profile  */}
        <div className="dropdown dropdown-end">
          {/* <div
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
            </div>
          </div> */}
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
            <Link to="/profile">
              <li>
                <a className=" flex justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
            </Link>
            <li>
              <a className=" flex justify-between">
                Theme
                <input
                  type="checkbox"
                  value="dark"
                  className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
                />
              </a>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
