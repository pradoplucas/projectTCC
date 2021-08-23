const express = require('express');
var router = express.Router();

const controller = require('../controllers/searchPerson.controller');

router.get('/searchPerson', controller.get);
router.get(
	'/searchPerson/personSearch/:personName',
	controller.getPersonSearch
);
router.get('/searchPerson/personList/:personId', controller.getPersonList);
router.get(
	'/searchPerson/personListSimple/:personId',
	controller.getPersonListSimple
);
router.get('/searchPerson/download/:arrayCodes', controller.getPersonDownload);

module.exports = router;
