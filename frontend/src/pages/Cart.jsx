import { handleQuantityChange, handleRemoveFromCart } from "../utils/function";
import { BsCart4 } from "react-icons/bs";
import { useAuthContext } from "../context/AuthContext";
import { toggleTheme } from "../lib/function";
import { Link } from "react-router-dom";

const Cart = ({ cart, total, setCart, theme, setTheme }) => {
  const { authUser } = useAuthContext();

  return (
    <div
      className={`flex flex-col w-full p-10 gap-8 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <div className="text-3xl p-3 font-bold flex justify-between ">
        <span className="flex gap-2">
          Shopping Cart...
          <BsCart4 />
        </span>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === "dark"}
            onChange={() => toggleTheme(setTheme)}
          />

          {/* Sun icon */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* Moon icon */}
          <svg
            className="swap-off h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div className="flex w-full ">
        <div className=" w-[80%] gap-8 px-8 flex flex-col ">
          {cart.map((cartItem) => {
            return (
              <div
                className="w-full h-32  justify-between shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]   flex p-2 "
                key={cartItem.id}
              >
                {/* image */}
                <div className="bg-white cursor-pointer  px-2 w-[15%]">
                  <Link to="/detail" state={{ cartItem }}>
                    <img
                      className="w-full h-full  p-3 relative hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                      src={cartItem.image}
                      alt={cartItem.title}
                    />
                  </Link>
                </div>
                <div className="flex  justify-between items-center h-full p-3 gap-3 w-[85%] ">
                  {/* product title */}

                  <h5 className="text-md  font-semibold tracking-tight h-1/2 text-wrap  flex flex-col   items-start gap-2 justify-center">
                    <Link to="/detail" state={{ cartItem }}>
                      <span className="hover:underline cursor-pointer">
                        {cartItem.title}
                      </span>
                    </Link>
                    <span className="text-md font-bold  text-gray-400">
                      ${cartItem.price}
                    </span>
                  </h5>

                  {/* button */}
                  <div className="flex justify-between   items-center w-[20%] p-4">
                    <div className="flex items-center justify-between w-[40%] border-2 p-2 ">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.id,
                            authUser,
                            setCart,
                            -1
                          )
                        }
                      >
                        -
                      </button>

                      <span className="px-2">{cartItem.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.id,
                            authUser,
                            setCart,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <div
                      onClick={() => {
                        handleRemoveFromCart(
                          cartItem.id,
                          cart,
                          setCart,
                          authUser
                        );
                      }}
                    >
                      <button className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col text-lg w-[20%] items-center gap-5 font-semibold rounded-lg p-5 h-full shadow-[0px_0px_20px_10px_#00000024]">
          <h1 className="w-full items-center justify-center flex gap-2">
            Subtotal(${cart.length} items):
            <span className="text-green-600">${total}</span>
          </h1>
          <button className="w-full items-center justify-center flex bg-blue-500 p-2 rounded-lg">
            Proceed to Buy...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
