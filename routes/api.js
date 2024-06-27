const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Endpoint to fetch image filenames
router.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, '..', 'public', 'photography');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Error reading image directory:', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        // Filter out only image files
        const imageFiles = files.filter(file => {
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
        });
        res.setHeader('Content-Type', 'application/json');
        console.log(imageFiles);
        res.json(imageFiles);
    });
});

module.exports = router;