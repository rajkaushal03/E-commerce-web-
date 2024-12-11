import { BiCategory } from "react-icons/bi";
import { useProductContext } from "../context/ProductContext";
import { useThemeContext } from "../context/ThemeContext";
const SideBar = ({ select, setSelect }) => {
  const { products } = useProductContext();

  // Group the products by category and add "All" category
  const Categories = products.reduce((acc, product) => {
    const { category } = product;

    if (!acc[category]) {
      acc[category] = [];
    }
    if (!acc["All"]) {
      acc["All"] = [];
    }

    acc[category].push(product);
    acc["All"].push(product);

    return acc;
  }, {});
  const { theme } = useThemeContext();
  // console.log(Categories);
  return (
    <>
      <div className="drawer  md:hidden   z-30">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className=" flex items-center  px-6 py-2 cursor-pointer text-lg sm:text-xl lg:text-3xl font-bold drawer-button "
          >
              <BiCategory /> {"Category"}
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu md:text-sm 2xl:text-2xl  felx flex-col items-center  bg-base-200 text-base-content min-h-full w-64">
            {/* Sidebar content here */}
            <div className="flex w-full text-lg   h-5 items-center gap-2 2xl:py-8  md:py-6 px-2 font-bold md:text-lg lg:text-xl 2xl:text-2xl">
              {" "}
              <BiCategory /> {"Category"}
            </div>

            {/* option */}

            <div className="text-xs gap-2 flex flex-col p-2">
              {Object.keys(Categories)
                .sort() // Sort the categories in alphabetical order
                .map((category, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-full py-2 px-4 transition-all    hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] duration-800 cursor-pointer rounded-md font-semibold  ${
                        category === select
                          ? "bg-blue-500 text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                          : ""
                      }`}
                      onClick={() => {
                        setSelect(category);
                      }}
                    >
                      <div>{category}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`  md:flex flex-col hidden    2xl:w-[15%] lg:w-[20%]  sticky top-[3rem] left-0 justify-start h-full  overflow-auto gap-8  border-r-4  ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        {/* Display "All" category */}
        <div className=" scroll-container">
          <div className="flex sticky top-0 bg-base-100   h-5 items-center gap-2 2xl:py-8  md:py-6 px-2 font-bold md:text-lg lg:text-xl 2xl:text-2xl">
            {" "}
            <BiCategory /> {"Category"}
          </div>
          {/* Display individual categories */}
          <div className="text-xs gap-2 flex flex-col p-2">
            {Object.keys(Categories)
              .sort() // Sort the categories in alphabetical order
              .map((category, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full py-2 px-4 transition-all    hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] duration-800 cursor-pointer rounded-md font-semibold  ${
                      category === select
                        ? "bg-blue-500 text-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                        : ""
                    }`}
                    onClick={() => {
                      setSelect(category);
                    }}
                  >
                    <div>{category.toLocaleUpperCase()}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
