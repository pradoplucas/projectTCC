const express = require('express');
var router = express.Router();

const controller = require('../controllers/signUp.controller');

function middlewareAuth(req, res, next) {
	if (req.isAuthenticated()) res.redirect('/');
	else return next();
}

router.get('/signUp', middlewareAuth, controller.get);
router.post('/signUp', controller.post);

module.exports = router;
