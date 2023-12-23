
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

    updatePlayer(id, player) {
        this.players[id] = player
    }

    // World tick functions
    dailyUpdate() {
        this.day++
    }

    weeklyUpdate() {
        this.day = 1
        this.week++
    }

    // Full world sync
    sync(backEndWorld) {
        this.day = backEndWorld.day
        this.week = backEndWorld.week

        this.players = backEndWorld.players
    }
}