// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    select: false // hides this field by default in queries
  }
});


module.exports = mongoose.model('Product', ProductSchema);
