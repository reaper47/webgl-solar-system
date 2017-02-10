'use strict';

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.json({ 'Test': 'OK' });
  });

  app.get('/solar', function (req, res) {
    res.render('index.ejs');
  });
};