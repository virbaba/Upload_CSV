const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports.display = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'Uploads', filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Read the file content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Error reading file');
            }

            // Split the content into rows
            const rows = data.split('\n').map(row => row.split(','));

            // Separate the header and content
            const header = rows[0];
            const content = rows.slice(1);

            // Render the EJS view with the header and content
            res.render('display', {
                title: 'Upload_CSV_Project | Display',
                header: header,
                content: content
            }
            );
        });
    });
}