const path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(3030, function() {
    console.log('Server running on port 3030!');
});

app.post('/add', (req, res) => {
    //console.log(req.body);
    try {
        console.log('trying to fetch...');
        const sentiment = textapi.sentiment(
            {
                text: req.body.formText
            },
            function(error, response) {
                if (error === null) {
                    console.log(response);
                    res.send(response);
                }
            }
        );
        console.log(sentiment);
    } catch (error) {
        console.log(error);
    }
});

app.get('/test', function(req, res) {
    res.send(mockAPIResponse);
});
