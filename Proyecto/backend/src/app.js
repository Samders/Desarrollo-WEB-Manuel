// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Rutas
const clienteRoutes = require('./routes/clienteRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const authRoutes = require('./routes/authRoutes');

// Configuración de entorno
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log('Error al conectar a MongoDB: ', err));

// Rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
