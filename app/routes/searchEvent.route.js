const express = require('express');
var router = express.Router();

const controller = require('../controllers/searchEvent.controller');

router.get('/searchEvent', controller.get);
router.get('/searchEvent/eventSearch/:eventYear', controller.getEventSearch);
router.get('/searchEvent/eventList/:eventId', controller.getEventList);

router.get('/searchEvent/download/:arrayCodes', controller.getEventDownload);

module.exports = router;
