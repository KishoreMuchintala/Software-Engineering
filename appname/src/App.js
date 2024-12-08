import React, { useState, useEffect } from 'react';
import Navbar from './Components/navbar/navbar';
import { Route, Routes, Navigate} from 'react-router-dom';
import ProductsList from './Components/Productslist/Productslist';
import Home from './Components/Home/Home';
import WishList from './Components/Wishlist/Wishlist';
import Cart from './Components/Cart/Cart';
import ProductDetails from './Components/Productsdetail/ProductsDetail';
import Authentication from './Components/Authentication/Authentication';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from './api/api';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  const token = localStorage.getItem('token');
  // Load cart and wishlist from the backend on initial load
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart(token);
        setCart(cartData);
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    const loadWishlist = async () => {
      try {
        const wishlistData = await fetchWishlist(token);
        setWishlist(wishlistData);
      } catch (error) {
        console.error('Failed to load wishlist:', error);
      }
    };

    loadCart();
    loadWishlist();
  }, []);

  // Update item quantity in the cart
  const handleUpdateCartQuantity = async (productId, quantity) => {
    try {
      const updatedCartItem = await updateCartItem(productId, quantity);
      setCart((prevCart) => 
        prevCart.map((item) => (item.id === productId ? updatedCartItem : item))
      );
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    }
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    try {
      if (existingProduct) {
        await handleUpdateCartQuantity(existingProduct.id, existingProduct.quantity + 1);
      } else {
        const newCartItem = await addToCart(product);
        setCart((prevCart) => [...prevCart, newCartItem]);
      }
      alert("Product added to cart");
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert("Failed to add product to cart");
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  // Add product to wishlist
  const handleAddToWishlist = async (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      alert("Product already in wishlist!");
      return;
    }
    try {
      const newWishlistItem = await addToWishlist(product);
      setWishlist((prevWishlist) => [...prevWishlist, newWishlistItem]);
      alert("Product added to wishlist");
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert("Failed to add product to wishlist");
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId,token);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <>
      <div className="main_nav">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <ProductsList
              addToCart={handleAddToCart}
              addToWishlist={handleAddToWishlist}
              searchTerm={searchTerm}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishList
              addToCart={handleAddToCart}
              removeFromWishlist={handleRemoveFromWishlist}
              wishlist={wishlist}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              updateQuantity={handleUpdateCartQuantity}
              removeFromCart={handleRemoveFromCart}
              cart={cart}
            />
          }
        />
        <Route
          path="/auth"
          element={isLoggedIn ?( <><Navigate to="/profile" />  </>): 
            <Authentication/>
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ) : (<Navigate to="/auth" />)
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={handleAddToCart} addToWishlist={handleAddToWishlist} />}
        />
      </Routes>
    </>
  );
}

export default App;
