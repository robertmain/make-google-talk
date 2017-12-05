const home = require('google-home-notifier');

class Home {
    constructor(ip, voice = 'us') {
        this.home = home;
        this.home.ip(ip, voice);
    }

    speak(message, callback = () => {}){
        this.home.notify(message, callback);
    }
}

module.exports = Home;