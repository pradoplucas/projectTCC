const express = require('express');
var router = express.Router();

const controller = require('../controllers/docs.controller');

router.get('/docs', controller.get)

module.exports = router;