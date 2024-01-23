const fs = require('fs').promises;
const path = require('path');

module.exports.home = async (req, res) =>{

    try {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        const files = await fs.readdir(uploadDir);
        const csvFiles = files.filter(file => path.extname(file) === '.csv');
        res.render('home', {
            title: 'Upload-CSV | home',
            Files: csvFiles
        })
    } catch (error) {
        res.status(500).json({ error: 'Error reading upload directory' });
    }
   
} 