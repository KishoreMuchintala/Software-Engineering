import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { fetchCart, updateCartItem, removeFromCart, addToWishlist } from '../../api/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Load cart items from the backend when the component mounts
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart(token);
        // Filter out items with missing or null product_id
        const validItems = Array.isArray(cartData.items)
          ? cartData.items.filter(item => item.product_id) // Filter items with product_id
          : [];
        setCartItems(validItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(productId, quantity, token);
      setCartItems(cartItems.map(item => item.product_id?._id === productId ? { ...item, quantity } : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCartHandler = async (productId) => {
    try {
      await removeFromCart(productId,token);
      setCartItems(cartItems.filter(item => item.product_id?._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const moveToWishlist = async (productId) => {
    if (!productId) {
      console.error("Product ID is missing for moving to wishlist.");
      return;
    }
  
    try {
      console.log("Attempting to add product to wishlist:", productId);
      
      const response = await addToWishlist(productId, token);
      
      if (response) {
        // If successfully added, remove from cart and update the state
        await removeFromCart(productId,token);
        setCartItems((prevCartItems) => prevCartItems.filter(item => item.product_id._id !== productId));
        alert("Product moved to wishlist");
        console.log("Product successfully moved to wishlist:", productId);
      } else {
        console.log("Product is already in wishlist");
      }
    } catch (error) {
      console.error("Failed to move product to wishlist:", error);
      alert("Product already in wishlist");
    }
  };
  

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + ((item.product_id?.price || 0) * (item.quantity || 1)), 0
  );
  const tax = totalPrice * 0.01;
  const finalTotal = totalPrice + tax;

  const handleBuy = () => {
    alert(`Thank you for your purchase! Total amount: $${finalTotal.toFixed(2)}`);
    setCartItems([]);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map(item => (
            // Only render items with a valid product_id
            item.product_id && (
              <div key={item.product_id._id} className="cart-item">
                <img 
                  src={item.product_id.image || 'https://via.placeholder.com/150'} 
                  alt={item.product_id.name || 'Product Image'} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <h3>{item.product_id.name || 'Product Name Not Available'}</h3>
                  <p>
                    ${((item.product_id.price || 0).toFixed(2))} x 
                    <input
                      type="number"
                      value={item.quantity || 1}
                      min="1"
                      onChange={(e) => updateQuantity(item.product_id._id, parseInt(e.target.value))}
                    />
                  </p>
                  <button className="remove" onClick={() => removeFromCartHandler(item.product_id._id)}>Remove</button>
                  <button className="movetowishlist" onClick={() => moveToWishlist(item.product_id._id)}>Move to Wishlist</button>
                </div>
              </div>
            )
          ))}
          <div className="cart-total">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <h3>Tax (1% of total): ${tax.toFixed(2)}</h3>
            <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
          </div>
          <button onClick={handleBuy} className="buy-button">Buy Now</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button className="ContinueShopping" onClick={() => navigate('/products')}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
