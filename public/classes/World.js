import { Player } from './Player.js'


export class World {
    static instance;
    // static clientId; // ID of the player running this client

    constructor(clientId = null) {
        // World state variables
        this.day = 1;
        this.week = 1;
        this.players = {};

        this.clientId = clientId;
    }

    toJSON() {
        const serializedPlayers = Object.entries(this.players).reduce((acc, [key, player]) => {
            acc[key] = player.toJSON();
            return acc;
        }, {});

        return {
            day: this.day,
            week: this.week,
            players: serializedPlayers
        };
    }

    // Full world sync
    sync(backEndWorld) {
        this.day = backEndWorld.day
        this.week = backEndWorld.week

        for (let id in backEndWorld.players) {
            this.players[id] = Player.fromJSON(backEndWorld.players[id])
            console.log()
        }
    }

    // World tick functions
    dailyUpdate() {
        this.day++
    }

    weeklyUpdate() {
        this.day = 1
        this.week++
    }    
}
