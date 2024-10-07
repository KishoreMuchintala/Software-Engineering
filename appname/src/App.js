import React, { useState, useEffect } from 'react';
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
//contains few gen ai content
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
//contains few gen ai content
  const [searchTerm, setSearchTerm] = useState('');

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
//contains few gen ai content
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
//contains few gen ai content
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
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList addToCart={addToCart} addToWishlist={addToWishlist} searchTerm={searchTerm} />} />
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
