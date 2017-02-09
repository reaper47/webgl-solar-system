/* @flow */

let express = require('express')
let sass = require('sass')
let app = express()
let htmlController = require('./controllers/htmlController.js')

// let apiController = require("./controllers/apiController.js");

const PORT = process.env.PORT || 1337

app.configure(() => {
  app.set('views', `${__dirname}/views`)
  app.set('view engine', 'ejs')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)

  app.use(
    sass.middleware({
      src: `${__dirname}/scss`,
      dest: `${__dirname}/public/css`,
      prefix: '/stylesheets',
      debug: true
    })
  )
})

app.use('/', express.static(`${__dirname}/public`))

app.use('/', (req, res, next) => {
  console.log(`Request Url: ${req.url}`)
  next()
})

htmlController(app)
// apiController(app);
app.listen(PORT)

