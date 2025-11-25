const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
