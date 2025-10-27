// server.js
const express = require('express');
const mongodb = require('./data/database');

const app = express();

app.use(express.json());

// Rutas
const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Backend OK 🚀');
});

// Inicializar base de datos y luego arrancar servidor
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Error al conectar con MongoDB:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado a MongoDB');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
    });
  }
});
