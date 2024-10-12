import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route
          path="/explore"
          element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/likes"
          element={authUser ? <LikesPage /> : <Navigate to={"/login"} />}
        /> */}
      </Routes>
      <Toaster />
      {/* <HomePage/> */}
      <SignupPage />
    </>
  );
};

export default App;
