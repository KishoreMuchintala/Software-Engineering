import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const location = useLocation();
  
  //some lines from here are generated from chatgpt
  const [wishlist, setWishlist] = useState(location.state?.wishlist || []);

  
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);


  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist); 
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Persist updated wishlist
  };

  
  const moveToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      //some lines from here are generated from chatgpt
      cart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      
      cart = [...cart, { ...product, quantity: 1 }];
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));

    
    removeFromWishlist(product.id); 
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
