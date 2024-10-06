import React, { useState, useEffect } from 'react';
import './Products.css';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ addToCart, addToWishlist }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  useEffect(() => {
    fetch('./db/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to filter products based on price and platform
  const filterProducts = () => {
    const filtered = products.filter(product => {
      const withinPriceRange = product.price >= minPrice && product.price <= maxPrice;
      const matchesPlatform = selectedPlatform ? product.platform === selectedPlatform : true;
      return withinPriceRange && matchesPlatform;
    });
    setFilteredProducts(filtered);
  };

  // Effect to apply filters when dependencies change
  useEffect(() => {
    filterProducts();
  }, [minPrice, maxPrice, selectedPlatform, products]); // Re-run filtering when these change

  return (
    <div className="product-list-page">
      <h2>Our Products</h2>
      
      {/* Filter Options */}
      <div className="filter-options">
        <div className="filter-price">
          <label>Min Price:</label>
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => setMinPrice(Number(e.target.value))} 
          />
          <label>Max Price:</label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))} 
          />
        </div>
        
        <div className="filter-platform">
          <label>Platform:</label>
          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">All</option>
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            {/* Add more platforms as needed */}
          </select>
        </div>
        
        <button onClick={filterProducts}>Apply Filters</button>
      </div>
      
      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
