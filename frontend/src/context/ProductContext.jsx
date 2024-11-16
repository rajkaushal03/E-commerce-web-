import { createContext, useContext, useEffect, useState } from "react";
import { fetchCartProducts, fetchProducts } from "../utils/function";

export const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductContextProvideer = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [select, setSelect] = useState("All");


  useEffect(() => {
    const sum = cart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price; // Directly access the quantity and price
    }, 0);

    setTotal(sum.toFixed(2)); // Update the total with 2 decimal places
    // console.log(sum); // Log the total directly

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    fetchProducts(setProducts);
    fetchCartProducts(setCart);
  }, []);
  

  return (
    <ProductContext.Provider
      value={{ products, cart, setCart, total, setTotal, select , setSelect }}
    >
      {children}
    </ProductContext.Provider>
  );
};
