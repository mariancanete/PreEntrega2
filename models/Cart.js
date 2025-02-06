const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
  products: { type: [cartItemSchema], default: [] },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;