import React, { useState, useEffect } from 'react';
import './Products.css';
import ProductCard from '../ProductCard/ProductCard';
import { fetchProducts } from '../../api/api'; // Import the API function

const ProductList = ({ addToCart, addToWishlist, searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [selectedPlatform, setSelectedPlatform] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(); // Fetch products from backend
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        loadProducts();
    }, []);

    const filterProducts = () => {
        const filtered = products.filter(product => {
            const withinPriceRange = product.price >= minPrice && product.price <= maxPrice;
            const matchesPlatform = selectedPlatform ? product.platform === selectedPlatform : true;
            const matchesSearchTerm = searchTerm ? product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            return withinPriceRange && matchesPlatform && matchesSearchTerm;
        });
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        filterProducts();
    }, [minPrice, maxPrice, selectedPlatform, searchTerm, products]);

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
