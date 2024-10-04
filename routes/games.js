const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games')

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getSingleGame);

router.post('/', gamesController.createGame);
router.put('/:id', gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame)

module.exports =  router;