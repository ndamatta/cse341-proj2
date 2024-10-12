const express = require('express');
const router = express.Router();
const developersController = require('../controllers/developers')
const { createDeveloperRules, updateDeveloperRules, validate } = require('../validators/developerValidator')
const { isAuthenticated } = require('../authenticators/authenticate')


router.get('/', developersController.getAllDevelopers);
router.get('/:id', developersController.getSingleDeveloper);

router.post('/', isAuthenticated, validate(createDeveloperRules()), developersController.createDeveloper);
router.put('/:id', isAuthenticated, validate(updateDeveloperRules()),developersController.updateDeveloper);
router.delete('/:id', isAuthenticated, developersController.deleteDeveloper)

module.exports =  router;