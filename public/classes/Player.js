import { Building, Core } from "./Building.js";
import { ResourceVec } from "./ResourceVec.js";


export class Player {
    // Weekly growth of population
    static birthRate = .00035

    // Pop consumption
    // pop, energy, food, material, supplies, weapons
    static resourcePerPop = new ResourceVec(0, -.0035, -.002, 0, -.001, 0)
    // energy per pop: Scaled down by 10 from 13 kwh per year per person

    constructor(id, username) {
        this.id = id
        this.username = username
        // pop, energy, food, material, supplies, weapons
        this.resources = new ResourceVec(4000, 6000, 8000, 5000, 5000, 10)
        this.dResources = new ResourceVec()
        this.maxResources = new ResourceVec(10000, 10000, 10000, 5000, 5000, 1000)

        this.core = new Core()
        this.buildings = []
        this.outposts = []
    }
    
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            resources: this.resources,
            dResources: this.dResources,
            maxResources: this.maxResources,
            core: this.core.toJSON(),
            buildings: this.buildings.map(building => building.toJSON()),
            // outposts: this.outposts
        }
    }

    static fromJSON(json) {
        var player = new Player(json.id, json.username)
        player.resources = ResourceVec.fromJSON(json.resources)
        player.dResources = ResourceVec.fromJSON(json.dResources)
        player.maxResources = ResourceVec.fromJSON(json.maxResources)
        player.core = Building.fromJSON(json.core)
        player.buildings = json.buildings.map(building => Building.fromJSON(building))
        // player.outposts = json.outposts.map(outpost => Outpost.fromJSON(outpost))
        return player
    }
    
    allocateWorkers() {
        // Determine total workers needed
        var totalWorkersNeeded = this.core.constructor.workersNeeded;
        this.buildings.forEach(building => {
            totalWorkersNeeded += building.constructor.workersNeeded;
        });
        
        // Determine how much of the needed amt each building will be allocated (0-1)
        var allocationRatio = Math.min(this.resources.pop / totalWorkersNeeded, 1);

        // Allocate workers
        this.core.workers = this.core.constructor.workersNeeded * allocationRatio;
        this.buildings.forEach(building => {
            building.workers = building.constructor.workersNeeded * allocationRatio;
        });
    }

    dailyUpdate() {
        // console.log("Starting Daily Resources", this.resources)
        // Population Updates
        var prevResources = this.resources.clone()

        // Population Growth
        this.resources.pop *= (1 + Player.birthRate)

        // Allocate Workers
        this.allocateWorkers()

        // Building Updates
        this.resources = this.core.dailyUpdate(this.resources)
        this.buildings.forEach(building => {
            this.resources = building.dailyUpdate(this.resources)
        })

        // Population Consumption
        var popConsumption = ResourceVec.multiply(Player.resourcePerPop, this.resources.pop)
        this.resources = ResourceVec.add(this.resources, popConsumption)
        
        // console.log("Ending Daily Resources", this.resources)
        this.dResources = ResourceVec.subtract(this.resources, prevResources)
    }

    weeklyUpdate() {
        // console.log(this.resources)
        // this.resources.set(0, this.resources.get(0) * (1 + Player.birthRate))
    }
}
