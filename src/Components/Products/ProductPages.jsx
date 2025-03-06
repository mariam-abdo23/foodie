import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Products as ProductsContext } from '../../Context/ProdectContext';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../Context/CartContext';

function ProductPages() {
  const { Category } = useParams();
  const productsData = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext); 
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (productsData) {
      const categoryData = productsData.find(item => item.category === Category);
      if (categoryData && categoryData.items) {
        setProducts(categoryData.items);
      } else {
        setProducts([]);
      }
    }
  }, [Category, productsData]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (selectedProduct) => {
    if (!favorites.some((fav) => fav.product_code === selectedProduct.product_code)) {
      const updatedFavorites = [...favorites, selectedProduct];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favorites.filter(fav => fav.product_code !== selectedProduct.product_code);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return <>
  
      <div className='pages'>
      <div className='container text-center'>
          <h2 className='p-5'>{Category}</h2>
          {products && products.length > 0 ? (
            <div className="row">
              {products.map((product) => {
                const isFavorite = favorites.some(fav => fav.product_code === product.product_code);
                return (
                  <div key={product.product_code} className="col-md-4 mb-4">
                    <div className="card products-card position-relative" style={{ height: '550px' }}>
                      <Link to={`/Product-details/${product.product_code}`}>
                        <img
                          src={product.image}
                          alt={product.product_name}
                          style={{
                            maxWidth: '500px',
                            height: "400px"
                          }}
                          className="card-img-top p-2 rounded"
                        />
                      </Link>

                   
                      <button
                        onClick={() => addToFavorites(product)}
                        className="favorite-btn fav"
                      >
                        <FontAwesomeIcon
                          icon={isFavorite ? solidHeart : regularHeart}
                          className="heart-icon"
                          style={{ color: isFavorite ? "red" : "gray" }}
                        />
                      </button>

                      <div className="card-body">
                        <h5 className="card-title">{product.product_name}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="badge mt-2 text-bg-warning fs-6">
                            <span>Price: $</span>
                            {product.price}
                          </p>
                         
                          <button
                            onClick={() => {

                              addToCart(product);
                            }}
                            className="cart-btn"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} size='xl' style={{ color: '#f35b04' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
  
      </div>
      
    </>
}

export default ProductPages;