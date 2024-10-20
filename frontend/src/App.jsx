import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./Component/Profile";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
import { fetchCartProducts, fetchProducts } from "./utils/function";
import DetailPage from "./pages/DetailPage";

const App = () => {
  const { authUser } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply the theme on component mount and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Store theme in localStorage
  }, [theme]);

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
        <Route path="/" element={ !authUser ? ( <SignupPage /> ) : ( <HomePage cart={cart} setCart={setCart}  total={total} setTotal={setTotal} products={products} setTheme={setTheme} theme={theme} /> ) } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail" element={<DetailPage cart={cart} setCart={setCart}/>} />
        <Route path="/profile" element={!authUser ? <SignupPage /> : <Profile />}/>
        <Route path="/cart" element={ !authUser ? ( <SignupPage /> ) : ( <Cart cart={cart} setCart={setCart} total={total} theme={theme} setTheme={setTheme} /> )} / >
      </Routes>
    </>
  );
};

export default App;
