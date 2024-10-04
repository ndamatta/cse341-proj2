const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllGames = async (req, res) => {
  const database = await mongodb.getDatabase();
  const response = database.db().collection('games').find();
  response.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleGame = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const database = await mongodb.getDatabase();
  const response = database.db().collection('games').find({ _id: gameId });
  response.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createGame = async (req, res) => {
  const game = {
    gameName: req.body.gameName,
    releaseDate: req.body.releaseDate,
    developer: req.body.developer,
    publisher: req.body.publisher,
    platforms: req.body.platforms,
    genre: req.body.genre,
    rating: req.body.rating
  };
  
  try {
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').insertOne(game);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while creating the game.');
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};
  
  const updateGame = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    const game = {
        gameName: req.body.gameName,
        releaseDate: req.body.releaseDate,
        developer: req.body.developer,
        publisher: req.body.publisher,
        platforms: req.body.platforms,
        genre: req.body.genre,
        rating: req.body.rating
    };
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').replaceOne({ _id: gameId }, game);

    try {
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the game.');
      }
    } catch (error) {
      res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }

  };
  
  const deleteGame = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').deleteOne({ _id: gameId }, true);

    try {
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
      }
    } catch (error) {
      res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }

  };

module.exports = {getAllGames, getSingleGame, createGame, updateGame, deleteGame}