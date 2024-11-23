// src/routes/inventarioRoutes.js
const express = require('express');
const Inventario = require('../models/Inventario');
const router = express.Router();

// Crear un producto en inventario
router.post('/', async (req, res) => {
  try {
    const producto = new Inventario(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los productos del inventario
router.get('/', async (req, res) => {
  try {
    const inventarios = await Inventario.find();
    res.json(inventarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
