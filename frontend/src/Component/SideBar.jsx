import { BiCategory } from "react-icons/bi";
import { useThemeContext } from "../context/ThemeContext";
import { useProductContext } from "../context/ProductContext";

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
    <div
      className={` text-sm flex flex-col    w-[15%] sticky top-[3rem] left-0 justify-start h-screen overflow-auto gap-8  border-r-4  ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      {/* Display "All" category */}
      <div className=" scroll-container">
        <div className="flex sticky top-0 bg-base-100 border-b-4  h-5 items-center gap-2 py-8 px-2 font-bold  text-2xl">
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
  );
};

export default SideBar;
