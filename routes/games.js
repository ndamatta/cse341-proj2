const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games')

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getSingleGame);

module.exports =  router;