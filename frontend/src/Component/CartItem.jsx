import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { handleQuantityChange, handleRemoveFromCart } from "../utils/function";
import { useProductContext } from "../context/ProductContext";

const CartItem = () => {
  const { authUser } = useAuthContext();
  const { cart, setCart } = useProductContext();

  const handleDecrement = (itemId) =>
    handleQuantityChange(itemId, authUser, setCart, -1);

  const handleIncrement = (itemId) =>
    handleQuantityChange(itemId, authUser, setCart, 1);

  const handleRemove = (itemId) =>
    handleRemoveFromCart(itemId, cart, setCart, authUser);

  return (
    <div className="md:w-[80%] w-full gap-8 md:px-8 flex flex-col">
      {cart.map((cartItem) => (
        <div
          className="w-full md:h-32 h-70 md:flex md:justify-between p-2 shadow-xl border-2 border-black rounded-lg"
          key={cartItem.id}
        >
          {/* Product Image */}
          <div className="bg-white cursor-pointer px-2 md:w-[15%] w-full h-48 md:h-full">
            <Link to="/detail" state={{ cartItem }}>
              <img
                className="w-full h-full p-3 hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                src={cartItem.image}
                alt={`Image of ${cartItem.title}`}
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="md:flex md:justify-between 2xl:text-lg text-xs md:items-center h-full p-3 gap-3 md:w-[85%] w-full">
            <h5 className="2xl:text-lg text-xs font-semibold flex flex-col items-start">
              <Link to="/detail" state={{ cartItem }}>
                <span className="hover:underline cursor-pointer">
                  {cartItem.title}
                </span>
              </Link>
            </h5>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-md font-bold text-gray-400">
                ${cartItem.price}
              </span>
              <div className="flex items-center border-2 p-2">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => handleDecrement(cartItem.id)}
                >
                  -
                </button>
                <span className="px-2">{cartItem.quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => handleIncrement(cartItem.id)}
                >
                  +
                </button>
              </div>

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 p-2 rounded-lg"
                onClick={() => handleRemove(cartItem.id)}
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
