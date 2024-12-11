/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation } from "react-router-dom";
import { handleAddToCart, handleRemoveFromCart } from "../utils/function";
import { useAuthContext } from "../context/AuthContext";
import {
  MdOutlineAddShoppingCart,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { useProductContext } from "../context/ProductContext";

const DetailPage = () => {
  const { authUser } = useAuthContext();
  const { cart, setCart } = useProductContext();
  const location = useLocation();
  let { product, cartItem } = location.state || {};
  if (!product) {
    product = cartItem;
  }
  const isInCart = cart.some((item) => item.id == product.id);
  return (
    <div className="lg:h-screen h-full">
      <div className="grid 2xl:grid-cols-8 lg:grid-cols-6 h-full  items-center">

        <div className=" h-full  flex  items-center justify-center bg-white  md:col-span-2">
          <img
            className="w-1/2 hover:scale-110  transition-all duration-1000 ease-in-out  -z-1"
            src={product.image}
            alt=""
          />
        </div>

        <div className="2xl:text-3xl sm:py-8 lg:text-2xl sm:text-xl font-semibold text-center text-gray-900 bg-gray-600 flex items-center  justify-center h-full dark:text-white p-2">
          {product.category.toUpperCase()}
        </div>


        <div className=" bg-black w-full p-10  h-full flex flex-col justify-center 2xl:col-span-5 md:col-span-3">
          <h1 className="2xl:text-4xl md:text-2xl ssm:text-lg text-md font-semibold text-gray-900  dark:text-white p-2">
            {product.title}
          </h1>
          {/* price */}
          <div className="flex  gap-5 items-center p-4">
            <p className="2xl:text-2xl text-md font-extrabold text-gray-900 sm:text-lg dark:text-white">
              ${product.price}
            </p>

            {/* rating and reviews */}

            <div className="flex items-center gap-3 mt-2 ">
              
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({product.rating.rate})
              </p>
              <span className="lg:text-sm text-xs  font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                {product.rating.count} Reviews
              </span>
            </div>
          </div>

          {/* add to cart and buy now button */}

          <div className="flex flex-col sm:flex-row py-5 px-2 gap-8 justify-end sm:items-center ">
            <button
              className="btn btn-sm sm:btn-md flex items-center justify-center sm:text-sm text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 gap-2"
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
              <MdOutlineAddShoppingCart className="sm:text-xl" />
              {isInCart ? "Remove cart" : "Add to cart"}
            </button>

            <Link to="/cart">
              <button className="btn btn-sm sm:btn-md gap-2 flex items-center justify-center w-full sm:text-sm text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <MdOutlineShoppingCartCheckout className="sm:text-xl" />
                Check Out...
              </button>
            </Link>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          <p className="py-10 px-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm 2xl:text-lg   ">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
