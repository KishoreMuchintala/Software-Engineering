import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
//contains few gen ai content

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  const navigate = useNavigate();

  const goToProductDetails = () => {
    navigate(`/products/${product.id}`);
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
      <button 
        className="product-button" 
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
      <button 
        className="wishlist-button" 
        onClick={() => addToWishlist(product)}
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductCard;
