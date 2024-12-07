import { useProductContext } from "../context/ProductContext";
import { handleStorage } from "../utils/function";

const AddProductForm = () => {
  const { products, setProducts } = useProductContext();

  const lastId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Extract form data and create a new product
    const newProductData = {
      id: lastId + 1,
      title: e.target.title.value,
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      category: e.target.category.value,
      image: e.target.image.value, // Fixed input name for image URL
      rating: { rate: 5, count: 100 }, // Default rating values
    };

    // Optionally, you could add logic to update the products context or backend
    console.log("New Product Added:", newProductData);
    handleStorage(newProductData, setProducts);

    // Reset form fields after submission
    e.target.reset();
  };

  return (
    <div className="sticky top-0 right-0 h-screen px-4 ">
      <h1 className="text-xl font-bold py-4">New Products...</h1>

      {/* Product ID */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <strong>Product ID</strong> : {lastId + 1}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className=" text-sm">
        {/* Title */}
        <div className="mb-4">
          <label className="font-bold ">Title :</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered w-full mt-2"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block font-bold">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="input input-bordered w-full mt-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered w-full mt-2"
            rows="4"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold">
            Category :
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="input input-bordered w-full mt-2"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image" className="font-bold">
            Image URL :
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="input input-bordered w-full mt-2"
            placeholder="Enter a valid image URL"
          />
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-primary w-1/2">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
