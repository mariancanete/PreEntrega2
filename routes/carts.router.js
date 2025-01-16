const express = require('express');
const { getCarts, saveCarts, getProducts } = require('../data/fileManager');
const { v4: uuidv4 } = require('uuid');
const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
    const carts = getCarts();
    const newCart = { id: uuidv4(), products: [] };
    carts.push(newCart);
    saveCarts(carts);
    res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
    const carts = getCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const carts = getCarts();
    const products = getProducts();
    const cartIndex = carts.findIndex(c => c.id === req.params.cid);
    if (cartIndex === -1) return res.status(404).send('Carrito no encontrado');

    const product = products.find(p => p.id === req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');

    const productIndex = carts[cartIndex].products.findIndex(p => p.product === req.params.pid);
    if (productIndex !== -1) {
        carts[cartIndex].products[productIndex].quantity++;
    } else {
        carts[cartIndex].products.push({ product: req.params.pid, quantity: 1 });
    }
    saveCarts(carts);
    res.json(carts[cartIndex]);
});

module.exports = cartsRouter;