const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController'); // Importar el controlador

// Definir la ruta para obtener productos
router.get('/', getProducts);  // Usar la función getProducts del controlador

// Definir la ruta para obtener detalles de un producto
router.get('/:id', getProductById); // Añadir ruta para ver detalles de un producto

module.exports = router;
