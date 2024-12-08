import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { addToCart, addToWishlist } from '../../api/api';

const ProductCard = ({ product }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const goToProductDetails = () => {
    navigate(`/products/${product.id || product._id}`);
  };

  const handleAddToCart = async () => {
    try {
      console.log("Attempting to add product to cart:", product);
      const response = await addToCart(product,token); // Call the function with the product object
      if (response) {
        alert("Product added to cart");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };
  

  const handleAddToWishlist = async () => {
    try {
      const productId = product._id || product.id; // Ensure the correct ID is used
      console.log("Attempting to add product to wishlist:", productId);
      const response = await addToWishlist(productId, token);
      if (response) {
        alert("Product added to wishlist");
      } else {
        throw new Error("Failed to add product to wishlist");
      }
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
      alert("Product in wishlist already.");
    }
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
        onClick={goToProductDetails}
      />
      <h3 className="product-name" onClick={goToProductDetails}>
        {product.name}
      </h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      {isLoggedIn?<>
      <button 
      className="product-button" 
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
    <button 
      className="wishlist-button" 
      onClick={handleAddToWishlist}
    >
      Add to Wishlist
    </button></>
      : <span>  Login to checkout</span>}
      
    </div>
  );
};

export default ProductCard;
