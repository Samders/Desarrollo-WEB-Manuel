const { getDatabase } = require('./db');

async function deleteDocument(filter) {
    const db = getDatabase();
    const collection = db.collection("nombre_coleccion"); // Cambia al nombre de tu colección
    const result = await collection.deleteOne(filter);
    console.log(`${result.deletedCount} documento(s) eliminado(s)`);
}

module.exports = deleteDocument;
