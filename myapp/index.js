const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


var querystring = require('querystring');
var request = require('request');

var form = {
    
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

request({
    headers: {
      'client-secret': '9923ac9b-8fd3-421f-b0e5-952f807c6885'
    },
    uri: 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=2018-02-19T21:00:00Z&endDate=2018-02-19T22:00:00Z&offset=0',
    body: formData,
    method: 'GET'
  }, function (err, res, body) {
  	   console.log(res.body);
    //it works!
  });

/*var Request = require("request");

Request.post({
    "headers": { "content-type": "application/json" },
    "url": "https://conuhacks-playback-api.touchtunes.com/",
    "body": JSON.stringify({
        "firstname": "Nic",
        "lastname": "Raboy"
    })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});*/

/*const request = require('request');

request('https://conuhacks-playback-api.touchtunes.com/plays', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});*/

/*const superagent = require('superagent');

superagent.get('https://conuhacks-playback-api.touchtunes.com/plays')
.query({ startDate: '2018-02-19T21:00:00Z', endDate: '2018-02-19T22:00:00Z',offset: '0' })
.end((err, res) => {
  if (err) { return console.log(err); }
  console.log(res.body.url);
  console.log(res.body.explanation);
});*/

