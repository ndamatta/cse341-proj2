const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Video-games API',
    description: 'API to retrieve basic information about video-games'
  },
  host: 'cse341-proj2-4075.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

