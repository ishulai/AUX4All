
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');

class api {
    constructor() {
        this.accessToken = null;
        this.spotifyApi = new SpotifyWebApi();
    }
}

module.exports = api;