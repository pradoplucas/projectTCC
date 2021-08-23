const express = require('express');
var router = express.Router();

const controller = require('../controllers/recomend.controller');

function middlewareAuth(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.render('recomend', { logged: false });
}

router.get('/recomend', controller.get);
router.post('/insertRecomend', middlewareAuth, controller.postInsertRecomend);
router.get(
	'/prepareToEditRecomend/:recomendId',
	middlewareAuth,
	controller.getPrepareToEditRecomend
);
router.post('/editRecomend', middlewareAuth, controller.postEditRecomend);
router.get(
	'/deleteRecomend/:recomendId',
	middlewareAuth,
	controller.getDeleteRecomend
);

module.exports = router;
