import React, { useContext, useState, useEffect } from 'react';
import { Products as ProductsContext } from '../../Context/ProdectContext';
import { CartContext } from '../../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';

export default function Products() {
  const product = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const [favorites, setFavorites] = useState([]);

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

  
  const allProducts = product?.flatMap(category => category.items) || [];

  return (
    <div className='prodect'>
      <div className='over-lay'>
        <div className='container'>
          <div className="row g-5">
            {allProducts.map((product) => {
              const isFavorite = favorites.some(fav => fav.product_code === product.product_code);
              
              return (
                <div key={product.product_code} className="col-lg-4 col-md-12 col-sm-12">
                  <div className='products-card border p-4 mt-5' style={{height:'400px'}}>
                    <div className='product-image-container position-relative'> 
                      <Link to={`/Product-details/${product.product_code}`}>
                        <img src={product.image} alt={product.product_name} className='w-100 rounded product-img' />
                      </Link>

                      <button 
                        onClick={() => addToFavorites(product)} 
                        className="favorite-btn fav"
                      >
                        <FontAwesomeIcon 
                          icon={isFavorite ? solidHeart : regularHeart} 
                          className='heart-icon' 
                          style={{ color: isFavorite ? "red" : "gray" }} 
                        />
                      </button>
                    </div>
                    
                    <h5 className='mt-4 text-center'>{product.product_name}</h5>
                    
                    <div className='d-flex justify-content-between mt-3'>
                      <p className="badge text-bg-warning fs-6"><span>Price: </span>{product.price}</p>
                      <button 
                        onClick={() => {
                
                          addToCart(product);
                        }} 
                        className="cart-btn"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} size='xl' style={{color:'#f35b04'}} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}