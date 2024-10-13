import { handleAddToCart, handleRemoveFromCart } from "../utils/function";

const Products = ({ products, setCart, cart, select }) => {
  const filteredProducts =
    select === "All"
      ? products // Show all products if "All" is selected
      : products.filter((product) => product.category === select);

  return (
    <>
      <div className="flex flex-wrap w-full  justify-center  h-full  gap-8 py-8 px-6">
        {filteredProducts.map((product, index) => {
          const isInCart = cart.some((item) => item.id === product.id);
          return (
            <div
              className="w-1/5 h-94 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] cursor-pointer rounded-3xl  flex flex-col  gap-6"
              key={index}
            >
              {/* image */}
              <div className="bg-white rounded-t-3xl px-2">
                <img
                  className="w-full h-60 p-3 relative hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <div className="flex flex-col justify-end h-full  p-3 gap-3">
                {/* product title */}
                <h5 className="text-sm font-semibold tracking-tight h-1/2  text-wrap  text-center">
                  {product.title}
                </h5>

                {/* button */}
                <div
                  className=" flex justify-between h-1/2 items-center px-4"
                  onClick={() => {
                    if (isInCart) {
                      return handleRemoveFromCart(product, cart, setCart);
                    }
                    return handleAddToCart(product, setCart, cart);
                  }}
                >
                  <span className="text-md font-bold ">${product.price}</span>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isInCart ? "Remove" : "Add Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
