const Validator = require('validatorjs');

const createGameRules = () => ({
  gameName: 'required|string',
  releaseDate: 'required|date',
  developer: 'required|string',
  publisher: 'required|string',
  platforms: 'required|array|min:1',
  genre: 'required|string',
  rating: 'required|numeric|min:0|max:10'
});

const updateGameRules = () => ({
  gameName: 'required|string',
  releaseDate: 'required|date',
  developer: 'required|string',
  publisher: 'required|string',
  platforms: 'required|array|min:1',
  genre: 'required|string',
  rating: 'required|numeric|min:0|max:10'
});

const validate = (rules) => {
  return (req, res, next) => {
    const validation = new Validator(req.body, rules);

    if (validation.passes()) {
      return next();
    } else {
      return res.status(422).json({
        errors: validation.errors.all()
      });
    }
  };
};

module.exports = { createGameRules, updateGameRules, validate };
