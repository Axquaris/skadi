import { Player } from './Player.js'
import { Market } from './Market.js'


export class World {
    static instance;
    // static clientId; // ID of the player running this client

    constructor(clientId = null) {
        if (World.instance) {
            return World.instance;
        }
        // Init world state variables
        this.reset();

        this.clientId = clientId;
        World.instance = this;
    }

    reset() {
        this.day = 1;
        this.week = 1;
        this.players = {};
        this.market = new Market();
    }

    toJSON() {
        const serializedPlayers = Object.entries(this.players).reduce((acc, [key, player]) => {
            acc[key] = player.toJSON();
            return acc;
        }, {});

        return {
            day: this.day,
            week: this.week,
            players: serializedPlayers,
            market: this.market.toJSON(),
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

        this.market = Market.fromJSON(backEndWorld.market)
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
