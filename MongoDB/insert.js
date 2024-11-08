const { connectToDatabase, getDatabase } = require('./db');
const fs = require('fs');

async function createDocument(data) {
    const db = getDatabase();
    const collection = db.collection("Pruebas"); // Cambia al nombre de tu colección
    const result = await collection.insertOne(data);
    return result;
}

if (require.main === module) {
    connectToDatabase().then(() => {
        const newDocument = { id: 12345684, nombre: "Otro Restaurante", direccion: "Avenida 26 New York", calificacion: 4.0 };
        return createDocument(newDocument);
    }).then(result => {
        console.log("Documento insertado:", result);
    }).catch(console.error);
}

module.exports = createDocument;
