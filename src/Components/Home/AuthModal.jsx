import React, { useState } from "react";
import { useAuthModal } from "../../Context/AuthModalContext";

export default function AuthModal() {
  const { isOpen, closeModal, login } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null; 

  const handleSubmit = (e) => {
    e.preventDefault();
    login(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>×</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}