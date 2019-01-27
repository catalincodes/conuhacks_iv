const express = require('express')
const app = express();
var path = require('path')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.set('view engine', 'html');
app.use(require('body-parser').urlencoded());


app.get('/', (req, res) => {
     
   res.render('index',{});
  //res.send('Hello World!')
});


app.get('/', (req, res) => {
   console.log(arr);
   res.render('index',{"song":arr});
  //res.send('Hello World!')
});


app.get('/findfavesnearby', async (req, res) => {
   
   parse().then(function(val) {
	console.log(val.plays);
	var counter=0;

	var songlist = val;
	/*for(var i = 0; i < val.plays.length; i++) {
		song1 = "";
		if(val.plays[i].artistId)
			artists.push(val.plays[i].artistId); 
        song1 = song + val.plays[i].songId;
        songs.push(song1);
	}*/


	res.render('findfavesnearby',{"song": val.plays});
	})
   
  //res.send('Hello World!')
});

app.get('/customfind', (req, res) => {
   res.render('');
  //res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


var querystring = require('querystring');
var request = require('request');

var form = { };
var dates = ['2018-03-18T21:00:00Z','2018-03-19T21:00:00Z']; // to replace with front-end entries
var firstparturl = 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=';

firstparturl += dates[0];
var secondparturl = firstparturl + '&endDate=';
secondparturl += dates[1];
var totalurl = secondparturl + '&offset=0'; 

console.log(secondparturl);

var uri = 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=2018-05-18T21:00:00Z&endDate=2018-05-18T22:00:00Z&offset=0';
var song = 'https://conuhacks-playback-api.touchtunes.com/song/';
var song1 = "";

var formData = querystring.stringify(form);
var contentLength = formData.length;
var songs = [];
var artists = [];
var json_arr =[];


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
            json_arr = JSON.parse(body);
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
    return json_arr;
}



parse().then(function(val) {
	arr.push(parse());
	//console.log(arr);
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
	                return response.body;

	               
	            } catch(e) {
	                reject(e);
	            }

	        });

			}


	    });
		
    

}).catch(function(err) {
});


const https = require('https');
const convert = require('xml-js');

/*function getTown(latitude, longitude, callback = logTown) {
    var options = {
      host: 'nominatim.openstreetmap.org',
      path: '/reverse?format=xml&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1',
      method: 'GET',
      headers: {
        referer: '(add a referer here)',
        'user-agent': '(add a user agent here)'
      }
    };
  
    var g = https.get(
      options,
      response => {
        var body = '';
        response.on('data', function(d) {
          body += d;
        });
        response.on('end', function() {
          // Data reception is done, do whatever with it!
          const result1 = convert.xml2json(body, { compact: true, spaces: 4 });
          const geo = JSON.parse(result1);
          if (geo.reversegeocode.addressparts.town) {
            callback(geo.reversegeocode.addressparts.town._text);
          } else if (geo.reversegeocode.addressparts.city) {
            callback(geo.reversegeocode.addressparts.city._text);
          } else if (geo.reversegeocode.addressparts.village) {
            callback(geo.reversegeocode.addressparts.village._text);
          } else if (geo.reversegeocode.addressparts.hamlet) {
            callback(geo.reversegeocode.addressparts.hamlet._text);
          } else {
            console.log("An error occurred - couldn't find the address of the GPS coordinates");
            console.log(geo.reversegeocode.addressparts);
          }
        });
      }
    );
  
    g.end();
  }

console.log(getTown('-34','42',logTown));*/

