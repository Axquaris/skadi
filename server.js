import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { World } from './public/classes/World.js';
import { Player } from './public/classes/Player.js';
import { ClientActions } from './public/client-actions.js';

// ===================== //
// Game Config Variables //
// ===================== //
let config = {
    "port": 3000,
    "ms_per_tick": 15,
    "ticks_per_day": 50,
    "days_per_week": 7
}
console.log(`Time for one year: ${config.ms_per_tick * config.ticks_per_day * config.days_per_week * 55 / 1000 / 60}`)


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
let backEndWorld;

let tick = 0
let gameRunning = false

function initGame() {
//   backEndPlayers = {}
    tick = 0
    backEndWorld = new World()
}

initGame()


// ==================================== //
// Player connection & action callbacks //
// ==================================== //

// Handle new connection, given socket to that player
io.on('connection', (socket) => {
    // console.log('a user connected')
    
    // io.emit('updatePlayers', backEndWorld.players) // Tell all players about joiner

    socket.on('initGame', (username) => {
        backEndWorld.players[socket.id] = new Player(socket.id, username)
        console.log(username, "connected", socket.id)

        gameRunning = true
        socket.emit('gameStart', backEndWorld.toJSON())  // Tell player about game start
    })

    //
    

    // Player action event listener: disconnecting
    socket.on('disconnect', (reason) => {
        console.log(reason)
        delete backEndWorld.players[socket.id]
    })

    // Respond with server config
    // socket.emit('connectionResponse', config)

    ClientActions.bindServerCallbacks(socket)
})


// ============== //
// CORE GAME LOOP //
// ============== //

setInterval(() => {
    if (gameRunning) {
        if (backEndWorld.players.length < 1) {
            initGame()
            gameRunning = false
            tick = 0
        }
        gameTick()
    }
}, config.ms_per_tick)


function gameTick() {
    if ((tick + 1) % config.ticks_per_day === 0) {
        backEndWorld.dailyUpdate()
        for (let id in backEndWorld.players) {
            backEndWorld.players[id].dailyUpdate()
        }
    }
    if ((tick + 1) % (config.ticks_per_day * config.days_per_week) === 0) {
        // Weekly updateconsole.log(`t${tick} d${day}`)
        console.log(`Weekly update at t${tick}`)
        backEndWorld.weeklyUpdate()
        for (let id in backEndWorld.players) {
            backEndWorld.players[id].weeklyUpdate()
        }

        io.emit('updateWorld', backEndWorld)
    }
    // io.emit('updatePlayers', backEndPlayers)
    tick++
}


// Start server listening to port
server.listen(port, () => {
})

console.log(`Server listening on port ${port}`)
