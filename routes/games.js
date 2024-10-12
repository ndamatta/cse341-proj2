const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games')
const { createGameRules, updateGameRules, validate } = require('../validators/gameValidator')
const { isAuthenticated } = require('../authenticators/authenticate')


router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getSingleGame);

router.post('/', isAuthenticated, validate(createGameRules()), gamesController.createGame);
router.put('/:id', isAuthenticated, validate(updateGameRules()),gamesController.updateGame);
router.delete('/:id', isAuthenticated, gamesController.deleteGame)

module.exports =  router;