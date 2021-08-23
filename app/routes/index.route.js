const express = require('express');
var router = express.Router();

const controller = require('../controllers/index.controller');

function middlewareAuth(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.render('indexNot');
}

router.get('/', middlewareAuth, controller.get);
router.get('/index', controller.getIndex);
router.get(
	'/saveName/:personId/:course/:period',
	middlewareAuth,
	controller.getSaveName
);

module.exports = router;
