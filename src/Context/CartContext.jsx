import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuthModal } from "./AuthModalContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuthModal();
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    if (isLoggedIn) {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [isLoggedIn]); 

  
  useEffect(() => {
    if (isLoggedIn && cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else if (!isLoggedIn) {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems, isLoggedIn]);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      toast.warn("You must be logged in to add products to your cart!", { position: "top-center" });
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product_code === product.product_code);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product_code === product.product_code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    toast.success("Product added successfully!", { position: "top-center" });
  };

  const removeFromCart = (product_code) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_code !== product_code));
  };

  const decreaseQuantity = (product_code) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product_code === product_code
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}