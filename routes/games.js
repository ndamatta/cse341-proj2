const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games')
const { createGameRules, updateGameRules, validate } = require('../validators/gameValidator')


router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getSingleGame);

router.post('/', validate(createGameRules()), gamesController.createGame);
router.put('/:id', validate(updateGameRules()),gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame)

module.exports =  router;