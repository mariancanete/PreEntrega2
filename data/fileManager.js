const fs = require('fs');
const productsFile = './data/products.json';
const cartsFile = './data/carts.json';

const getProducts = () => JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
const saveProducts = (products) => fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
const getCarts = () => JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
const saveCarts = (carts) => fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));

module.exports = { getProducts, saveProducts, getCarts, saveCarts };