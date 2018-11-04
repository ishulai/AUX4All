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
                //'Authorization': 'Basic ODFkNDVjNWE1NWVhNDliM2JkMDQzM2I4OGY2OTFhY2E6ZDU3NzNjNzcwZTgwNDkxY2E4ZjIzYTZlMDQxYzBlNjU=',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'grant_type': 'client_credentials',
                'client_id': '81d45c5a55ea49b3bd0433b88f691aca',
                'client_secret': 'd5773c770e80491ca8f23a6e041c0e65'
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
                } else if (path == 'getTrack') {
                    let song = data.body;
                    callback({
                        uri: song.uri,
                        title: song.name,
                        artist: song.artists.map(artist => artist.name).join(", "),
                        album: song.album.name,
                        album_cover: song.album.images[0].url
                    });
                }
            }, function (err) {
                console.error(err);
            });
    }

    playSong(user_token, uri) {
        var options = {
            url: 'https://api.spotify.com/v1/me/player/play',
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'uris': [uri]
            })
        };
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
            }
        });
    }

    getCurrentState(user_token, callback) {
        var options = {
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user_token,
                'Content-Type': 'application/json'
            }
        };
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var track = JSON.parse(body);
                var song = track.item
                if(track.progress_ms === 0) callback(false);
                else if (track.is_playing) {
                    callback({
                        uri: song.uri,
                        title: song.name,
                        artist: song.artists.map(artist => artist.name).join(", "),
                        album: song.album.name,
                        album_cover: song.album.images[0].url
                    })
                } else {
                    callback(false)
                }
            }
        });
    }

    codeToToken(code, redirect_uri, callback) {
        console.log("hi");
        console.log(redirect_uri);
        var options = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                //'Authorization': 'Basic ODFkNDVjNWE1NWVhNDliM2JkMDQzM2I4OGY2OTFhY2E6ZDU3NzNjNzcwZTgwNDkxY2E4ZjIzYTZlMDQxYzBlNjU=',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirect_uri,
                'client_id': '81d45c5a55ea49b3bd0433b88f691aca',
                'client_secret': 'd5773c770e80491ca8f23a6e041c0e65'
            }
        };
        request(options, (error, response, body) => {
            console.log(body)
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                callback(info.access_token);
            }
        });
    }
}

module.exports = api;