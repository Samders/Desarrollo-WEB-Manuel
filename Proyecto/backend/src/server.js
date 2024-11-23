const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Modelos
const Usuario = require("./models/Usuario");
const Inventario = require("./models/Inventario");
const Reserva = require("./models/Reserva");
const Cliente = require("./models/Cliente");

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Generar token JWT
const generarToken = (usuario) => {
  return jwt.sign({ id: usuario._id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Middleware para verificar JWT
const verificarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = decoded; // Guardar datos del usuario
    next();
  });
};

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente");
});

// Ruta para registro de usuarios
app.post("/api/register", async (req, res) => {
  const { nombre, email, telefono, direccion, password, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, telefono, direccion, password: hash, role });
    await nuevoUsuario.save();

    // Guardar usuario en la tabla de clientes (sin contraseña)
    const cliente = new Cliente({ nombre, email, telefono, direccion });
    await cliente.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Ruta para login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = generarToken(usuario);
    res.status(200).json({ token, role: usuario.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta para verificar el rol del usuario
app.post("/api/verify", verificarJWT, (req, res) => {
  res.status(200).json({ role: req.user.role });
});

// Ruta para obtener productos (solo para administradores)
app.get("/api/productos", verificarJWT, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acceso denegado" });

  try {
    const productos = await Inventario.find();
    res.status(200).json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// Ruta para gestionar reservas (usuarios normales)
app.post("/api/reservas", verificarJWT, async (req, res) => {
  const { fecha, producto, cantidad } = req.body;

  if (req.user.role !== "usuario") return res.status(403).json({ message: "Acceso denegado" });

  try {
    const nuevaReserva = new Reserva({ fecha, producto, cantidad, cliente: req.user.id, estado: "pendiente" });
    await nuevaReserva.save();
    res.status(201).json({ message: "Reserva creada exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear reserva" });
  }
});

// Ruta para reportes de clientes (administradores)
app.get("/api/reportes/clientes", verificarJWT, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acceso denegado" });

  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener reportes de clientes" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
