// src/models/Inventario.js
const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String },
});

module.exports = mongoose.model('Inventario', InventarioSchema);
