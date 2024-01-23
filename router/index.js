const express = require('express');
const router = express.Router();

const home_controller = require('../controller/home_controller');
router.get('/', home_controller.home);
router.use('/upload', require('./uploadRouter'));
router.use('/file', require('./display'));

module.exports = router; 