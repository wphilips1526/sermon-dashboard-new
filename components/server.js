const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: 'YOUR_AWS_ACCESS_KEY', // Replace with your AWS Access Key
    secretAccessKey: 'YOUR_AWS_SECRET_KEY', // Replace with your AWS Secret Key
    region: 'YOUR_AWS_REGION' // e.g., 'us-east-1'
});

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Setup for File Uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const params = {
        Bucket: 'walk-with-victory-sermons',
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(500).send('Error uploading file');
        }
        res.json({ message: 'File uploaded successfully', location: data.Location });
    });
});

// List Files Route
app.get('/files', (req, res) => {
    const params = {
        Bucket: 'walk-with-victory-sermons'
    };

    s3.listObjectsV2(params, (err, data) => {
        if (err) {
            console.error('List Error:', err);
            return res.status(500).send('Error listing files');
        }
        const files = data.Contents.map(file => ({
            key: file.Key,
            url: s3.getSignedUrl('getObject', { Bucket: 'walk-with-victory-sermons', Key: file.Key })
        }));
        res.json(files);
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
