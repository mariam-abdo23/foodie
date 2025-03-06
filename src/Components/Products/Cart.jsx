import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router";

export default function Cart() {
  const { cartItems, removeFromCart, decreaseQuantity } = useContext(CartContext);

  const totalItems = cartItems.reduce((total, product) => total + product.quantity, 0);

  return (
    <>
      <div className="over-lay">
        <div className="cart-container">
          <div className="text-center pt-5">
            <h2>Shopping Cart</h2>
            <p className="fs-4 fw-bold pt-5">Total Items: {totalItems}</p>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-warning mt-5 fs-1 fw-bold">Your cart is empty.</p>
          ) : (
            <div className="container">
              {cartItems.map((product) => (
                <div key={product.product_code} className="cart-item d-flex p-5 border rounded">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="cart-item-image products-card ms-5" style={{ width: "70%" }}>
                        <Link to={`/Product-details/${product.product_code}`}>
                          <img
                            src={product.image}
                            alt={product.product_name}
                            className="card-img-top rounded"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="cart-item-details">
                        <Link className="text-decoration-none" to={`/Product-details/${product.product_code}`}>
                          <h4 className="mt-4 fw-bold fs-5" style={{ color: "#f35b04" }}>
                            {product.product_name}
                          </h4>
                        </Link>
                        <p className="badge text-bg-warning mt-3 fs-6">
                          <span>Price: $</span>
                          {product.price}
                        </p>
                        <p className="text-secondary fs-5">
                          <strong style={{ color: "#f35b04" }}>Quantity:</strong> {product.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="cart-item-actions ms-auto">
                        <button
                          className="btn btn-warning mt-2 ms-5"
                          onClick={() => decreaseQuantity(product.product_code)}
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-danger mt-2 ms-5"
                          onClick={() => removeFromCart(product.product_code)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}