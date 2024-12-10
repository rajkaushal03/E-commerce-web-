import { useAdminContext } from "../context/AdminContext";

const AddProductForm = () => {
  const { lastId, handleFormSubmit } = useAdminContext();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold py-2">NEW PRODUCTS...</h1>

      {/* Product ID */}
      <div className="flex items-center justify-between ">
        <div className="text-md">
          <strong>ID</strong> : {lastId + 1}
        </div>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 text-md "
      >
        {/* Title */}
        <div className="flex items-center justify-between ">
          <div className="font-bold ">Title :</div>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered  max-w-xs  "
            required
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between  ">
          <div htmlFor="price" className="block font-bold">
            Price :
          </div>
          <input
            type="number"
            id="price"
            name="price"
            className="input input-bordered  "
            required
          />
        </div>
        {/* Category */}
        <div className="flex items-center justify-between ">
          <div htmlFor="category" className="block font-bold">
            Category :
          </div>
          <input
            type="text"
            id="category"
            name="category"
            className="input input-bordered  "
            required
          />
        </div>
        {/* Image URL */}
        <div className="flex items-center justify-between ">
          <div htmlFor="image" className="font-bold">
            ImgURL :
          </div>
          <input
            type="url"
            id="image"
            name="image"
            className="input input-bordered  "
            placeholder="Enter a valid image URL"
          />
        </div>
        {/* Description */}
        <div className="gap-2">
          <label htmlFor="description" className="block font-bold">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered w-full "
            rows="4"
            required
          />
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center ">
          <button type="submit" className="btn btn-primary w-1/2">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
