const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
console.log("Start of Code");
const app = express();
const PORT = 4000;
const FLASK_API_URL = 'http://127.0.0.1:5000/predict'; // Flask API URL

app.use(cors());
app.use(bodyParser.json());

// Endpoint to receive user input and forward to Flask API
app.post('/analyze-sentiment', async (req, res) => {
    console.log("Start calling Model in Task1");
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        // Send request to Flask API
        const response = await axios.post(FLASK_API_URL, { text });
        res.json(response.data);
        console.log("Finish calling Model in Task1");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to connect to Flask API' });
    }
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
