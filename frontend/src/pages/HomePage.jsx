import { useState } from "react";
import Products from "../Component/Products";
import NavBar from "../Component/NavBar";
import { ToastContainer } from "react-toastify";
import SideBar from "../Component/SideBar";

const HomePage = () => {
  const [select, setSelect] = useState("All");
  return (
    <>
      <NavBar />
      <div className="flex  ">
        <>
          <SideBar setSelect={setSelect} select={select} />
          <Products select={select} />
        </>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
