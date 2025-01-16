const express = require('express');
const { getProducts, saveProducts } = require('../data/fileManager');
const { v4: uuidv4 } = require('uuid');
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    const products = getProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.render('home', { products: products.slice(0, limit) });
});

productsRouter.get('/:pid', (req, res) => {
    const products = getProducts();
    const product = products.find(p => p.id === req.params.pid);
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

productsRouter.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send('Todos los campos son obligatorios, excepto thumbnails');
    }
    const products = getProducts();
    const newProduct = {
        id: uuidv4(), title, description, code, price, stock, category, thumbnails: thumbnails || [], status: status !== undefined ? status : true
    };
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

productsRouter.delete('/:pid', (req, res) => {
    let products = getProducts().filter(p => p.id !== req.params.pid);
    saveProducts(products);
    res.status(204).send();
});

module.exports = productsRouter;
