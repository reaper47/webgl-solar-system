/* @flow */
let express = require('express')
let app = express()
let htmlController = require('./controllers/htmlController.js')
const PORT = process.env.PORT || 1337

app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'))

console.log(`${__dirname}/public`)

app.use('/', (req, res, next) => {
  next()
})

htmlController(app)
app.listen(PORT)
