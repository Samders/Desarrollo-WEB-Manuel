const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../backend/src/config/config');

// Modelos
const Cliente = require('../backend/src/models/Cliente');
const Inventario = require('../backend/src/models/Inventario');
const Usuario = require('../backend/src/models/Usuario');
const Reserva = require('../backend/src/models/Reserva');

// Función para inicializar datos
const inicializarDatos = async () => {
  try {
    // Conexión a MongoDB
    const uri = `${config.db.uri}/${config.db.databaseName}`;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');

    // Limpiar colecciones
    await Usuario.deleteMany({});
    await Cliente.deleteMany({});
    await Inventario.deleteMany({});
    await Reserva.deleteMany({});

    console.log('Colecciones limpiadas');

    // Crear usuarios
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

    console.log('Usuarios creados:');

    // Crear clientes
    const clientes = await Cliente.create([
      { nombre: 'Juan Perez', email: 'juan@correo.com', telefono: '555-1234', direccion: 'Calle Ficticia 123' },
      { nombre: 'Maria Gomez', email: 'maria@correo.com', telefono: '555-5678', direccion: 'Avenida Imaginaria 456' },
    ]);
    console.log('Clientes creados:');

    // Crear productos
    const inventarios = await Inventario.create([
      { producto: 'Laptop', cantidad: 20, precio: 1500, descripcion: 'Laptop de 15 pulgadas, 8GB de RAM, 512GB SSD.' },
      {producto: 'Smartphone', cantidad: 50, precio: 800, descripcion: 'Smartphone de 6.5 pulgadas, cámara de 48MP, 128GB de almacenamiento. '},
    ]);
    console.log('Productos de inventario creados:');

    // Crear reservas
    const reservas = await Reserva.create([
      {
        cliente: clientes[0]._id,
        producto: 'Producto A',
        cantidad: 2,
        fecha: new Date('2024-12-01'),
        estado: 'pendiente',
      },
      {
        cliente: clientes[1]._id,
        producto: 'Producto B',
        cantidad: 1,
        fecha: new Date('2024-12-15'),
        estado: 'pendiente',
      },
    ]);
    console.log('Reservas creadas:');

    console.log('Inicialización completada');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar la inicialización
inicializarDatos();
