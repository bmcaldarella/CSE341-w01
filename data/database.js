const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('⚠️ DB ya estaba inicializada');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      console.log('✅ Conectado a MongoDB');
      database = client.db(); // usa la DB por defecto de la URI
      callback(null, database);
    })
    .catch((err) => {
      console.error('❌ Error al conectar a MongoDB:', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('❌ Database no inicializada. Llama a initDb primero.');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
