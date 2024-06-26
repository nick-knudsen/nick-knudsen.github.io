const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Endpoint to fetch image filenames
app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'images', 'photography');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Error reading image directory:', err)
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        // Filter out only image files (optional)
        const imageFiles = files.filter(file => {
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
        });
        res.json(imageFiles);
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});