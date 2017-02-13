/* @flow */

let express = require('express');
let app = express();

//let apiController = require("./controllers/apiController.js");
let htmlController = require('./controllers/htmlController.js');

const PORT = process.env.PORT || 1337;

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

console.log(`${__dirname}/public`);

app.use('/', (req, res, next) => {
    console.log(`Request Url: ${req.url}`);
    next();
});

htmlController(app);
//apiController(app);
app.listen(PORT);
