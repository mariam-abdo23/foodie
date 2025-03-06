import React, { useContext } from "react";
import { Link } from "react-router";
import { Products as ProductsContext } from "../../Context/ProdectContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faTruck, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";



export default function Home() {
  const products = useContext(ProductsContext);
  const allProducts = products?.flatMap((category) => category.items) || [];
  const featuredProducts = allProducts.slice(0, 6);

  return <>
    
      <div className="home">
        <div className="Over">
        <div className="overlay">
          <div className="container hero-content">
            <h1 className="mb-4">
              Enjoy the most delicious recipes and fresh products
            </h1>

            <div className="d-flex justify-content-center gap-5 m-4">
              <div className="custom-link">
                <Link className="text-decoration-none text-light" to="/Products">
                  See categories
                </Link>
              </div>
              <div className="custom-link">
                <Link className="text-decoration-none text-light" to="/Favorites">
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        </div>

        </div>
       
        <div className="over-lay" style={{ height: "630px" }}>
          <h2 className="text-center pt-5">Featured Products</h2>
          <div className="container mt-2">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
              }}
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.product_code}>
                  <div
                    className="Card border mt-5 p-3 text-center"
                    style={{ height: "400px" }}
                  >
                    <Link to={`/Product-details/${product.product_code}`}>
                      <img
                        src={product.image}
                        alt={product.product_name}
                        className="w-100 rounded product-img"
                      />
                    </Link>
                    <h5 style={{ color: "#f35b04" }} className="mt-4">
                      {product.product_name}
                    </h5>
                    <p className="badge mt-2 text-bg-warning fs-6">
                      <span>Price: </span>
                      {product.price}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-center p-3">
              <Link
                className="btn text-light"
                style={{ backgroundColor: "#f35b04" }}
                to="/Products"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us mt-5">
          <h2 className="text-center" style={{ color: "#f35b04" }}>
            Why Choose Us?
          </h2>
          <div className="container">
            <div className="row text-center mt-4  ">
              <div className="col-lg-4 col-md-12 p-4">
               <FontAwesomeIcon icon={faSeedling} size="xl" style={{color:'#f35b04'}}/>
                <h3 className="mt-2" style={{color:'#f35b04'}}>Fresh & Healthy Ingredients</h3>
                <p className="fs-5">We provide 100% natural ingredients with no preservatives.</p>
              </div>
              <div className="col-lg-4 col-md-12  p-4">
              <FontAwesomeIcon icon={faUtensils} size="xl" style={{color:'#f35b04'}}/>
                <h3 className="mt-2" style={{color:'#f35b04'}}>Variety of Recipes</h3>
                <p className="fs-5">Enjoy a wide range of recipes suitable for all diets.</p>
              </div>
              <div className="col-lg-4 col-md-12 p-4">
                <FontAwesomeIcon icon={faTruck} size="xl" style={{color:'#f35b04'}}/>
                <h3 className="mt-2" style={{color:'#f35b04'}}>Fast Delivery</h3>
                <p className="fs-5">We ensure quick delivery to maintain food quality.</p>
              </div>
              <div className="col-lg-4 col-md-12 p-4">
                <FontAwesomeIcon icon={faHeart} size="xl" style={{color:'#f35b04'}}/>
                <h3 className="mt-2" style={{color:'#f35b04'}}>Natural Ingredients</h3>
                <p className="fs-5">We prioritize your health by selecting the best ingredients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  
}