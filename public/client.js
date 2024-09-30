import { Player } from "./classes/Player.js"
import { World } from "./classes/World.js"
import { buildUI } from "./ui/ui-components.js"

import { ClientActions } from "./client-actions.js"

const config = {
    "ms_per_tick": 15,
    "ticks_per_day": 50,
    "days_per_week": 7
}

const socket = io()
var clientId = socket.id

// ===================== //
// Init Local Game State //
// ===================== //
var clientWorld = new World()


// ======== //
// Build UI //
// ======== //

// Lobby UI element aliases
var usernameForm = document.querySelector("#usernameForm")

// Game UI element aliases
var headerUI = document.querySelector("header-ui")
var sectorUI = document.querySelectorAll("sector-slot")
var outpostUI = document.querySelectorAll("outpost-slot")
var tradeUI = document.querySelector("trade-ui")
var worldUI = document.querySelector("world-ui")
var playersUI = document.querySelector("players-ui")

// Start game button callback
usernameForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Change visibilities
    document.querySelector('#lobbyPanel').style.display = 'none'
    document.querySelector('#gamePanel').style.display = 'block'

    var username = document.querySelector('#usernameInput').value
    socket.emit('initGame', username)
})

ClientActions.socket = socket;
buildUI();

// ================ //
// Socket callbacks //
// ================ //
socket.on('connect', () => {
    clientId = socket.id;
    console.log("clientId", clientId); // Now it should print the id
    clientWorld.clientId = clientId
});

// socket.on('connectionResponse', () => {
// })

socket.on('gameStart', (serverWorld) => {
    clientWorld.sync(serverWorld)
    gameRunning = true
    
    headerUI.players = clientWorld.players[clientId]
    playersUI.world = clientWorld
    worldUI.world = clientWorld
})

// Recieve world state update
socket.on('updateWorld', (serverWorld) => {
    console.log("Recieved world update", serverWorld)
    clientWorld.sync(serverWorld)
})

// Recieve player state update
// socket.on('updatePlayers', (backEndPlayers) => {
//     clientWorld.updatePlayers(backEndPlayers)
//     playersUI.requestUpdate()
// })


// ============== //
// CORE GAME LOOP //
// ============== //
let tick = 0
let gameRunning = false

setInterval(() => {
    if (gameRunning) {
        gameTick()
    }
}, config.ms_per_tick)


function gameTick() {
    var player = clientWorld.players[clientId]
    
    if ((tick + 1) % config.ticks_per_day == 0) {
        // Day tick
        player.dailyUpdate()
        clientWorld.dailyUpdate()
        
        // UI Updates
        headerUI.updateVariables(player)
        
        sectorUI.forEach(sectorSlot => {
            sectorSlot.update();
        });
        // outpostUI.requestUpdate()

        playersUI.requestUpdate()
        worldUI.requestUpdate()
    }
    if ((tick + 1) % (config.ticks_per_day * config.days_per_week) == 0) {
        // Week tick
        player.weeklyUpdate()
        clientWorld.weeklyUpdate()
    }

    // Game over conditions
    if (player['pop'] <= 0) {
        alert('No colonists survived')
    }
    else if (player['energy'] <= 0) {
        alert('Your colony ran out of energy, and all colonists froze to death.')
    }

    tick++
}
