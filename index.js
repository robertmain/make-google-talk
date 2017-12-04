const app        = express();
const bodyParser = require('body-parser');
const express    = require('express');
const home       = require('./home');
const pkg        = require('./package.json');
const pug        = require('pug');
const sanitizer  = require('express-sanitizer');

let speechHistory = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/handleRequest', (request, response) => {
    let message = request.body.message;
    speechHistory.push({ message: message, date: new Date() });
});

app.get('/history', (req, res) => {
    res.json(speechHistory);
});

app.listen(pkg.config.port, () => console.log('Now listening in port ' + pkg.config.port));
