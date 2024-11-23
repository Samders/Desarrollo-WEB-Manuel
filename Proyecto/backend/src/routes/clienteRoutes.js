// src/routes/clienteRoutes.js
const express = require('express');
const Cliente = require('../models/Cliente');
const router = express.Router();

// Crear un cliente
router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
