import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router'; 
import { Products as ProductsContext } from '../../Context/ProdectContext';
import { CartContext } from '../../Context/CartContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function ProductDetails() {
  const { product_code } = useParams();
  const products = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);

  const product = products
    ?.flatMap((category) => category.items)
    .find((item) => item.product_code === parseInt(product_code));

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [isFavorite, setIsFavorite] = useState(() => {
    return favorites.some((fav) => fav.product_code === parseInt(product_code));
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (!product) {
    return <div className='text-center text-danger mt-5'>LOADING...</div>;
  }

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.product_code !== product.product_code);
      } else {
        return [...prevFavorites, product];
      }
    });

    setIsFavorite(!isFavorite);
  };

  return <>
    
     <div className='over-lay'>
     <div className="container">
          <div className='row justify-content-center text-center pt-5'>
            
            
            <div className="col-12">
              <img
                src={product.image}
                alt={product.product_name}
                className="rounded product-Details img-fluid"
                style={{ maxWidth: '350px', height: 'auto' }}
              />
            </div>

            
            <div className="col-12 mt-4">
              <h2>{product.product_name}</h2>

              
              <p className="badge text-bg-warning fs-6">
                <span>Price: $</span>{product.price}
              </p>

             
              <div className="d-flex justify-content-center gap-3 mt-3">
                
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-outline-warning"
                >
                 Add to Cart : <FontAwesomeIcon icon={faShoppingCart} size='xl' /> 
                </button>

                
                <button className="btn" onClick={toggleFavorite}>
                Favorite : <FontAwesomeIcon
                    icon={isFavorite ? solidHeart : regularHeart}
                    size="xl"
                    style={{ color: isFavorite ? '#d62828' : '#aaa' }}
                  /> 
                </button>
              </div>

              
              <p className='lh-lg mt-4' style={{ color: '#0d1b2a', letterSpacing: '1px' }}>
                <strong className='fs-5' style={{ color: '#bc6c25' }}>Ingredients: </strong>
                {product.product_ingredients}
              </p>

              
              <p className='lh-lg mt-4' style={{ color: '#0d1b2a', letterSpacing: '1px' }}>
                <strong className='fs-5' style={{ color: '#bc6c25' }}>Nutrition Info: </strong>
                {product.product_nutrition_info}
              </p>
            </div>
          </div>
        </div>
     </div>
       
      
    
        </>
}