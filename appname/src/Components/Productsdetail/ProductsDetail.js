import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductsDetail.css';

const ProductDetails = ({ addToCart, addToWishlist }) => {
  const { id } = useParams();
  const productId = parseInt(id);
  
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch the products data from the public directory
    fetch('/db/products.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProductsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);
  
  //some lines from here are generated from chatgpt
  const product = productsData.find((product) => product.id === productId);
  
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
        <p>Platform: {product.platform}</p>
        <button className="product-button" onClick={() => addToCart(product)}>Add to Cart</button>
        <button className="wishlist-button" onClick={() => addToWishlist(product)}>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default ProductDetails;
