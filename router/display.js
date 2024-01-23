const express = require('express');
const router = express.Router();

const display_controller = require('../controller/display_controller');
router.get('/display/:filename', display_controller.display);


module.exports = router; 