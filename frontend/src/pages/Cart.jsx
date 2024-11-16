import { BsCart4 } from "react-icons/bs";
import CartItem from "../Component/CartItem";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { useThemeContext } from "../context/ThemeContext";
import { useProductContext } from "../context/ProductContext";

const Cart = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { cart, setCart, total } = useProductContext();

  return (
    <div
      className={`flex flex-col w-full p-10 gap-8 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      {/* Header */}
      <div className="text-3xl p-3 font-bold flex justify-between">
        <span className="flex gap-2">
          Shopping Cart... <BsCart4 />
        </span>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          {/* Theme icons */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-off h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      {/* Content */}
      {cart.length === 0 ? (
        <div className=" text-3xl font-semibold flex  flex-col items-center justify-center gap-5">
          <img src="public/empty-cart.png" />
          Your cart is empty!
          <Link to="/">
            <button className=" bg-blue-500 p-2 rounded-lg flex   items-center justify-center text-base gap-2 text-white">
              <GoHome />
              Go Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex w-full">
          {/* cart items */}
          <CartItem cart={cart} setCart={setCart} />

          {/* cart payment gateway */}
          <div className="flex flex-col text-lg w-[20%] items-center gap-5 font-semibold rounded-lg p-5 h-full shadow-md">
            <h1 className="w-full text-center flex gap-2">
              Subtotal ({cart.length} items):{" "}
              <span className="text-green-600">${total}</span>
            </h1>
            <Link to="/buy" className="w-full">
              <button className="w-full bg-blue-500 p-2 rounded-lg text-white">
                Proceed to Buy
              </button>
            </Link>

            <Link to="/" className="w-full">
              <button className="w-full bg-blue-500 p-2 rounded-lg flex gap-2  items-center justify-center text-base text-white">
                <GoHome />
                Go Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
