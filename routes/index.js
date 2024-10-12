const express = require('express');
const router = express.Router();
const gamesRoute = require('./games')
const developersRoute = require('./developers')
const swaggerRoute = require('./swagger');
const passport = require('passport');

router.use('/', swaggerRoute);
router.use('/games', gamesRoute);
router.use('/developers', developersRoute);

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err);}
        res.redirect('/');
    })
})
module.exports =  router;