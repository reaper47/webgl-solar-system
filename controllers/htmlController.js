
module.exports = function (app) {
  app.get('/', (req, res) => {
    res.json({ 'Test': 'OK' })
  })

  app.get('/solar', (req, res) => {
    res.render('index.ejs')
  })
}

