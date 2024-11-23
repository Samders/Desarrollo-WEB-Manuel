// src/routes/authRoutes.js
const express = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const config = require('../config');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    res.status(201).json({ message:
