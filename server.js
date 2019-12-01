let express = require('express')
let socket = require('socket.io')

let app = express()

const PORT = 4000;
let server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

let colors = ['Red', 'green', 'blue']
let currentColor = 'white'

let io = socket(server)

io.on('connection', socket => {
  console.log(socket.id)
  console.log('User connected')
  socket.emit('setup', {colors, currentColor})
  socket.on('changeColor', color => {
    currentColor = color
    io.sockets.emit('changeColor', color)
  })
  socket.on('disconnect', () => console.log('User disconnected'))
})