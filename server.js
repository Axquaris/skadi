const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

let cfg = {
  "port" : 3000,
  "ms_per_tick" : 15,
  "ticks_per_day" : 50,
  "days_per_week" : 7
}


const app = express()

// socket.io setup
const server = http.createServer(app)
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })
const port = 3000

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


// =============== //
// Game state vars //
// =============== //
let backEndPlayers = {}
let backEndWorld = {}

function initGame() {
  backEndPlayers = {}
  backEndWorld = {'pop':10000}
}

initGame()


// ==================================== //
// Player connection & action callbacks //
// ==================================== //

// Handle new connection, given socket to that player
io.on('connection', (socket) => {
  // console.log('a user connected')

  io.emit('updatePlayers', backEndPlayers) // Tell all players about joiner

  socket.on('initGame', ({username}) => {
    backEndPlayers[socket.id] = {
      color: `hsl(${360 * Math.random()}, 100%, 50%)`,
      username
    }
    // console.log(username)
  })

  // Player action event listener: press
  socket.on('press', ({amt}) => {
    backEndWorld['pop'] -= amt

    // console.log(backEndWorld)
  })

  // Player action event listener: discnnecting
  socket.on('disconnect', (reason) => {
    // console.log(reason)
    delete backEndPlayers[socket.id]
    io.emit('updatePlayers', backEndPlayers)
  })
})

// ================ //
// GAME CONFIG VARS //
// ================ //
console.log(`Time for one year: ${cfg.ms_per_tick*cfg.ticks_per_day*cfg.days_per_week*55/1000/60}`)

// ============== //
// CORE GAME LOOP //
// ============== //
let tick = 0
setInterval(() => {
  
  if ((tick + 1) % cfg.ticks_per_day === 0) {
    backEndWorld['pop'] -= 1
  }
  if ((tick + 1) % (cfg.ticks_per_day * cfg.days_per_week) === 0) {
    // Weekly updateconsole.log(`t${tick} d${day}`)
    console.log(`Weekly update at t${tick}`)
  }


  if (backEndWorld['pop'] <= 0) {
    initGame()
    console.log('Game ended')
  }

  io.emit('updateWorld', backEndWorld)
  io.emit('updatePlayers', backEndPlayers)

  tick++
}, cfg.ms_per_tick)

server.listen(port, () => {
})

console.log(`Server listening on port ${port}`)
