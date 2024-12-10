import { useAdminContext } from "../context/AdminContext";

const UploadProductJSON = () => {
  const { handleFileSelection, handleFileUpload, errorMessage } =
    useAdminContext();

  return (
    <div className="">
      <h1 className="text-xl font-bold py-4">Upload Products via JSON</h1>

      {/* File Input */}
      <input
        type="file"
        accept=".json"
        onChange={handleFileSelection}
        className="input input-bordered w-full mb-4 h-full p-2"
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
      <p className="text-sm text-gray-500 mt-4">
        Upload a JSON file containing an array of products. Each product must
        include the following fields: <strong>title</strong>,{" "}
        <strong>price</strong>, <strong>description</strong>,{" "}
        <strong>category</strong>, and <strong>image</strong>.
      </p>
    </div>
  );
};

export default UploadProductJSON;
