const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllGames = async (req, res) => {
  const database = await mongodb.getDatabase();
  const result = database.db().collection('games').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleGame = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const database = await mongodb.getDatabase();
  const result = database.db().collection('games').find({ _id: gameId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = {getAllGames, getSingleGame}