import { useState } from "react";
import Products from "../Component/Products";
import NavBar from "../Component/NavBar";
import { ToastContainer } from "react-toastify";
import SideBar from "../Component/SideBar";

const HomePage = ({ cart, setCart, total, setTotal, products }) => {
  const [select, setSelect] = useState("All");

  return (
    <>
      <NavBar cart={cart} total={total} setTotal={setTotal} />
      <div className="flex ">
        <>
          <SideBar products={products} setSelect={setSelect} select={select} />
          <Products
            products={products}
            setCart={setCart}
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
