import React from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer text-light w-100 py-4">
      <div className="container text-center">
        <div className="row">
          
          <div className="col-md-4 fs-5 fw-bold">
            <h5 style={{color:'#f35b04'}}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="index">Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/Products">Products</Link></li>
              <li><Link className="text-light text-decoration-none" to="/Favorites">Favorites</Link></li>
              <li><Link className="text-light text-decoration-none" to="/cart">Cart</Link></li>
            </ul>
          </div>

          
          <div className="col-md-4 fs-5 fw-bold">
            <h5 style={{color:'#f35b04'}}>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +20 123 456 789</p>
          </div>

         
          <div className="col-md-4 fs-5 fw-bold">
            <h5 style={{color:'#f35b04'}}>Follow Us</h5>
            <div className="d-flex justify-content-center mt-3  gap-3">
              <a href="#" className="text-light "><FontAwesomeIcon icon={faFacebook} size="xl" /></a>
              <a href="#" className="text-light"><FontAwesomeIcon icon={faInstagram} size="xl" /></a>
              <a href="#" className="text-light"><FontAwesomeIcon icon={faTwitter} size="xl" /></a>
            </div>
          </div>
        </div>

        {/* حقوق الملكية */}
        <hr className="bg-light mt-4" />
        <p className="mb-0">© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
}