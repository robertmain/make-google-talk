const home    = require('google-home-notifier');
const Twitter = require('twitter');
const config  = require('./package.json').config;
const base64  = require('base-64');

class Home {
    constructor(ip, voice = 'us') {
        home.ip(ip);
        this.home = home;
        this.history = [];
    }

    speak(message, callback = () => {}){
        this.history.push({message: message, date: new Date()});=
        this.home.notify(message, () => callback('Vocalised: ' + message));
    }

    readTweet(tweet_id, callback){
        const client = new Twitter({
            consumer_key: config.twitter.consumer_key,
            consumer_secret: config.twitter.consumer_secret,
            access_token_key: config.twitter.access_token_key,
            access_token_secret:config.twitter.access_token_secret,
        });

        client.get('statuses/show/' + tweet_id, {
            trim_user: true,
            include_entities: false,
            include_ext_alt_text: false,
            tweet_mode: 'extended'
        }, (API_Error, response, request) => {
            if(API_Error){
                callback('Error ' + API_Error[0].code + ': ' + API_Error[0].message);
                this.speak('Sorry. I can\'t seem to locate that tweet. ' + API_Error[0].message);
            } else {
                this.speak(response.full_text, callback);
            }
        });
    }
}

module.exports = Home;
