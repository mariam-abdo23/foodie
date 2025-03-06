import './App.css'
import Navbar from './Components/Layout/Navbar'
import Home from './Components/Home/home'
import Products from './Components/Products/products'
import Favorites from './Components/Favorites/Favorites'

import ProductsDetails from './Components/Products/ProductsDetails'
import { Route, Routes } from 'react-router'
import { ProductsProvider } from './Context/ProdectContext'
import ProductPages from './Components/Products/ProductPages'
import Cart from './Components/Products/Cart'
import { CartProvider } from './Context/CartContext'
import Footer from './Components/Layout/Footer'
import {  AuthModalProvider} from './Context/AuthModalContext'
import AuthModal from './Components/Home/AuthModal'
import { ToastContainer } from 'react-toastify'





export default function App() {
  return <>
   
  <ProductsProvider>
    <AuthModalProvider>
    <CartProvider> 
      <Navbar />
      
      <AuthModal/>
      <ToastContainer/>
  <Routes>
<Route path='index' element={<Home />}/>
<Route path='/Products' element={ <Products />} />
<Route path='/Product-details/:product_code' element={<ProductsDetails />} />
<Route path='/category/:Category' element={<ProductPages/>}/>
<Route path='/cart' element={<Cart />} />
<Route path='/Favorites' element={<Favorites />}/>
  </Routes>
  <Footer/>
  </CartProvider>
  </AuthModalProvider>
  </ProductsProvider>
  
 </>
}
