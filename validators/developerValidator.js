const Validator = require('validatorjs');

const createDeveloperRules = () => ({
  developerName: 'required|string',
  founded: 'required|date',
  headquarters: 'required|string'
});

const updateDeveloperRules = () => ({
    developerName: 'required|string',
    founded: 'required|date',
    headquarters: 'required|string'
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

module.exports = { createDeveloperRules, updateDeveloperRules, validate };
