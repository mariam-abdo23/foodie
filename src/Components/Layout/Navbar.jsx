import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import { useAuthModal } from "../../Context/AuthModalContext";
import { Products as ProductsContext } from "../../Context/ProdectContext"; 

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { openModal, isLoggedIn, logout } = useAuthModal();
  const products = useContext(ProductsContext);

  const cartCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return <>
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-1 logo" style={{ color: "#f35b04" }} to="/">
          Foodie
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex gap-4 fs-5 fw-bold">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link " to="/products" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/products">All Products</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                {products && products.map((categoryItem) => (
                  <li key={categoryItem.category}>
                    <NavLink className="dropdown-item" to={`/category/${categoryItem.category}`}>
                      {categoryItem.category}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/Favorites">Favorites</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto d-flex gap-5">
            <li className="nav-item">
              <Link to="/cart">
                <button type="button" className="btn position-relative mt-1">
                  <FontAwesomeIcon icon={faShoppingCart} size="xl" style={{ color: "#f35b04" }} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                          style={{ backgroundColor: "#f35b04" }}>
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            </li>

           
            <li className="nav-item">
              {isLoggedIn ? (
                <button className="btn btn-danger" onClick={logout}>Logout</button>
              ) : (
                <button className="btn btn-primary" onClick={openModal}>Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
 </>
}