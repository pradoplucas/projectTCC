const express = require('express');
var router = express.Router();

const controller = require('../controllers/about.controller');

router.get('/about', controller.get);
router.post('/about/saveSuggestion', controller.postSaveSuggestion);

module.exports = router;
