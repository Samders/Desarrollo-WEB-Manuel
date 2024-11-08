const { MongoClient } = require('mongodb');

// Configura la URI de conexión a MongoDB
const uri = "mongodb+srv://alberthneerans:12345@cluster0.im30u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let db = null;

// Función para conectar a la base de datos
async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("sample_airbnb"); // Cambia al nombre de tu base de datos
    console.log("Conectado a MongoDB");
    return db;
}

// Función para obtener la base de datos
function getDatabase() {
    if (!db) {
        throw new Error("Base de datos no inicializada. Conéctate primero.");
    }
    return db;
}

module.exports = { connectToDatabase, getDatabase };
