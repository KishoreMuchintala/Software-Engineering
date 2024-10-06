import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const navigate = useNavigate();

 //some lines from here are generated from chatgpt
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const moveToWishlist = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
      setWishlist([...wishlist, product]);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, product])); // Update wishlist in localStorage
    }
  };

  
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  
  const tax = totalPrice * 0.01;

  
  const finalTotal = totalPrice + tax;

  
  const handleBuy = () => {
    
    alert(`Thank you for your purchase! Total amount: $${finalTotal.toFixed(2)}`);
    
    
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([])); 
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} x 
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </p>
                <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                <button className='movetowishlist' onClick={() => moveToWishlist(item.id)}>Move to Wishlist</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <h3>Tax (1% of total): ${tax.toFixed(2)}</h3>
            <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
          </div>
          <button onClick={handleBuy} className="buy-button">Buy Now</button> {/* Buy Button */}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button className="ContinueShopping" onClick={() => navigate('/products')}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
