import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./Component/Profile";
import Cart from "./pages/Cart";
import DetailPage from "./pages/DetailPage";
import BuyPage from "./pages/BuyPage";

const App = () => {
  const { authUser } = useAuthContext();

  // console.log("Authenticated user:", authUser);

  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <SignupPage /> : <HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route
          path="/profile"
          element={!authUser ? <SignupPage /> : <Profile />}
        />
        <Route path="/cart" element={!authUser ? <SignupPage /> : <Cart />} />
        <Route path="/buy" element={!authUser ? <SignupPage /> : <BuyPage />} />
      </Routes>
    </>
  );
};

export default App;
