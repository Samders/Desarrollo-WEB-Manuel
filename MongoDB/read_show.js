const { connectToDatabase, getDatabase } = require('./db');

// Esta función cuenta los documentos y busca uno específico
async function countDocumentsAndFetchOne(filter) {
    const db = getDatabase();
    const collection = db.collection("listingsAndReviews"); // Cambia al nombre de tu colección

    // Contar los documentos en la colección
    const count = await collection.countDocuments();

    // Buscar un documento que coincida con el filtro
    const document = await collection.findOne(filter);
    
    return { count, document }; // Retorna el conteo y el documento encontrado
}

// Para permitir la ejecución directa del archivo y mostrar la cantidad de documentos y un documento específico
if (require.main === module) {
    connectToDatabase().then(() => {
        const filter = { _id: "10057447" }; // Cambia esto según el criterio deseado
        return countDocumentsAndFetchOne(filter);
    }).then(({ count, document }) => {
        console.log(`Número de documentos en la colección: ${count}`);
        if (document) {
            console.log("Documento encontrado:", document);
        } else {
            console.log("No se encontró ningún documento que coincida con el criterio.");
        }
    }).catch(console.error);
}

module.exports = countDocumentsAndFetchOne;




