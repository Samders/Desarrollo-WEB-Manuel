// src/controllers/inventarioController.js
const Inventario = require('../models/Inventario');

// Crear un nuevo producto en inventario
exports.crearProducto = async (req, res) => {
  try {
    const { producto, cantidad, precio, descripcion } = req.body;
    const nuevoProducto = new Inventario({ producto, cantidad, precio, descripcion });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los productos en inventario
exports.obtenerProductos = async (req, res) => {
  try {
    const inventarios = await Inventario.find();
    res.json(inventarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Inventario.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto en inventario
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Inventario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto del inventario
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Inventario.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
