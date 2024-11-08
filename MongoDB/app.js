const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// URI de conexión a MongoDB Atlas
const mongoURI = 'mongodb+srv://alberthneerans:12345@cluster0.im30u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conexión a MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log('Error al conectar a MongoDB Atlas:', err));

// Definir un esquema y modelo para los usuarios
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rutas de la API
app.post('/usuarios', async (req, res) => {
  const usuario = new Usuario(req.body);
  try {
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
