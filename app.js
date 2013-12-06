// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

// global config
var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// env config
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);

app.get('/searching', function(req, res){
  var url = 'https://github.com/mjhea0/what-went-well/blob/master/whatwentwell.md'
  var request_options = {
    url: url
  };	
  request(request_options, function(err, resp, body) {
    $ = cheerio.load(body)
  	var projects = $('.markdown-body p');
    var randNum = Math.floor(Math.random() * projects.length);
    var project = $(projects)[randNum];
    var title = $(project).find('strong').text();
    var description = $(project).text().slice(title.length + 3);
    res.send('<h2>'+title+'</h2><br><h3>'+description+'</h3>');
  });
});

// run server
app.listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});
