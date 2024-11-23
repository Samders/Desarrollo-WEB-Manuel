// src/routes/reservaRoutes.js
const express = require('express');
const Reserva = require('../models/Reserva');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación
const { crearReserva } = require('../controllers/reservasController');

const router = express.Router();

// Crear una nueva reserva
router.post('/', async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('cliente producto');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
