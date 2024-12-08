const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Adjust path as needed
const Product = require('../models/Product'); // Adjust path as needed
const { authenticate } = require('../middleware/authMiddleware'); // Authentication middleware
const mongoose = require('mongoose');

// Add an item to the cart


router.post('/', authenticate, async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.userId; // Extract userId from JWT
  try {
    // Validate product_id
    if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: 'Invalid or missing product ID' });
    }

    // Check if product exists in the database
    const productExists = await Product.findById(product_id);
    console.log(req, product_id, productExists);

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) => item.product_id.toString() === product_id);
    if (existingItem) {
      // Update the quantity if the item exists
      existingItem.quantity += quantity || 1;
    } else {
      // Add new item to the cart
      cart.items.push({ product_id, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});



router.post('/add', authenticate, async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.userId; // Extract userId from JWT
  try {
    // Validate product_id
    if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: 'Invalid or missing product ID' });
    }

    // Check if product exists in the database
    const productExists = await Product.findById(product_id );
    console.log(req, product_id, productExists);

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) => item.product_id.toString() === product_id);
    if (existingItem) {
      // Update the quantity if the item exists
      existingItem.quantity += quantity || 1;
    } else {
      // Add new item to the cart
      cart.items.push({ product_id, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Get all items in the cart
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product_id');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Update the quantity of an item in the cart
router.put('/product/:productId', authenticate, async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.product_id.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Failed to update item quantity' });
  }
});

// Remove an item from the cart
router.delete('/product/:productId', authenticate, async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.product_id.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});


module.exports = router;

