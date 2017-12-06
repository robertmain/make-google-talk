const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const Home       = require('./home');
const config     = require('./package.json').config;
const pug        = require('pug');
const sanitizer  = require('express-sanitizer');

let myHome = new Home(config.homeIP);

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug')

app.locals.moment = require('moment');

app.get('/', (req, res) => {
    res.render('partials/home', { messages : myHome.history })
});

app.post('/speak', (request, response) => {
    myHome.speak(request.body.message, (homeResponse) => {
        console.log(homeResponse);
    });
    response.redirect('/');
});


app.get('/readTweet/:id', (httpRequest, httpResponse) => {
    myHome.readTweet(httpRequest.params.id, (homeResponse) => {
        console.log(homeResponse);
        httpResponse.render('layout', {messages: myHome.history});
    });
});

app.listen(config.webServer.port, () => console.log('Now listening on port ' + config.webServer.port));