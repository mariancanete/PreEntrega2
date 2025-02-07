const Product = require('../models/Product');

// Obtener productos
const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Construir el filtro
    const filter = {};
    if (query) {
      filter.category = query; // Filtra por categoría
    }

    // Opciones de paginación y ordenamiento
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
      lean: true,
    };

    // Consulta con paginación
    const result = await Product.paginate(filter, options);

    // Renderizar la vista con los datos
    res.render('index', {
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage || null,
      nextPage: result.nextPage || null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}`
        : null,
      nextLink: result.hasNextPage
        ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}`
        : null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener detalle de un producto
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Buscar producto por ID
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('product', { product }); // Pasar el producto a la vista product.handlebars
  } catch (error) {
    res.status(500).send('Error al obtener el producto');
  }
};

module.exports = {
  getProducts,
  getProductById,
};
