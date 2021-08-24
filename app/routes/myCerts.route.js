const express = require('express');
var router = express.Router();
const controller = require('../controllers/myCerts.controller');

function middlewareAuth(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/');
}

router.get('/myCerts', middlewareAuth, controller.get);
router.get('/groupList', middlewareAuth, controller.getGroupsList);
router.post('/ocultCert', middlewareAuth, controller.postOcultCert);
router.post('/showCert', middlewareAuth, controller.postShowCert);
router.get(
	'/prepareToEditCert/:certCode',
	middlewareAuth,
	controller.getPrepareToEditCert
);
router.post('/editCert', middlewareAuth, controller.postEditCert);
router.get(
	'/prepareToInsertCert',
	middlewareAuth,
	controller.getPrepareToInsertCert
);
router.post('/insertCert', middlewareAuth, controller.postInsertCert);
router.get('/deleteCert/:certCode', middlewareAuth, controller.getDeleteCert);
router.get(
	'/myCerts/download/:arrayCodes',
	middlewareAuth,
	controller.getCertsDownload
);

module.exports = router;
