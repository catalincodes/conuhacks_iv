const express = require('express')
const app = express();
var path = require('path')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.set('view engine', 'html');


app.get('/', (req, res) => {
   res.render('index');
  //res.send('Hello World!')
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
var song = 'https://conuhacks-playback-api.touchtunes.com/song/';
var song1 = "";

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
		song1 = "";
		artists.push(val.plays[i].artistId); 
        song1 = song + val.plays[i].songId;
        songs.push(song1);
	}
    
	    return new Promise(function(resolve, reject){
	    	for(var j = 0; j < songs.length; j++) {
	    request({
	    headers: {
	      'client-secret': '9923ac9b-8fd3-421f-b0e5-952f807c6885'
	    },
	    uri: songs[j],
	    body: formData,
	    method: 'GET'
	  }, function (error, response, body) {
	            var json_arr = JSON.parse(body);
		  	    
	            try {
	                console.log(response.body);
	               
	            } catch(e) {
	                reject(e);
	            }
	        });}
	    });
		
    

}).catch(function(err) {
});






