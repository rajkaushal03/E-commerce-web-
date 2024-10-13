import { handleQuantity } from "../utils/function";
import { BsCart4 } from "react-icons/bs";

const Cart = ({ cart, total, Quantity, setQuantity, isCartVisible }) => {
  return (
    <>
      {isCartVisible ? (
        <div className="flex flex-col  w-full p-10"> 
        <div className="text-3xl p-3 font-bold flex">Cart item...<BsCart4 /></div>
          <div className="flex flex-wrap w-full    gap-8 py-8  ">
            {cart.map((cartItem) => {
              const quantityItem = Quantity.find((q) => q.id === cartItem.id);

              return (
                <div
                  className="w-1/5  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] cursor-pointer rounded-3xl  flex flex-col  gap-6"
                  key={cartItem.id}
                >
                  {/* image */}
                  <div className="bg-white rounded-t-3xl px-2">
                    <img
                      className="w-full h-60 p-3 relative hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                      src={cartItem.image}
                      alt={cartItem.title}
                    />
                  </div>

                  <div className="flex flex-col justify-end h-full  p-3 gap-3">
                    {/* product title */}
                    <h5 className="text-sm font-semibold tracking-tight h-1/2  text-wrap  text-center">
                      {cartItem.title}
                    </h5>

                    {/* button */}
                    <div className=" flex justify-between h-1/2 items-center px-4">
                      <span className="text-md font-bold ">
                        ${cartItem.price}
                      </span>
                      <div className="flex items-center justify-between w-1/4 border-2 p-2">
                        <button
                          onClick={() =>
                            handleQuantity(
                              cartItem.id,
                              Quantity,
                              setQuantity,
                              -1
                            )
                          }
                        >
                          -
                        </button>

                        <span className="px-2">
                          {quantityItem ? quantityItem.quantity : 0}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantity(
                              cartItem.id,
                              Quantity,
                              setQuantity,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>  
          <div className="flex text-lg  w-full items-center justify-end gap-5 font-semibold   ">
            <h1>Total Price : </h1>
            <h1 className="text-green-600">${total}</h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;