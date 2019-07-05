'use strict';

// Require the modules we need
var express = require('express');
var fs = require('fs');
var path = require("path");

// Set up express
var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));


// Processes homepage request
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/* Route that processes GET /:timestamp requests.

*/
app.get('/:timestamp', function(req, res) {
  res.json(getTimestampJSON(req.params.timestamp));

});

/*If the string parameter contains either a unix timestamp or a natural language date,
  the server will respond with both the Unix timestamp and the natural form of the date as a JSON object.
  If it does not contain either format, it will return null for those properties.
  For Example:  /July 4, 2019
  Should return JSON object
  {
    "unix": 1562198400,
    "natural": "July 4, 2019"
  }
*/
function getTimestampJSON(timestamp){
   var result = {
    "unix": null,
    "natural": null
  };

  if (isValidUnixTime(timestamp)){
    var unixTime = parseInt(timestamp); //remove any values after a decimal
    result.unix = unixTime;
    result.natural = naturalDate(new Date(unixTime * 1000)); //Multiplying by 1000 because Date object creates date using milliseconds
  }else if(isValidDate(timestamp)){
    var date = new Date(timestamp);
    result.unix = unixtime(date);
    result.natural = naturalDate(date);
  }

  function isValidUnixTime(string){
    var digitsOnly = /^[+\-]?\d+(\.\d*)?$/
    return digitsOnly.test(string);
  }

  function isValidDate(string){
    var date = new Date(string);
    if (date instanceof Date && !isNaN(date.getDate())){
      return true;
    }
    return false;
  }

  function naturalDate(date){
    var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var month = months[date.getMonth()];
    var day = date.getDate().toString();
    var year = date.getFullYear();

    // "Month Day, Year"
    var format = month + " " + day + ", " + year;
     return format;
  }

  //Convert UNIX epoch time in milliseconds to seconds
  function unixtime (date) {
    return date.getTime() / 1000;
  }
  return result;
}

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }
});

//Listen for requests
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Timestamp Microservice app is listening on port ',  port);
});
