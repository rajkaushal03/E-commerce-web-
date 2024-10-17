import { BiCategory } from "react-icons/bi";

const SideBar = ({ products, select, setSelect, theme }) => {
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

  // console.log(Categories);
  return (
    <div
      className={` text-sm flex flex-col  p-5  w-[18%] sticky top-0 left-0 justify-start h-screen gap-8 py-8  ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      {/* Display "All" category */}

      <div className="flex  items-center  gap-2 p-2 font-bold   text-2xl">
        {" "}
        <BiCategory /> {"Category"}
      </div>
      {/* Display individual categories */}
      {Object.keys(Categories)
        .sort() // Sort the categories in alphabetical order
        .map((category, index) => {
          return (
            <div
              key={index}
              className={`w-full p-2 transition-all text-md text-center  hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] duration-800 cursor-pointer rounded-md font-semibold  ${
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
  );
};

export default SideBar;
