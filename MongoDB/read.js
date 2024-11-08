const { connectToDatabase, getDatabase } = require('./db');

async function readDocuments() {
    const db = getDatabase();
    const collection = db.collection("listingsAndReviews"); // Cambia al nombre de tu colección
    const documents = await collection.find().toArray();
    return documents;
}

// Para permitir la ejecución directa del archivo y mostrar los documentos
if (require.main === module) {
    connectToDatabase().then(() => {
        return readDocuments();
    }).then(documents => {
        console.log("Documentos en la colección:");
        if (documents.length > 0) {
            documents.forEach(doc => console.log(doc));
        } else {
            console.log("No se encontraron documentos.");
        }
    }).catch(console.error);
}

module.exports = readDocuments;
