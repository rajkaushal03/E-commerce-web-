import { useEffect, useState } from "react";
import Cart from "../Component/Cart";
import Products from "../Component/Products";
import NavBar from "../Component/NavBar";
import { ToastContainer } from "react-toastify";
import SideBar from "../Component/SideBar";
import { fetchCartProducts, fetchProducts } from "../utils/function";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [select, setSelect] = useState("All");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [Quantity, setQuantity] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts);
    fetchCartProducts(setCart);
  }, []);

  
  // console.log("cart", cart);
  useEffect(() => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = cart.map((item) => {
        const existingQuantity = prevQuantity.find((q) => q.id === item.id);
        return existingQuantity
          ? existingQuantity
          : { id: item.id, quantity: 1 };
      });
      return updatedQuantity;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    const sum = Quantity.reduce((acc, curr) => {
      // Find the corresponding cart item to get the price
      const cartItem = cart.find((item) => item.id === curr.id);
      return acc + (cartItem ? curr.quantity * cartItem.price : 0); // Safely access price
    }, 0);

    setTotal(sum.toFixed(2)); // Update the total
    // console.log(sum); // Log the total directly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Quantity, cart]);
  return (
    <>
      <NavBar
        cart={cart}
        total={total}
        setTotal={setTotal}
        isCartVisible={isCartVisible}
        setIsCartVisible={setIsCartVisible}
      />
      <div className="flex ">
        {!isCartVisible ? (
          <>
            <SideBar
              products={products}
              setSelect={setSelect}
              select={select}
            />
            <Products
              products={products}
              setCart={setCart}
              cart={cart}
              select={select}
            />
          </>
        ) : (
          <Cart
            cart={cart}
            total={total}
            setCart={setCart}
            isCartVisible={isCartVisible}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
