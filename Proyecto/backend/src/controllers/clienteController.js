// src/controllers/clienteController.js
const Cliente = require('../models/Cliente');

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    const nuevoCliente = new Cliente({ nombre, email, telefono, direccion });

    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (er
