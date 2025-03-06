import React, { useEffect, useState } from "react";
import { Link } from "react-router";
export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (product_code) => {
    const updatedFavorites = favorites.filter((product) => product.product_code !== product_code);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return <>
   
      <div className="over-lay">
      <div className="container">
      <div>
        <h2 className="text-center p-5" style={{ color: "#f35b04" }}>Favorites ❤</h2>
        </div>
      {favorites.length === 0 ? (
        <h4 className="text-center text-secondary p-5">There are no products added to favorites</h4>
      ) : (

     
        <div className="row gap-5">
          {favorites.map((product) => (
            <div key={product.product_code} className="col-md-3 mb-4">
              <div className="card product-Details h-100">
                <Link to={`/Product-details/${product.product_code}`}>
                  <img
                    src={product.image}
                    alt={product.product_name}
                    style={{
                      maxWidth: '500px',
                      height: "300px"
                    }}
                    className="card-img-top p-2 rounded"
                  />
                </Link>
                <div className="card-body text-center">
                  <h5 style={{color:'#f34b04'}} className="card-title">{product.product_name}</h5>
                  <button
                    className="btn mt-2"
                    style={{color:'white', backgroundColor:'#f34b04'}}
                    onClick={() => removeFromFavorites(product.product_code)}
                  >
                    Delete from favorites ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      </div>
    
   
    </>
}