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
    <div className="h-screen">
      <div className="grid grid-cols-8  h-full  items-center">

        <div className=" h-full  flex  items-center justify-center bg-white  col-span-2">
          <img
            className="w-1/2 hover:scale-110  transition-all duration-1000 ease-in-out  -z-1"
            src={product.image}
            alt=""
          />
        </div>

        <div className="text-5xl font-semibold text-center text-gray-900 bg-gray-600 flex items-center  justify-center h-full dark:text-white p-2">
          {product.category.toUpperCase()}
        </div>


        <div className=" bg-black w-full p-10  h-full flex flex-col justify-center col-span-5">
          <h1 className="text-5xl font-semibold text-gray-900  dark:text-white p-2">
            {product.title}
          </h1>
          <div className="flex  gap-5 items-center p-4">
            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              ${product.price}
            </p>

            {/* rating and reviews */}

            <div className="flex items-center gap-4 mt-2 ">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({product.rating.rate})
              </p>
              <span className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                {product.rating.count} Reviews
              </span>
            </div>
          </div>

          {/* add to cart and buy now button */}

          <div className="flex  py-5 px-2 gap-8 justify-end items-center ">
            <button
              className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 gap-2"
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
              <MdOutlineAddShoppingCart className="text-xl" />
              {isInCart ? "Remove from cart" : "Add to cart"}
            </button>

            <Link to="/cart">
              <button className="gap-2 flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <MdOutlineShoppingCartCheckout className="text-xl" />
                Check Out...
              </button>
            </Link>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          <p className="py-10 px-2 text-gray-500 dark:text-gray-400 ">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
