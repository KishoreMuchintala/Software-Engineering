import React, { useState, useEffect } from 'react';
import './Wishlist.css';
import { fetchWishlist, removeFromWishlist, addTooCart } from '../../api/api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch wishlist items from the backend
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const wishlistData = await fetchWishlist(token);
        if (Array.isArray(wishlistData)) {
          setWishlist(wishlistData);
        } else {
          console.error("Unexpected format for wishlist data:", wishlistData);
          setError("Failed to load wishlist.");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError("Failed to load wishlist. Please try again later.");
      }
    };
    loadWishlist();
  }, []);

  // Remove item from wishlist and update state
  const handleRemoveFromWishlist = async (productId) => {
    if (!productId) {
      console.error("Product ID is missing for removal.");
      return;
    }
  
    console.log("Removing product from wishlist with ID:", productId);
  
    try {
      const response = await removeFromWishlist(productId,token);
  
      if (response && response.message === 'Product removed from wishlist') {
        setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
        console.log("Product successfully removed from wishlist:", productId);

      } else {
        console.warn("Product was not found in wishlist.");
      }
    } catch (error) {
      console.error("Failed to remove product from wishlist:", error);
    }
  };
  
  
  
  

  // Move item from wishlist to cart and update state
  const handleMoveToCart = async (product) => {
    const productId = product.product_id._id;
    console.log(product)
    if (!productId) {
      console.error("Product ID is missing for moving to cart.");
      return;
    }
    console.log(product," Product when clicked move to card from wishlist");
    try {
      const response = await addTooCart({ product_id: productId, quantity: 1 },token);
  
      if (response) {
        setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== productId));
        alert("Product moved to cart");
        console.log("Product successfully added to cart:", productId);
      } else {
        throw new Error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Failed to move product to cart:", error);
      alert("Failed to move product to cart. Please try again.");
    }
  };
  

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((product) => {
            const productId = product._id || product.product_id?._id;
            const productImage = product.image || product.product_id?.image || 'https://via.placeholder.com/150';
            const productName = product.name || product.product_id?.name || 'Product Name Not Available';
            const productDescription = product.description || product.product_id?.description || 'No description available';
            const productPrice = product.price || product.product_id?.price || 'N/A';

            return (
              <div key={productId} className="wishlist-card">
                <img src={productImage} alt={productName} className="wishlist-image" />
                <div className="wishlist-details">
                  <h3 className="wishlist-name">{productName}</h3>
                  <p className="product-description">{productDescription}</p>
                  <p className="product-price">${productPrice}</p>
                  <button 
                    onClick={() => handleRemoveFromWishlist(productId)} 
                    className="remove-button"
                  >
                    Remove from Wishlist
                  </button>
                  <button 
                    onClick={() => handleMoveToCart(product)} 
                    className="move-button"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
