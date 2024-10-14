// In function.js

export const handleAddToCart = async (product, setCart, cart, authUser) => {
  const isProductInCart = cart.some((item) => item.productId == product.id);
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
          productId: product.id,
          userId: authUser._id,
          id: product.id,
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
      setCart(data.cart)
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
  product,
  cart,
  setCart,
  authUser
) => {
  // const updatedCart = cart.filter((item) => item.productId !== product.id);
  // setCart(updatedCart);

  // API call to remove product from the user's cart in the database
  if (authUser) {
    try {
      const response = await fetch(`/api/cart/remove-from-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          userId: authUser._id, // Ensure userId is passed with the request
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      const data = await response.json();
      setCart(data.cart);

      // console.log(data); // Handle success message if needed
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Optionally revert the local cart to the previous state if the API call fails
      setCart(cart);
    }
  }
  // fetchCartProducts(setCart);
};

export const handleQuantity = (cartId, Quantity, setQuantity, change) => {
  const changeAmount = parseInt(change);

  const updatedQuantities = Quantity.map((element) => {
    if (element.id === cartId) {
      const newQuantity = Math.max(element.quantity + changeAmount, 1);
      return { ...element, quantity: newQuantity };
    }
    return element;
  });
  // console.log(updatedQuantities);
  setQuantity(updatedQuantities);
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
