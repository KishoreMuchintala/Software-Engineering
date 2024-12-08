const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const mongoose = require('mongoose');
const { authenticate } = require('../middleware/authMiddleware'); // Authentication middleware

// Get all items in the wishlist
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.userId; // Extract userId from JWT

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products.product_id'); // Populate product details
    if (!wishlist || wishlist.products.length === 0) {
      return res.status(404).json({ message: 'Wishlist is empty' });
    }
    res.json({ products: wishlist.products });
  } catch (err) {
    console.error('Error fetching wishlist:', err.message);
    res.status(500).json({ message: 'Server error fetching wishlist' });
  }
});

// Add a product to the wishlist
router.post('/', authenticate, async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.userId; // Extract userId from JWT

  // Validate the product ID
  if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [{ product_id }],
      });
    } else {
      const existingProduct = wishlist.products.find((item) => item.product_id.equals(product_id));

      if (existingProduct) {
        return res.status(200).json({ message: 'Product already in wishlist', alreadyExists: true });
      }

      wishlist.products.push({ product_id });
    }

    const updatedWishlist = await wishlist.save();
    res.status(201).json({ message: 'Product added to wishlist', products: updatedWishlist.products });
  } catch (err) {
    console.error('Error in POST /api/wishlist:', err.message);
    res.status(500).json({ message: 'Server error while adding to wishlist' });
  }
});

// Remove a specific product from the wishlist
router.delete('/product/:productId', authenticate, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId; // Extract userId from JWT

  // Validate the product ID format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    console.log(userId, wishlist)
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Find the product index
    const productIndex = wishlist.products.findIndex((item) => item._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    // Remove the product and save
    wishlist.products.splice(productIndex, 1);
    const updatedWishlist = await wishlist.save();

    res.json({ message: 'Product removed from wishlist', products: updatedWishlist.products });
  } catch (err) {
    console.error('Error removing product from wishlist:', err.message);
    res.status(500).json({ message: 'Failed to remove product from wishlist' });
  }
});

module.exports = router;
