import { handleAddToCart, handleRemoveFromCart } from "../utils/function";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { useProductContext } from "../context/ProductContext";
import { useAdminContext } from "../context/AdminContext";
import { useEffect } from "react";

const Products = ({ select }) => {
  const { products, setCart, cart } = useProductContext();
  const { authUser } = useAuthContext();
  const { theme } = useThemeContext();
  const { newProduct, setNewProduct } = useAdminContext();

  // Update `newProduct` when `select` or `products` change
  useEffect(() => {
    setNewProduct(
      select === "All"
        ? products // Show all products if "All" is selected
        : products.filter((product) => product.category === select)
    );
  }, [select, products, setNewProduct]);
  //  console.log(1);
  return (
    <div
      className={`w-full  2xl:grid-cols-4 h-full grid lg:grid-cols-3 md:grid-cols-2 gap-8 py-8 px-6 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      {newProduct.slice(0, 20).map((product) => {
        const isInCart = cart.some((item) => item.id === product.id);

        return (
          <div
            className="lg:h-64 2xl:h-96 md:h-64 border-2 border-black shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] cursor-pointer rounded-3xl flex flex-col 2xl:gap-6 md:gap-0 "
            key={product.id}
          >
            {/* Image */}
            <Link to="/detail" state={{ product }}>
              <div className="bg-white rounded-t-3xl px-2 h-full">
                <img
                  className="w-full 2xl:h-56 md:h-40 lg:h-40 p-3 relative hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                  src={product.image}
                  alt={product.title
                    .split(" ") // Split the description into an array of words
                    .slice(0, 5) // Get the first 100 words
                    .join(" ") // Join the words back into a string
                    .toUpperCase()}
                />
              </div>
            </Link>

            <div className="flex flex-col justify-end h-full p-3 md:px-4  2xl:gap-3 md:gap-0">
              {/* Product Title */}
              <h5 className="2xl:text-lg lg:text-md md:text-xs font-bold tracking-tight h-1/2 text-wrap text-center">
                {product.title
                  .split(" ") // Split the description into an array of words
                  .slice(0, 7) // Get the first 100 words
                  .join(" ") // Join the words back into a string
                  .toUpperCase()}
                ...
              </h5>

              {/* Button */}
              <div
                className="flex justify-between h-1/2 items-center px-4"
                onClick={() => {
                  if (isInCart) {
                    return handleRemoveFromCart(
                      product.id,
                      cart,
                      setCart,
                      authUser
                    );
                  }
                  return handleAddToCart(product, setCart, cart, authUser);
                }}
              >
                <span className="2xl:text-lg lg:text-sm md:text-xs font-bold">${product.price}</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:text-xs 2xl:text-sm  2xl:px-3 sm:px-2  py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {isInCart ? "Remove" : "Add Cart"} 
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
