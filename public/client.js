import { Player } from "./classes/Player.js"
import { World } from "./classes/World.js"
import { buildUI } from "./ui-components.js"


let cfg = {
    "port": 3000,
    "ms_per_tick": 15,
    "ticks_per_day": 50,
    "days_per_week": 7
}

const socket = io()
const myId = socket.id

// ===================== //
// Init Local Game State //
// ===================== //
const frontEndPlayers = {}
const frontEndWorld = {}

const player = new Player("randstr")
const world = new World()

buildUI(world, player)

// Lobby UI element aliases

// Game UI element aliases
var headerUI = document.querySelector("header-ui")
var playersUI = document.querySelector("players-ui")
var worldUI = document.querySelector("world-ui")


// Recieve game state update (projectiles)
socket.on('updateWorld', (backEndWorld) => {
    console.log("Recieved world update", backEndWorld)
    world.sync(backEndWorld)
})


// Recieve game state update (projectiles)
socket.on('updatePlayers', (backEndPlayers) => {
    world.updatePlayers(backEndPlayers)
    playersUI.requestUpdate()
})


// ======== //
// Build UI //
// ======== //
// Start game button callback
document.querySelector('#usernameForm').addEventListener('submit', (event) => {
    event.preventDefault()

    // Change visibilities
    document.querySelector('#lobbyPanel').style.display = 'none'
    document.querySelector('#gamePanel').style.display = 'block'

    player.username = document.querySelector('#usernameInput').value
    socket.emit('initGame', player)
})


// ============== //
// CORE GAME LOOP //
// ============== //
let tick = 0
setInterval(() => {
    if ((tick + 1) % cfg.ticks_per_day == 0) {
        // Day tick
        var dResources = player.dailyUpdate()
        world.dailyUpdate()

        headerUI.updateVariables(
            player.resources,
            player.maxResources,
            dResources
        )
        
        playersUI.requestUpdate()
        worldUI.requestUpdate()
    }
    if ((tick + 1) % (cfg.ticks_per_day * cfg.days_per_week) == 0) {
        // Week tick
        player.weeklyUpdate()
        world.weeklyUpdate()
    }

    // Game over conditions
    if (player['pop'] <= 0) {
        alert('No colonists survived')
    }
    else if (player['energy'] <= 0) {
        alert('Your colony ran out of energy, and all colonists froze to death.')
    }

    tick++
}, cfg.ms_per_tick)

export { player }
