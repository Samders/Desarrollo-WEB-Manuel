// backend/models/Reserva.js
const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }, // Se requiere el cliente
  fecha: { type: Date, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
