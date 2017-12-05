const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const Home       = require('./home');
const pkg        = require('./package.json');
const pug        = require('pug');
const sanitizer  = require('express-sanitizer');

let speechHistory = [];
let myHome = new Home('192.168.1.160');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug')
app.locals.moment = require('moment');

app.get('/', (req, res) => {
    res.render('index', { messages : speechHistory })
});

app.post('/speak', (request, response) => {
    let message = request.body.message;
    myHome.speak(message, console.log);
    speechHistory.push({ message: message, date: new Date() });
    response.redirect('/');
});

app.listen(pkg.config.port, () => console.log('Now listening in port ' + pkg.config.port));
