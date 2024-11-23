const jwt = require('jsonwebtoken');
const config = require('../config/config');

const autenticarJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const datos = jwt.verify(token, config.jwt.secret);
    req.usuario = datos; // Agregar datos del token al request
    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = autenticarJWT;
