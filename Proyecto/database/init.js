// database/initDB.js
const mongoose = require('mongoose');
const path = require('path');

// Configuración y modelos deben ser requeridos desde el backend
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

// Modelos
const Cliente = require('../backend/src/models/Cliente');
const Inventario = require('../backend/src/models/Inventario');
const Usuario = require('../backend/src/models/Usuario');
const Reserva = require('../backend/src/models/Reserva');

const bcrypt = require('bcryptjs');

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Conectado a MongoDB');

  // Limpiar colecciones
  await Cliente.deleteMany({});
  await Inventario.deleteMany({});
  await Usuario.deleteMany({});
  await Reserva.deleteMany({});  // Limpiar la colección de reservas


  // Crear usuarios iniciales
  const password = await bcrypt.hash('admin123', 10);
  const usuarioAdmin = new Usuario({
    nombre: 'Administrador',
    email: 'admin@miempresa.com',
    password,
    role: 'admin',
  });

  const usuarioCliente = new Usuario({
    nombre: 'Cliente Ejemplo',
    email: 'cliente@miempresa.com',
    password,
    role: 'usuario',
  });

  // Guardar usuarios
  await usuarioAdmin.save();
  await usuarioCliente.save();
  console.log('Usuarios creados');

  // Crear clientes de ejemplo
  const cliente1 = new Cliente({
    nombre: 'Juan Perez',
    email: 'juan@correo.com',
    telefono: '555-1234',
    direccion: 'Calle Ficticia 123',
  });

  const cliente2 = new Cliente({
    nombre: 'Maria Garcia',
    email: 'maria@correo.com',
    telefono: '555-5678',
    direccion: 'Calle Ficticia 456',
  });

  // Guardar clientes
  await cliente1.save();
  await cliente2.save();
  console.log('Clientes creados', cliente1);

  // Crear productos en inventario
  const producto1 = new Inventario({
    producto: 'Laptop',
    cantidad: 20,
    precio: 1500,
    descripcion: 'Laptop de 15 pulgadas, 8GB de RAM, 512GB SSD.',
  });

  const producto2 = new Inventario({
    producto: 'Smartphone',
    cantidad: 50,
    precio: 800,
    descripcion: 'Smartphone de 6.5 pulgadas, cámara de 48MP, 128GB de almacenamiento.',
  });

  // Guardar productos en inventario
  await producto1.save();
  await producto2.save();
  console.log('Productos de inventario creados');

  // Crear reservas
  console.log('Creando reservas...');
   const reserva1 = new Reserva({
    clienteId: cliente1._id,
    fecha: new Date('2024-12-01'),
    producto: 'Producto A',
    cantidad: 2,
    estado: 'pendiente',
  });
  console.log('Reserva 1 a guardar:', reserva1);
  await reserva1.save();
  console.log('Reserva 1 creada:', reserva1);
  console.log('Creando reservas...');
  const reserva2 = new Reserva({
    clienteId: cliente2._id,
    fecha: new Date('2024-12-05'),
    producto: 'Producto B',
    cantidad: 1,
    estado: 'confirmada',
  });
  
  console.log('Reserva 1 creada:', reserva1);
  
  await reserva2.save();


  // Finalizar
  mongoose.connection.close();
})
.catch(err => {
  console.log('Error al conectar a MongoDB:', err);
});
