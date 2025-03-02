const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Falta esta línea
const { getProducts, getProductById } = require('../controllers/productController'); // Importar el controlador


// Definir la ruta para obtener productos
router.get('/', getProducts);  // Usar la función getProducts del controlador

// Definir la ruta para obtener detalles de un producto
router.get('/:id', getProductById); // Añadir ruta para ver detalles de un producto


router.get('/api', async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const filter = query ? { category: query } : {};
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
        lean: true,
      };
      const result = await Product.paginate(filter, options);
      //res.json(result); // Devuelve los productos en formato JSON
      res.render('index', { 
        status: 'success',
        payload: result.docs, // ← Aquí pasamos `payload`
        totalPages: result.totalPages,
        prevPage: result.prevPage || null,
        nextPage: result.nextPage || null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
        nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
      });
      
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  

module.exports = router;
