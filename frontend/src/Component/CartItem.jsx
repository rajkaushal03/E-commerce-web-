import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { handleQuantityChange, handleRemoveFromCart } from "../utils/function";

const CartItem = ({ cart, setCart }) => {
  const { authUser } = useAuthContext();

  const handleDecrement = (itemId) =>
    handleQuantityChange(itemId, authUser, setCart, -1);

  const handleIncrement = (itemId) =>
    handleQuantityChange(itemId, authUser, setCart, 1);

  const handleRemove = (itemId) =>
    handleRemoveFromCart(itemId, cart, setCart, authUser);

  return (
    <div className="w-[80%] gap-8 px-8 flex flex-col">
      {cart.map((cartItem) => (
        <div
          className="w-full h-32 flex justify-between p-2 shadow-md"
          key={cartItem.id}
        >
          {/* Product Image */}
          <div className="bg-white cursor-pointer px-2 w-[15%]">
            <Link to="/detail" state={{ cartItem }}>
              <img
                className="w-full h-full p-3 hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                src={cartItem.image}
                alt={`Image of ${cartItem.title}`}
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex justify-between items-center h-full p-3 gap-3 w-[85%]">
            <h5 className="text-md font-semibold flex flex-col items-start">
              <Link to="/detail" state={{ cartItem }}>
                <span className="hover:underline cursor-pointer">
                  {cartItem.title}
                </span>
              </Link>
              <span className="text-md font-bold text-gray-400">
                ${cartItem.price}
              </span>
            </h5>

            {/* Actions */}
            <div className="flex items-center gap-3">
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
