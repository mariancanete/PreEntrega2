const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');
    res.render('cart', { cartId: cid, products: cart.products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getCart,
};