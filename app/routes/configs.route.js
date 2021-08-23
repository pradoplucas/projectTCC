const express = require('express');
var router = express.Router();

const controller = require('../controllers/configs.controller');

function middlewareAuth(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/');
}

router.get('/configs', middlewareAuth, controller.get);
router.post('/configs/upProfile', middlewareAuth, controller.postUpProfile);
router.post('/configs/upNotif', middlewareAuth, controller.postUpNotif);
router.post('/configs/upSeg', middlewareAuth, controller.postUpSeg);

module.exports = router;
