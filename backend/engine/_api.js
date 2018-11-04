const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');

class api {
    constructor() {
        this.spotifyApi = new SpotifyWebApi();
    }

    callAPI(path, params, callback) {
        var options = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Authorization': 'Basic YTg3NWU1NDUwMjllNDAzMzllZjRhMWFhMDcwMzEyZWE6NGQyMWQwM2Q5ZmU4NDdjMmJiMmY1ZWM2MTZiZmM5Mjc=',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'grant_type': 'client_credentials'
            }
        };
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                this._makeCall(info.access_token, path, params, callback);
            }
        });
    }

    _makeCall(token, path, params, callback) {
        this.spotifyApi.setAccessToken(token);
        this.spotifyApi[path](...Object.keys(params).map(p => params[p]))
            .then(function (data) {
                if (path == 'searchTracks') {
                    callback(data.body.tracks.items.map(song => {
                        return {
                            uri: song.uri,
                            title: song.name,
                            artist: song.artists.map(artist => artist.name).join(", "),
                            album: song.album.name,
                            album_cover: song.album.images[0].url
                        }
                    }));
                } else if (path == 'getTrack'){
                    song = data.body;
                    callback({
                        uri : song.uri,
                        title : song.name, 
                        artist : song.artists.map(artist => artist.name).join(", "),
                        album : song.album.name, 
                        album_cover : song.album.images[0].url
                    });
                }
            }, function (err) {
                console.error(err);
            });
    }
}

module.exports = api;