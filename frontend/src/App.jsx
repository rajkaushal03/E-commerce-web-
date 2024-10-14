import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./Component/Profile";
import Cart from "./Component/Cart";
import { useEffect, useState } from "react";
import { fetchCartProducts, fetchProducts } from "./utils/function";

const App = () => {
  const { authUser } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts(setProducts);
    fetchCartProducts(setCart);
  }, []);

  // console.log("cart", cart);

  useEffect(() => {
    const sum = cart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price; // Directly access the quantity and price
    }, 0);

    setTotal(sum.toFixed(2)); // Update the total with 2 decimal places
    // console.log(sum); // Log the total directly

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  // console.log("Authenticated user:", authUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !authUser ? (
              <SignupPage />
            ) : (
              <HomePage
                cart={cart}
                setCart={setCart}
                total={total}
                setTotal={setTotal}
                products={products}
              />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={!authUser ? <SignupPage /> : <Profile />}
        />
        <Route
          path="/cart"
          element={
            !authUser ? (
              <SignupPage />
            ) : (
              <Cart cart={cart} setCart={setCart} total={total} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
