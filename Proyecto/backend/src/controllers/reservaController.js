// src/controllers/reservaController.js
const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');
const Inventario = require('../models/Inventario');

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
  try {
    const { clienteId, productoId, cantidad, fechaReserva } = req.body;
    
    // Verificar que el cliente existe
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Verificar que el producto existe
    const producto = await Inventario.findById(productoId);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si hay suficiente inventario
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ message: 'No hay suficiente inventario' });
    }

    // Crear la reserva
    const nuevaReserva = new Reserva({
      cliente: clienteId,
      producto: productoId,
      cantidad,
      fechaReserva,
      estado: 'pendiente',
    });

    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('cliente producto');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('cliente producto');
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el estado de una reserva
exports.actualizarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
