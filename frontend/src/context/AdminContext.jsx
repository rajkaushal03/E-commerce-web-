/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";
import { handleStorage } from "../utils/function";

// Create context
export const AdminContext = createContext();

// Custom hook for easier context access
export const useAdminContext = () => {
  return useContext(AdminContext);
};

// Provider component
export const AdminContextProvider = ({ children }) => {
  const { products, setProducts } = useProductContext();
  const [newProduct, setNewProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null); // State to store the selected file
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const lastId =
  products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

  // Sync newProduct with products
  useEffect(() => {
    setNewProduct(products);
  }, [products]);

  // Filter products based on searchTerm
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

  // Sort products
  const handleSort = (criteria) => {
    const sortedProducts = [...newProduct].sort((a, b) =>
      criteria === "newest" ? b.id - a.id : a.id - b.id
    );
    setNewProduct(sortedProducts);
  };

  // Handle file selection
  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMessage(null); // Reset error message on new selection
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage("Please upload a file.");
      return;
    }

    try {
      const fileContent = await file.text();
      const parsedData = JSON.parse(fileContent);

      if (!Array.isArray(parsedData)) {
        setErrorMessage(
          "Invalid file format. The JSON should be an array of products."
        );
        return;
      }

      const getLastId = () =>
        products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

      const validatedProducts = parsedData.map((product, index) => {
        const id = getLastId() + index + 1; // Assign unique IDs
        return validateProduct(product, id);
      });

      validatedProducts.forEach((product) =>
        handleStorage(product, setProducts)
      );
      setErrorMessage(null); // Clear error on successful upload
    } catch (error) {
      console.error(error);
      setErrorMessage("Error processing file. Ensure it's a valid JSON.");
    }
  };

  // Validate individual product
  const validateProduct = (product, id) => {
    const requiredFields = [
      "title",
      "price",
      "description",
      "category",
      "image",
    ];
    const missingFields = requiredFields.filter((field) => !product[field]);

    if (missingFields.length > 1) {
      throw new Error(
        `Product missing required fields: ${missingFields.join(", ")}`
      );
    }

    return {
      id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating || { rate: 5, count: 100 }, // Default rating
    };
  };

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
    // console.log("New Product Added:", newProductData);
    handleStorage(newProductData, setProducts);

    // Reset form fields after submission
    e.target.reset();
  };

  return (
    <AdminContext.Provider
      value={{
        newProduct,
        setNewProduct,
        searchTerm,
        setSearchTerm,
        handleSort,
        setProducts,
        file,
        lastId,
        errorMessage,
        handleFileSelection,
        handleFileUpload,
        handleFormSubmit
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
