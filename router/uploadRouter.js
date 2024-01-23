const express = require('express');
const { handleUpload } = require('../controller/uploadController');

const router = express.Router();
const upload = require('../config/multerConfig');

router.post('/file', upload.single('csvFile'), handleUpload);

module.exports = router;
