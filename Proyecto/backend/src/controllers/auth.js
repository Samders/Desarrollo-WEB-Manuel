const express = require('express');
const autenticarJWT = require('./middlewares/autenticarJWT');

const app = express();

app.get('/datos-protegidos', autenticarJWT, (req, res) => {
  res.json({ mensaje: 'Acceso permitido', usuario: req.usuario });
});

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));

