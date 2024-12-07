/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";

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

  return (
    <AdminContext.Provider
      value={{
        newProduct,
        setNewProduct,
        searchTerm,
        setSearchTerm,
        handleSort,
        setProducts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
