import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./Component/Profile";
import Cart from "./pages/Cart";
import DetailPage from "./pages/DetailPage";
import BuyPage from "./pages/BuyPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./Component/Footer";

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow">
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
          <Route
            path="/admin"
            element={!authUser ? <SignupPage /> : <AdminPage />}
          />
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
