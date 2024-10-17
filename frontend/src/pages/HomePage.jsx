import { useState } from "react";
import Products from "../Component/Products";
import NavBar from "../Component/NavBar";
import { ToastContainer } from "react-toastify";
import SideBar from "../Component/SideBar";

const HomePage = ({ cart, setCart, total, setTotal, products, theme , setTheme }) => {
  const [select, setSelect] = useState("All");

  return (
    <>
      <NavBar cart={cart} total={total} setTotal={setTotal} theme={theme} setTheme={setTheme}  />
      <div className="flex ">
        <>
          <SideBar products={products} setSelect={setSelect} select={select} theme={theme}/>
          <Products
            products={products}
            setCart={setCart}
            theme={theme}
            cart={cart}
            select={select}
          />
        </>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
