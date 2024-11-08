const { connectToDatabase, getDatabase } = require('./db');
const fs = require('fs');

async function insertDocumentsFromFile(filePath) {
    const db = getDatabase();
    const collection = db.collection("Pruebas"); // Cambia al nombre de tu colección

    try {
        // Leer el archivo JSON con codificación UTF-8
        const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });
        const documents = JSON.parse(fileData); // Asegúrate de que el archivo JSON sea un array de objetos

        // Insertar documentos en la colección
        const result = await collection.insertMany(documents);
        console.log("Documentos insertados:", result.insertedCount);
    } catch (error) {
        console.error("Error al insertar documentos:", error.message);
    }
}

// Para permitir la ejecución directa del archivo y mostrar el resultado de la inserción
if (require.main === module) {
    connectToDatabase().then(() => {
        const filePath = "restaurants.json"; // Cambia por la ruta a tu archivo JSON
        return insertDocumentsFromFile(filePath);
    }).catch(console.error);
}

module.exports = insertDocumentsFromFile;
