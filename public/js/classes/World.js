
export class World {
    constructor() {
        this.day = 1
        this.week = 1

        this.players = {}
    }

    addPlayer(player) {
        this.players[player.id] = player
    }

    removePlayer(id) {
        delete this.players[id]
    }

    dailyUpdate() {
        this.day++
    }

    weeklyUpdate() {
        this.day = 1
        this.week++
    }

    updatePlayers(backEndPlayers) {
        for (const id in backEndPlayers) {
            const backEndPlayer = backEndPlayers[id]
        
            this.players = backEndPlayers
            if (!this.players[id]) {
                // New player
                // frontEndPlayers[id] = backEndPlayer;
            
            } else {
            // Update existing player
        
        
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
        // for (const id in frontEndPlayers) {
        //   if (!backEndPlayers[id]) {
        //     if (id === socket.id) {
        //       document.querySelector('#usernameForm').style.display = 'block'
        //     }
        //   }
        // }
    }

    sync(backEndWorld) {
        this.day = backEndWorld.day
        this.week = backEndWorld.week

        this.players = backEndWorld.players
    }
}