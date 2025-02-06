// app.js
const express = require('express');
const connectDB = require('./db/config');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const handlebars = require('express-handlebars');
const path = require('path');

// Inicializar la aplicación
const app = express();
const PORT = 8080;

// Conectar a MongoDB
connectDB();

// Configurar middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas de la API
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta para la vista de productos
app.get('/products', (req, res) => {
  res.render('index'); // Renderiza la vista index.handlebars
});

// Ruta para la vista de un carrito específico
app.get('/carts/:cid', (req, res) => {
  res.render('cart', { cartId: req.params.cid }); // Renderiza la vista cart.handlebars
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});