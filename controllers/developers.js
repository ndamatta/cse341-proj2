const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllDevelopers = async (req, res) => {
  try {
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('developers').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while fetching the developers.' });
  }
};

const getSingleDeveloper = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid Developer ID to find a developer');
  }
  try { 
    const developerId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('developers').findOne({ _id: developerId });

    if (response) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Developer not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message || 'An unknown error occurred' });
  }
};

const createDeveloper = async (req, res) => {
  const developer = {
    developerName: req.body.developerName,
    founded: req.body.founded,
    headquarters: req.body.headquarters
  };
  
  try {
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('developers').insertOne(developer);
    
    if (response.acknowledged) {
      res.status(201).json({ message: 'Developer created successfully', data: response });
    } else {
      throw new Error('Developer creation not acknowledged by the database');
    }
  } catch (error) {res.status(500).json({ error: error.message || 'An unknown error occurred' });}
};
  
const updateDeveloper = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid Developer ID to find a developer');
  }
  const developer = {
    developerName: req.body.developerName,
    founded: req.body.founded,
    headquarters: req.body.headquarters
  };

  try {
    const developerId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('developers').replaceOne({ _id: developerId }, developer);

    if (response.modifiedCount > 0) {
      res.status(204).send(); 
    } else if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Developer not found' });
    } else {
      throw new Error('Developer update was not successful');
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};
  
const deleteDeveloper = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid Developer ID to delete a developer');
  }
  try {
    const developerId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const response = await database.db().collection('games').deleteOne({ _id: developerId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Developer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

module.exports = {getAllDevelopers, getSingleDeveloper, createDeveloper, updateDeveloper, deleteDeveloper}