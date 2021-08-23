const express = require('express');
var router = express.Router();

const controller = require('../controllers/signOut.controller');

function middlewareAuth(req, res, next) {
    if(req.isAuthenticated()) return next();

    res.redirect('/');
}

router.get('/signOut', middlewareAuth, controller.get)

module.exports = router;