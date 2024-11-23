// src/controllers/usuarioController.js
const Usuario = require('../models/Usuario');
const jwt = require('jwt-simple');
const config = require('../config');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, email, password, role });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar las contraseñas
    const esValida = await usuario.comparePassword(password);
    if (!esValida) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar el JWT
    const payload = { id: usuario._id, role: usuario.role };
    const token =
