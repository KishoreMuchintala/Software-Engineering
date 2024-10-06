import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const location = useLocation();
  
  // Initialize wishlist state
  const [wishlist, setWishlist] = useState(location.state?.wishlist || []);

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist); // Update state
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Persist updated wishlist
  };

  // Move item to cart
  const moveToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Update quantity if it already exists in the cart
      cart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add product to cart with quantity 1
      cart = [...cart, { ...product, quantity: 1 }];
    }

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Remove the product from the wishlist
    removeFromWishlist(product.id); // Update state and localStorage for wishlist
  };

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-card">
              <img src={product.image} alt={product.name} className="wishlist-image" />
              <div className="wishlist-details">
                <h3 className="wishlist-name">{product.name}</h3>
                <p className="wishlist-description">{product.description}</p>
                <p className="wishlist-price">${product.price}</p>
                <button onClick={() => removeFromWishlist(product.id)} className="remove-button">
                  Remove from Wishlist
                </button>
                <button onClick={() => moveToCart(product)} className="move-button">
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
