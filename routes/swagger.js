const express = require('express')
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerFile));

module.exports = router;
