const express = require('express')
const app = express();
const SpotifyStrategy = require('passport-spotify').Strategy;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


var querystring = require('querystring');
var request = require('request');

var form = { };
var dates = ['2018-12-21T21:00:00Z','2018-12-22T21:00:00Z']; // to replace with front-end entries
var firstparturl = 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=';

firstparturl += dates[0];
var secondparturl = firstparturl + '&endDate=';
secondparturl += dates[1];
var totalurl = secondparturl + '&offset=0'; 

console.log(secondparturl);

var uri = 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=2018-02-19T21:00:00Z&endDate=2018-02-19T22:00:00Z&offset=0';

var formData = querystring.stringify(form);
var contentLength = formData.length;
var songs = [];
var artists = [];

function parse(){
    return new Promise(function(resolve, reject){
    request({
    headers: {
      'client-secret': '9923ac9b-8fd3-421f-b0e5-952f807c6885'
    },
    uri: totalurl,
    body: formData,
    method: 'GET'
  }, function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            var json_arr = JSON.parse(body);
	  	   //console.log(json_arr.plays.length);
	  	   /*for(var i = 0; i < json_arr.plays.length; i++) {
		    var obj = json_arr.plays[i].songId;
		    songs.push(obj);
		}*/
            try {
                // JSON.parse() can throw an exception if not valid JSON
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
}

parse().then(function(val) {
	for(var i = 0; i < val.plays.length; i++) {
		songs.push(val.plays[i].songId);
		artists.push(val.plays[i].artistId); 
		//console.log(val.plays[i].songId);
	}
    console.log(songs);
}).catch(function(err) {
});


passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8888/callback'
},
function(accessToken, refreshToken, profile, done){
  process.nextTick(function () {
    console.log('Profile: ', profile)

    URLSearchParams.findOrCreate({
      where: {
        SpotifyId: profile.id
      },
      defaults: {
        name: profile.displayName,
        SpotifyId: profile.id,
        accessToken: accessToken,
        proPic: profile.photo[0],
        refreshToken: refreshToken
      }
    })
    .spread(function (user) {
      console.log('MAKING USER:', user)
      done(null, user);
    }).catch(done);
  });
}));

app.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });




