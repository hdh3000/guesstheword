var express = require('express');
var app = express();

app.use(express.static('public'));

var port = process.env.PORT || 5000;
var ip = process.env.IP || "127.0.0.1";

var server = app.listen(port, function () {
  var host = ip;
  var port = server.address().port;
  console.log('wordgame listening %s', port);
});
