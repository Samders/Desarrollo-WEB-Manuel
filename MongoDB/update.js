const { connectToDatabase, getDatabase } = require('./db');

async function updateDocument(id, newData) {
    const db = getDatabase();
    const collection = db.collection("listingsAndReviews"); // Cambia al nombre de tu colección
    const result = await collection.updateOne({ id: id }, { $set: newData });
    return result;
}

if (require.main === module) {
    connectToDatabase().then(() => {
        const id = 12345678; // Cambia esto por el ID que deseas actualizar
        const updates = { nombre: "Restaurante Actualizado", calificacion: 4.8 };
        return updateDocument(id, updates);
    }).then(result => {
        console.log("Documento actualizado:", result);
    }).catch(console.error);
}

module.exports = updateDocument;

