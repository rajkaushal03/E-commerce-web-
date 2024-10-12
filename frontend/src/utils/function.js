export const handleAddToCart = (product, setCart, cart) => {
  //   console.log(product);
  const isProductInCart = cart.some((item) => item.id === product.id);
  if (!isProductInCart) {
    setCart((prevCart) => [...prevCart, product]);
  } else {
    console.log("product already there ");
  }

  //   console.log(cart);
};

export const handleRemoveFromCart = (product, cart, setCart) => {
  const temp = cart.filter((item) => item.id !== product.id);
  setCart(temp);
};

export const handleQuantity = (cartId, Quantity, setQuantity, change) => {
  const changeAmount = parseInt(change); 

  const updatedQuantities = Quantity.map(element => {
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

export const fetchProducts = async ( setProducts) => {
  try {
    setProducts([]);
    const res = await fetch(`/api/products`);
    const data = await res.json();

    setProducts(data);
  } catch (error) {
    console.log(error.message);
  }
};