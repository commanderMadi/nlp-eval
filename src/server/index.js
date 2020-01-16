const path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const jsonParser = bodyParser.json();

const dotenv = require('dotenv');
dotenv.config();

const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(3030, function () {
    console.log('Server running on port 3030!');
});

app.post('/add', jsonParser, (req, res) => {
    //console.log(req.body);
    console.log('trying to fetch...');
    console.log(textapi);
    console.log('the request body ==> ', req.body.formText);
    textapi.sentiment({
            text: req.body.formText
        },
        function (error, response) {
            console.log(error);
            if (error === null) {
                res.send(response);
            }
        }
    );
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});