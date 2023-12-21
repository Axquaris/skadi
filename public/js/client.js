import { Player } from "./classes/Player.js"
import { buildUI } from "./ui-components.js"

buildUI()


let cfg = {
  "port" : 3000,
  "ms_per_tick" : 15,
  "ticks_per_day" : 50,
  "days_per_week" : 7
}

const socket = io()
const myId = socket.id

// ===================== //
// Init Local Game State //
// ===================== //
const frontEndPlayers = {}
const frontEndWorld = {}
const player = new Player("randstr")

// Recieve game state update (projectiles)
socket.on('updateWorld', (backEndWorld) => {

})


// Recieve game state update (projectiles)
socket.on('updatePlayers', (backEndPlayers) => {
  for (const id in backEndPlayers) {
    const backEndPlayer = backEndPlayers[id]

    if (!frontEndPlayers[id]) {
      frontEndPlayers[id] = {
        color: backEndPlayer.color,
        username: backEndPlayer.username
      }

      document.querySelector(
        '#players-ui'
      ).innerHTML += `<div data-id="${id}" data-score="${backEndPlayer.score}">${backEndPlayer.username}: ${backEndPlayer.score}</div>`
    } else {
      document.querySelector(
        `div[data-id="${id}"]`
      ).innerHTML = `${backEndPlayer.username}: ${backEndPlayer.population}`

      document
        .querySelector(`div[data-id="${id}"]`)
        .setAttribute('data-score', backEndPlayer.score)

      // sorts the players divs
      const parentDiv = document.querySelector('#players-ui')
      const childDivs = Array.from(parentDiv.querySelectorAll('div'))

      childDivs.sort((a, b) => {
        const scoreA = Number(a.getAttribute('data-score'))
        const scoreB = Number(b.getAttribute('data-score'))

        return scoreB - scoreA
      })

      // removes old elements
      childDivs.forEach((div) => {
        parentDiv.removeChild(div)
      })

      // adds sorted elements
      childDivs.forEach((div) => {
        parentDiv.appendChild(div)
      })

      // Resync logic
      // if (id === socket.id) {
      //   const lastBackendInputIndex = playerInputs.findIndex((input) => {
      //     return backEndPlayer.sequenceNumber === input.sequenceNumber
      //   })

      //   if (lastBackendInputIndex > -1)
      //     playerInputs.splice(0, lastBackendInputIndex + 1)

      //   playerInputs.forEach((input) => {
      //     frontEndPlayers[id].target.x += input.dx
      //     frontEndPlayers[id].target.y += input.dy
      //   })
      // }
    }
  }

  // this is where we delete frontend players
  for (const id in frontEndPlayers) {
    if (!backEndPlayers[id]) {
      const divToDelete = document.querySelector(`div[data-id="${id}"]`)
      divToDelete.parentNode.removeChild(divToDelete)

      if (id === socket.id) {
        document.querySelector('#usernameForm').style.display = 'block'
      }

      delete frontEndPlayers[id]
    }
  }
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

    socket.emit('initGame', {
        username: document.querySelector('#usernameInput').value
    })
})


// ============== //
// CORE GAME LOOP //
// ============== //
let tick = 0
setInterval(() => {
  
  if ((tick + 1) % cfg.ticks_per_day === 0) {
    // Day tick
    var dResources = player.dailyUpdate()

    document.querySelector("ui-header").updateVariables(
      player.resources,
      player.maxResources,
      dResources
    );
  }
  // if ((tick + 1) % (cfg.ticks_per_day * cfg.days_per_week) === 0) {
  //   // Week tick
  //   player.weeklyUpdate()
  // }

  if (player['pop'] <= 0) {
    initGame()
    // console.log('Game ended')
    alert('Your colony has died!')
  }

  tick++
}, cfg.ms_per_tick)

export { player }
