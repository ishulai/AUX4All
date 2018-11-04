var port = process.env.PORT || 8888; //sets local server port to 8888
var express = require('express'); // Express web server framework
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var token = null;

var redirect_uri = 'http://localhost:8888'; // Your redirect uri in case you are using apis
var app = express();

app.get('/', function(req, res) {
    var spotifyApi = new SpotifyWebApi();
    
	function spotAPI(path, params, callback){
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
				makeCall(info.access_token, path, params, callback);
			}
		});
	}

    function makeCall(token, path, params, callback) {
        console.log(token, path, params);
        spotifyApi.setAccessToken(token);
        spotifyApi[path](...Object.keys(params).map(p => params[p]))
        .then(function(data) {
            //console.log(path, data.body);
			if (path == 'searchTracks'){
				callback(data.body.tracks.items.map(song => { 
					return {
						uri : song.uri,
						title : song.name, 
						artist : song.artists.map(artist => artist.name).join(", "),
						album : song.album.name, 
						album_cover : song.album.images[0].url
				}}));
			}
			else if (path == 'getTrack'){
				song = data.body;
				callback({
						uri : song.uri,
						title : song.name, 
						artist : song.artists.map(artist => artist.name).join(", "),
						album : song.album.name, 
						album_cover : song.album.images[0].url
			})
			};
			
        }, function(err) {
            console.error(err);
        });
    }
	
	//spotAPI('getUserPlaylists', { 'user' : 'solthums'});
	spotAPI('searchTracks', { 'keyword' : 'Africa' }, obj => console.log(obj));
	//spotAPI('getTrack', { track : '3Qm86XLflmIXVm1wcwkgDK'}, obj => console.log(obj));
	
})

app.get('/play', function(req, res) {
    var spotifyApi = new SpotifyWebApi();
	function playSong(user_token, uri){
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
			console.log(body)
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				console.log(body);
			}
		});
	}
	
	function getCurSong(user_token, callback){
		var options = {
			url: 'https://api.spotify.com/v1/me/player/currently-playing',
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + user_token,
				'Content-Type': 'application/json'
			},
		};
		request(options, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				var track = JSON.parse(body);
				var song = track.item
				if (track.is_playing){
					callback({
							uri : song.uri,
							title : song.name, 
							artist : song.artists.map(artist => artist.name).join(", "),
							album : song.album.name, 
							album_cover : song.album.images[0].url,
							time_left: (song.duration_ms - track.progress_ms)/1000
				})}
				else{
					callback(false)
				}
			}
		});
	}
	
	var user_token = "BQALtdLuYzc0O2uYlfx44x0F3erbzLYx7cHWTRqHlSkQOM1EuPiG_uPafRDYJDfJgrxojIPhvW61rl4m8-U8aBvFOgIlC5jbDToSOD7PdFAQU1L1cN9ADFK-SDmB9zaTkV1GjmEmpxGqvZT5aRdIZiB4KF5EkyjIux8cl6A7QPHz9-A"
	//playSong(user_token, "spotify:track:297Or4DielLdpBLJdgIQ7S");
	res.send("hi");
	setInterval(function(){getCurSong(user_token, obj => console.log(obj))}, 3000);
})


app.listen(port, function() {}); //starts the server, alternatively you can use app.listen(port)