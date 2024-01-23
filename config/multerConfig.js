const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // set the destination
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});

// back end validation for uploading only csv file
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        // if the extension is .csv then file uploaded
        if (ext === '.csv') {
            cb(null, true);
        }
        else
            cb(null, false);
            
    }
});

module.exports = upload;
