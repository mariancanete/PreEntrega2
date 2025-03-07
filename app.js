const express = require('express');
const connectDB = require('./db/config');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 8080;

// Conectar a MongoDB
connectDB();

// Configurar middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
