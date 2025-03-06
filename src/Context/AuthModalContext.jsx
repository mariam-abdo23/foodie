import { createContext, useContext, useState, useEffect } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true)); 
    closeModal();
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); 
    localStorage.removeItem("cartItems"); 
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, openModal, closeModal, isLoggedIn, login, logout }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  return useContext(AuthModalContext);
}