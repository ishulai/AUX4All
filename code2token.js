app.get('/conv', function(req, res) {
	function codeToToken(code, callback){
		var options = {
			url: 'https://accounts.spotify.com/api/token',
			method: 'POST',
			headers: {
				'Authorization': 'Basic YTg3NWU1NDUwMjllNDAzMzllZjRhMWFhMDcwMzEyZWE6NGQyMWQwM2Q5ZmU4NDdjMmJiMmY1ZWM2MTZiZmM5Mjc=',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: {
				'grant_type': 'authorization_code',
				'code' : code,
				'redirect_uri': 'https://auth.expo.io/@solomon.joseph/AUX4All'
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
	var code = "AQCsFRy391_aLHuR52qd-n5PabBexRRGeS7rQ5oIwDeGm0k8Q6ay28KG2OTdtmaWUTLG9aqpIEXSmE595G0-EZfYn2jf-7sJSkYYnwgRW-6Z2EA8pxAgT9aPnkWEviftFTqXlC2xPSQJTjHLuv7w5IcJSryyuCq6tUQZ-sLPNOsBfs31y5DFwtN2M6ZzT6zTK_BHNyKtIaAAgx7Nwq7lCFp_u6W8VjkWds41IWoR6Qyzo11oGGcTYqyReCe94mWPAcn-8xQzZGtk8iqvcnr7p9D-SQ7CJ7tbXzuidMNW1XdYDZvUHOELQvdtvWFjTljp9yh-gKz81A"
	codeToToken(code, obj => console.log(obj));
})