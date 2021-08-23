const express = require('express');
var router = express.Router();

const controller = require('../controllers/verifyEmail.controller');

router.get('/verifyEmail/:emailId', controller.get)

module.exports = router;