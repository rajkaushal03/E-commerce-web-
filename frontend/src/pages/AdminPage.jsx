import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { RiAdminLine } from "react-icons/ri";
import { handleDelete } from "../utils/function";
import AdminSideBar from "../Component/AdminSideBar";
import AddProductForm from "../Component/AddProductForm";

const AdminPage = () => {
  const { products, setProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState([]);

  // Update newProduct when products change
  useEffect(() => {
    setNewProduct(products);
  }, [products]);

  useEffect(() => {
    if (searchTerm === "") {
      setNewProduct(products);
    } else {
      const filteredProducts = products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toString().includes(searchTerm.toLowerCase())
      );
      setNewProduct(filteredProducts);
    }
  }, [searchTerm, products]);

  const handleSort = (criteria) => {
    const sortedProducts = [...newProduct].sort((a, b) =>
      criteria === "newest" ? b.id - a.id : a.id - b.id
    );
    setNewProduct(sortedProducts);
  };

  // console.log(newProduct);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center border-b-4 py-2 px-4">
        <h1 className="text-4xl  py-4 flex gap-2">
          <RiAdminLine />
          <strong>Admin Dashboard.....</strong>
        </h1>
        <div className="flex gap-8">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered 2xl:w-96 md:w-auto"
          />
          <AdminSideBar />
        </div>
      </div>
      <div>
        {/* Sort by */}

        <div className="grid grid-cols-4">
          <div className=" col-span-3 border-r-4">
            <div className="flex items-center space-x-4 px-8 py-4">
              <span className="text-lg font-semibold">Sort By:</span>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleSort("newest")}
              >
                Recently added
              </button>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleSort("oldest")}
              >
                Oldest
              </button>
            </div>
            <div className="grid 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-8 py-2 gap-8 col-span-3 ">
              {newProduct.map((product) => (
                <div
                  className="card card-side bg-base-100 shadow-xl border-2 border-black"
                  key={product.id}
                >
                  <figure className="w-[30%] bg-white">
                    <img
                      className="h-60 p-3 relative hover:scale-110 transition-transform duration-1000 ease-in-out object-scale-down"
                      src={product.image}
                      alt={product.title}
                    />
                  </figure>
                  <div className="w-[70%] card-body">
                    <div>
                      <p className="text-sm">
                        <span className="font-bold">ID: </span>
                        {product.id}
                      </p>

                      <h2 className="card-title text-sm">
                        <span className="font-bold">Title: </span>
                        {product.title.length > 20
                          ? product.title.slice(0, 20) + "..."
                          : product.title}
                      </h2>

                      <p className="text-sm">
                        <span className="font-bold">Price: </span>$
                        {product.price.toFixed(2)}
                      </p>

                      <p className="text-sm">
                        <span className="font-bold">Description: </span>
                        {product.description.split(" ").slice(0, 10).join(" ")}
                        {product.description.split(" ").length > 10 && "..."}
                      </p>

                      <p className="text-sm">
                        <span className="font-bold">Category: </span>
                        {product.category}
                      </p>

                      <p className="text-sm">
                        <span className="font-bold">Rating: </span>
                        {product.rating.rate} ({product.rating.count} reviews)
                      </p>
                    </div>

                    <div className="card-actions gap-8">
                      <button className="btn btn-primary">Edit</button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDelete(product.id, setProducts)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AddProductForm />
        </div>
        {/* Product list */}
      </div>
    </div>
  );
};

export default AdminPage;
