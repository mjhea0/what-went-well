var path = require("path");

exports.index = function(req, res){
  res.render('index', { title: "What went well?"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};
