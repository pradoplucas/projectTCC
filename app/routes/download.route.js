const express = require('express');
var router = express.Router();

const controller = require('../controllers/download.controller');

router.get('/download/:userId', controller.getDownloadCerts);
router.get('/deleteDir/:userId', controller.getDeleteDir);

module.exports = router;
