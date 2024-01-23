const fs = require('fs');
const csv = require('csv-parser');

// import multer confing file that define file storage and also validate file must have .csv extension 
const upload = require('../config/multerConfig');

function handleUpload(req, res) {
    // fetching the file from request object
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = uploadedFile.path;
    const results = [];

    // we create read stream to better performance and divide the file data into chunk
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            results.push(row);
        })
        .on('end', () => {

           res.redirect('back');

        });
        req.flash('success', 'Uploaded');
    }
        


module.exports = { handleUpload };
