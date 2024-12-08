import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductsDetail.css';
import { fetchProductById, addToCart as addToCartApi, addToWishlist as addToWishlistApi } from '../../api/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCartApi({ product_id: product._id, quantity: 1 },token);
      alert('Product successfully added to cart!');
    } catch (error) {
      alert('Failed to add product to cart. Please try again.');
      console.error('Error adding product to cart:', error);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    try {
      await addToWishlistApi(product._id,token);
      alert('Product added to wishlist!');
    } catch (error) {
      alert('Product already in assigned in your wishlist.');
      console.error('Error adding product to wishlist:', error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
        <p>Platform: {product.platform}</p>
        <button className="product-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="wishlist-button" onClick={handleAddToWishlist}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
