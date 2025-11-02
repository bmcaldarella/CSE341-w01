const express = require('express');
const mongodb = require('./data/database');

const app = express();

app.use(express.json());

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec= require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




// Ruotes API
const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Backend OK 🚀');
});

// BDD MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Error dbb not connected ', err);
    process.exit(1);
  } else {
    console.log('✅ MongoDB connected successfully');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  }
});
