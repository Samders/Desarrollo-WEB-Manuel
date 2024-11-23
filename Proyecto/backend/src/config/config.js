
  
  module.exports = {
    db: {
      uri: 'mongodb+srv://alberthneerans:12345@cluster0.im30u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      databaseName: 'My_DB',
    },
    jwt: {
      secret: 'tu_clave_secreta_super_segura',
      expiresIn: '1h', // Tiempo de expiración del token
    },
  };
  