import React, { useState } from 'react';
import Navbar from './Components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './Components/Productslist/Productslist';
import Home from './Components/Home/Home';
import WishList from './Components/Wishlist/Wishlist';
import Cart from './Components/Cart/Cart';
import ProductDetails from './Components/Productsdetail/ProductsDetail';

function App() {
  
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Function to update product quantity in the cart
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to add product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      updateQuantity(existingProduct.id, existingProduct.quantity + 1);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
    }
    alert("Product added to cart");
  };

  // Function to add product to the wishlist
  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert("Product added to wishlist");
    } else {
      alert("Product already in wishlist!");
    }
  };

  

  return (
    <>
      <div className='main_nav'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList addToCart={addToCart} addToWishlist={addToWishlist}/>} />
        <Route path='/Wishlist' element={<WishList addToCart={addToCart} addToWishlist={addToWishlist}/>} />
        <Route path='/cart' element={<Cart addToCart={addToCart} addToWishlist={addToWishlist}/>} />
        <Route 
          path='/products/:id' 
          element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} />} 
        />
      </Routes>
    </>
  );
}

export default App;
