// In function.js

export const handleAddToCart = async (product, setCart, cart, authUser) => {
  const isProductInCart = cart.some((item) => item.id == product.id);
  if (!isProductInCart && authUser) {
    // Add product to local cart
    // setCart((prevCart) => [...prevCart, product]);

    // API call to add product to the user's cart in the database
    try {
      const response = await fetch(`/api/cart/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
          userId: authUser._id,
          cartid: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();
      setCart(data.cart);
      // console.log(data); // Handle success message if needed
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optionally remove the product from local cart if the API call fails
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    }
  } else {
    console.log("Product already in cart or user not authenticated");
  }
  // fetchCartProducts(setCart);
};

export const handleRemoveFromCart = async (
  productId,
  cart,
  setCart,
  authUser
) => {
  if (authUser) {
    try {
      const response = await fetch(`/api/cart/remove-from-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: productId, // Correctly passing productId
          userId: authUser._id, // Ensure userId is passed with the request
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      const data = await response.json();
      setCart(data.cart); // Update the cart with the response from server
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Optionally revert the local cart to the previous state if the API call fails
      setCart(cart);
    }
  }
};

export const handleQuantityChange = async (
  productId,
  authUser,
  setCart,
  change
) => {
  // Call the function to update the quantity in the database
  await updateCartQuantity(productId, authUser._id, change, setCart);
};

export const updateCartQuantity = async (
  productId,
  userId,
  change,
  setCart
) => {
  try {
    const response = await fetch(`/api/cart/quantity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
        userId: userId,
        quantityChange: change, // +1 or -1 based on button clicked
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart quantity");
    }

    const data = await response.json();
    setCart(data.cart); // Update the local cart state with the new data
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

// fetch api

export const fetchProducts = async (setProducts) => {
  try {
    setProducts([]);
    const res = await fetch(`/api/products`);
    const data = await res.json();

    setProducts(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const fetchCartProducts = async (setCart) => {
  try {
    setCart([]);
    const res = await fetch(`/api/cart/database`);
    const data = await res.json();

    setCart(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const handleStorage = async (newProductData, setProducts) => {
  try {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    setProducts(result.products);
    // console.log("Product successfully added:", result.product);
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};

export const handleDelete = async (productId, setProducts) => {
  try {
    const response = await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    // Assuming the response returns the updated list of products
    const data = await response.json();

    // Ensure that the products are sorted and updated
    if (data.updatedProducts) {
      const sortedProducts = data.updatedProducts.sort((a, b) => a.id - b.id); // Sort by product ID
      setProducts(sortedProducts);
    } else {
      console.error("Error: No updated products found");
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
};
