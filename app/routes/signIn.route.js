const express = require('express');
var router = express.Router();
const passport = require('passport');

const controller = require('../controllers/signIn.controller');

function middlewareAuth(req, res, next) {
	if (req.isAuthenticated()) res.redirect('/');
	else return next();
}

router.get('/signIn', middlewareAuth, controller.get);
router.post(
	'/signIn',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signIn?fail=true',
	})
);

module.exports = router;
