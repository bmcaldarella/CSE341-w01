const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Simple API for contacts (BYU-I CSE 341 W02)',
    },
    servers: [
      { url: 'https://TU-APP.onrender.com' },    
      { url: 'http://localhost:3000' },
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
          properties: {
            firstName:     { type: 'string', example: 'Ada' },
            lastName:      { type: 'string', example: 'Lovelace' },
            email:         { type: 'string', format: 'email', example: 'ada@example.com' },
            favoriteColor: { type: 'string', example: 'blue' },
            birthday:      { type: 'string', format: 'date', example: '1815-12-10' }
          }
        },
        IdResponse: {
          type: 'object',
          properties: { id: { type: 'string', example: '661f2d3b9a1234567890abcd' } }
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string', example: 'Contact not found' } }
        }
      },
      parameters: {
        ContactIdParam: {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', example: '661f2d3b9a1234567890abcd' },
          description: 'MongoDB ObjectId of the contact'
        }
      }
    }
  },
  apis: ['./routes/*.js'], 
};

module.exports = swaggerJSDoc(options);
