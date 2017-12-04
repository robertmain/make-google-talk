const home = require('google-home-notifier');

export default class GoogleHome {
    constructor(ip, voice = 'us') {
        this.home = home;
        this.home.ip(ip, voice);
    }

    speak(message, callback){
        this.home.notify(message, callback);
    }
}