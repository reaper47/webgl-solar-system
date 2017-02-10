'use strict';

var express = require('express');
var app = express();

//let apiController = require("./controllers/apiController.js");
var htmlController = require('./controllers/htmlController.js');

var PORT = process.env.PORT || 1337;

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

console.log(__dirname + '/public');

app.use('/', function (req, res, next) {
    console.log('Request Url: ' + req.url);
    next();
});

htmlController(app);
//apiController(app);
app.listen(PORT);
