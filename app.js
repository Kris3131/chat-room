const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Models setting
require('./config/mongoose')
// Views setting
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
