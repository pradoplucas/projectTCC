const express = require('express');
var router = express.Router();

const controller = require('../controllers/resetPassword.controller');

router.get('/resetPassword/:emailId', controller.get);
router.post('/resetPassword', controller.post);
router.get('/sendEmail/:emailId', controller.getSendEmail);

module.exports = router;
