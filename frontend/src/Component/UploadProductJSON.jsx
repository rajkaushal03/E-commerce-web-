import { useAdminContext } from "../context/AdminContext";

const UploadProductJSON = () => {
  const { handleFileSelection, handleFileUpload, errorMessage } =
    useAdminContext();

  return (
    <div className="">
      <h1 className="2xl:text-xl text-xs lg:text-sm font-bold py-4">Upload Products via JSON</h1>

      {/* File Input */}
      <input
        type="file"
        accept=".json"
        onChange={handleFileSelection}
        className="input input-bordered 2xl:input-md input-xs w-full mb-4 h-full p-2"
      />

      {/* Add Data Button */}
      <button onClick={handleFileUpload} className="btn btn-primary w-full">
        Add Data
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}

      {/* Info */}
      <p className="2xl:text-sm text-xs text-gray-500 mt-4">
        Upload a JSON file containing an array of products. Each product must
        include the following fields: <strong>title</strong>,{" "}
        <strong>price</strong>, <strong>description</strong>,{" "}
        <strong>category</strong>, and <strong>image</strong>.
      </p>
    </div>
  );
};

export default UploadProductJSON;
