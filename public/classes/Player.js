import { Sector } from "./Sectors.js";
import { ResourceVec } from "./ResourceVec.js";


export class Player {
    // Weekly growth of population
    static birthRate = .00035

    // Pop consumption
    // pop, energy, food, ore, supplies, weapons
    static resourcePerPop = new ResourceVec({
        pop: 0, energy: -.0035, food: -.002, ore: 0, supplies: -.001, weapons: 0
    })
    // energy per pop: Scaled down by 10 from 13 kwh per year per person

    constructor(id, username) {
        this.id = id
        this.username = username
        // pop, energy, food, ore, supplies, weapons
        this.resources = new ResourceVec({
            pop: 4000, energy: 6000, food: 8000, ore: 5000, supplies: 5000, weapons: 10
        })
        this.dResources = new ResourceVec()
        this.maxResources = new ResourceVec({
            pop: 10000, energy: 10000, food: 10000, ore: 5000, supplies: 5000, weapons: 1000
        })

        this.core = new Sector("built", "core")
        this.sectors = []
        this.outposts = []
        // Create 4 sectors
        for (let i = 0; i < 4; i++) {
            this.sectors.push(new Sector())
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            resources: this.resources,
            dResources: this.dResources,
            maxResources: this.maxResources,
            core: this.core.toJSON(),
            sectors: this.sectors.map(sector => sector.toJSON()),
            // outposts: this.outposts
        }
    }

    static fromJSON(json) {
        var player = new Player(json.id, json.username)
        player.resources = ResourceVec.fromJSON(json.resources)
        player.dResources = ResourceVec.fromJSON(json.dResources)
        player.maxResources = ResourceVec.fromJSON(json.maxResources)
        player.core = Sector.fromJSON(json.core)
        player.sectors = json.sectors.map(sector => Sector.fromJSON(sector))
        // player.outposts = json.outposts.map(outpost => Outpost.fromJSON(outpost))
        return player
    }
    
    allocateWorkers() {
        // Determine total workers needed
        var totalWorkersNeeded = this.core.workersNeeded;
        this.sectors.forEach(sector => {
            if (sector.state == "built") totalWorkersNeeded += sector.workersNeeded;
        });
        
        // Determine how much of the needed amt each sector will be allocated (0-1)
        var allocationRatio = Math.min(this.resources.pop / totalWorkersNeeded, 1);

        // Allocate workers
        this.core.workers = this.core.workersNeeded * allocationRatio;
        this.sectors.forEach(sector => {
            if (sector.state == "built") sector.workers = sector.workersNeeded * allocationRatio;
        });
    }

    dailyUpdate() {
        // Population Updates
        var prevResources = this.resources.clone()
        console.log("prevResources", prevResources)

        // Population Growth
        this.resources.pop *= (1 + Player.birthRate)

        // Allocate Workers
        this.allocateWorkers()

        // sector Updates
        this.resources = this.core.dailyUpdate(this.resources)
        this.sectors.forEach(sector => {
            this.resources = sector.dailyUpdate(this.resources)
        })
        

        // Population Consumption
        var popConsumption = ResourceVec.multiply(Player.resourcePerPop, this.resources.pop)
        this.resources = ResourceVec.add(this.resources, popConsumption)

        this.dResources = ResourceVec.subtract(this.resources, prevResources)
    }

    weeklyUpdate() {
    }
}
