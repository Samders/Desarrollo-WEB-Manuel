import pkg from 'pg';   // Importa el paquete completo
import dotenv from 'dotenv';
const { Pool } = pkg;   // Desestructura el Pool desde el paquete

// Configuración de la conexión usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Función para probar la conexión
export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa con la base de datos');
        client.release();
    } catch (err) {
        console.error('Error al conectar con la base de datos', err);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
};


pool.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error de conexión: ', err));

// Exportar el pool para usarlo en las consultas
export { pool }; // Exportación correcta del pool

