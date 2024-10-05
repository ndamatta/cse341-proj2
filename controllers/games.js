const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllGames = async (req, res) => {
  try {
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while fetching the games.' });
  }
};

const getSingleGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid Game ID to find a game');
  }
  try { 
    const gameId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').findOne({ _id: gameId });

    if (response) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Game not found' }); // Handle case where game is not found
    }
  } catch (error) {
    res.status(400).json({ message: error.message || 'An unknown error occurred' });
  }
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
  console.log(game)
  
  try {
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').insertOne(game);
    
    if (response.acknowledged) {
      res.status(201).json({ message: 'Game created successfully', data: response });
    } else {
      throw new Error('Game creation not acknowledged by the database');
    }
  } catch (error) {res.status(500).json({ error: error.message || 'An unknown error occurred' });}
};
  
const updateGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid Game ID to find a game');
  }
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
    const gameId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').replaceOne({ _id: gameId }, game);

    if (response.modifiedCount > 0) {
      res.status(204).send(); 
    } else if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Game not found' });
    } else {
      throw new Error('Game update was not successful');
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};
  
const deleteGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid Game ID to delete a game');
  }
  try {
    const gameId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

module.exports = {getAllGames, getSingleGame, createGame, updateGame, deleteGame}