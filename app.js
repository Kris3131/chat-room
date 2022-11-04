const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes/index.js')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Models setting
require('./config/mongoose')
// Views setting
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('publics'))

app.use(routes)

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.broadcast.emit('hi')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
