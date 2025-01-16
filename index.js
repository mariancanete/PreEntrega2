const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const { getProducts, saveProducts } = require('./data/fileManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use(express.static('public'));

// WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('newProduct', (product) => {
        const products = getProducts();
        products.push(product);
        saveProducts(products);
        io.emit('updateProducts', product);
    });
});

server.listen(8080, () => console.log('Servidor corriendo en http://localhost:8080'));