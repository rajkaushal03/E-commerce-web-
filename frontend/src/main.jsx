// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { ProductContextProvideer } from "./context/ProductContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ProductContextProvideer>
      <ThemeContextProvider>
        <AuthContextProvider>
          <AdminContextProvider>
            <App />
          </AdminContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </ProductContextProvideer>
  </BrowserRouter>
  // </React.StrictMode>
);
