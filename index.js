const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/files', (req, res) => {
    res.json([
        { id: 1, name: 'sermon1.mp3' },
        { id: 2, name: 'sermon2.mp3' }
    ]);
});

app.post('/upload', (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));