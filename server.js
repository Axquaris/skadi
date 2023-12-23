import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { World } from './public/classes/World.js';
import { workerData } from 'worker_threads';

// const express = require('express')
// const Player = require('./public/js/classes/Player.js')
// const http = require('http')
// const { Server } = require('socket.io')


// ===================== //
// Game Config Variables //
// ===================== //
let cfg = {
    "port": 3000,
    "ms_per_tick": 15,
    "ticks_per_day": 50,
    "days_per_week": 7
}
console.log(`Time for one year: ${cfg.ms_per_tick * cfg.ticks_per_day * cfg.days_per_week * 55 / 1000 / 60}`)


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
let noPlayers = true

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

    socket.on('initGame', (player) => {
        backEndWorld.addPlayer(player)
        console.log(player.username, "connected")

        noPlayers = false
    })

    // Player action event listener: disconnecting
    socket.on('disconnect', (reason) => {
        // console.log(reason)
        // delete backEndPlayers[socket.id]
        backEndWorld.removePlayer(socket.id)
        // io.emit('updatePlayers', backEndPlayers)
    })
})


// ============== //
// CORE GAME LOOP //
// ============== //


setInterval(() => {
    if (!noPlayers) {
        if (backEndWorld.players.length < 1) {
            noPlayers = true
            tick = 0
        }
        gameTick()
    }
}, cfg.ms_per_tick)


function gameTick() {
    if ((tick + 1) % cfg.ticks_per_day === 0) {
        backEndWorld.dailyUpdate()
    }
    if ((tick + 1) % (cfg.ticks_per_day * cfg.days_per_week) === 0) {
        // Weekly updateconsole.log(`t${tick} d${day}`)
        console.log(`Weekly update at t${tick}`)
        backEndWorld.weeklyUpdate()

        io.emit('updateWorld', backEndWorld)
    }
    // io.emit('updatePlayers', backEndPlayers)
    tick++
}


// Start server listening to port
server.listen(port, () => {
})

console.log(`Server listening on port ${port}`)
