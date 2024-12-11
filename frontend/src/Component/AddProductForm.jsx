import { useAdminContext } from "../context/AdminContext";

const AddProductForm = () => {
  const { lastId, handleFormSubmit, newProduct } = useAdminContext();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="2xl:text-xl  text-sm font-bold py-2">
        New Product({newProduct.length} total)...
      </h1>

      {/* Product ID */}
      <div className="flex items-center justify-between ">
        <div className="2xl:text-lg text-xs">
          <strong>ID</strong> : {lastId + 1}
        </div>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 2xl:text-md text-xs "
      >
        {/* Title */}
        <div className="2xl:flex items-center justify-between ">
          <div className="font-bold ">Title :</div>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered input-sm  2xl:w-2/3 w-full  "
            required
          />
        </div>

        {/* Price */}
        <div className="2xl:flex items-center justify-between  ">
          <div htmlFor="price" className="block font-bold">
            Price :
          </div>
          <input
            type="number"
            id="price"
            name="price"
            className="input input-bordered input-sm  2xl:w-2/3 w-full   "
            required
          />
        </div>
        {/* Category */}
        <div className="2xl:flex items-center justify-between ">
          <div htmlFor="category" className="block font-bold">
            Category :
          </div>
          <input
            type="text"
            id="category"
            name="category"
            className="input input-bordered input-sm  2xl:w-2/3 w-full  "
            required
          />
        </div>
        {/* Image URL */}
        <div className="2xl:flex  2xl:items-center 2xl:justify-between  w-full ">
          <div htmlFor="image" className="font-bold">
            ImgURL:
          </div>
          <div className="flex flex-col justify-center items-center">
            <input
              type="url"
              id="image"
              name="image"
              className="input input-bordered input-sm   w-full "
              placeholder="Enter a valid image URL"
            />
            <div className="divider">OR</div>

            <input
              type="file"
              accept="image/*"
              // onChange={handleFileSelection}
              className="input input-bordered  input-xs w-full  mb-4 h-full p-2"
            />
          </div>
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
        <div className="flex justify-center w-full">
          <button type="submit" className="btn btn-primary w-full">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
