import { ResourceVec } from "./ResourceVec.js";

export class Building {
    static displayName = "Building"
    static workersNeeded = 0
    static resourceChange = new ResourceVec(0, 0, 0, 0, 0, 0)

    constructor() {
        this.workers = 0
    }

    dailyUpdate(currentResources) {
        var workerFulfilment = Math.max(Math.min(this.constructor.workersNeeded, 1), 0)
        
        var resourceChange = ResourceVec.multiply(this.constructor.resourceChange, workerFulfilment)
        
        if (resourceChange.energy > 0) {
            resourceChange.energy = this.constructor.resourceChange.energy * (1 + workerFulfilment) * .5
        }

        return ResourceVec.add(currentResources, resourceChange)
    }
}


export class Agroponics extends Building {
    static displayName = "Agroponics"
    static workersNeeded = 1800

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.03, -35, 30, -10, -10, 0)
}


export class SupplyManufactories extends Building {
    static displayName = "Supply Manufactories"
    static workersNeeded = 2200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.06, -40, 0, -10, 40, 0)
}


export class WarManufactories extends Building {
    static displayName = "War Manufactories"
    static workersNeeded = 2200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.06, -40, 0, -10, 0, 10)
}


export class WellnessCenter extends Building {
    static displayName = "Wellness Center"
    static workersNeeded = 600

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(1, -40, -8, 0, -5, 0)
}


export class Core extends Building {
    static displayName = "Core"
    static workersNeeded = 1200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.06, 80, 0, 0, -5, 0)
}


export const buildingClasses = [Agroponics, SupplyManufactories, WarManufactories, WellnessCenter];


export class Player {
    // Weekly growth of population
    static birthRate = .00035

    // Pop consumption
    // pop, energy, food, material, supplies, weapons
    static resourcePerPop = new ResourceVec(0, -.0035, -.002, 0, -.003, 0)
    // energy per pop: Scaled down by 10 from 13 kwh per year per person

    constructor(username) {
        this.username = username
        // pop, energy, food, material, supplies, weapons
        this.resources = new ResourceVec(10000, 10000, 1000, 1000, 1000, 10)
        this.maxResources = new ResourceVec(10000, 10000, 5000, 5000, 5000, 1000)

        this.core = new Core()
        this.buildings = []
        this.outposts = []
    }

    dailyUpdate() {
        // console.log("Starting Daily Resources", this.resources)
        // Population Updates
        var prevResources = this.resources.clone()

        this.resources = ResourceVec.add(
            this.resources,
            ResourceVec.multiply(Player.resourcePerPop, this.resources.pop)
        )

        // Building Updates
        this.resources = this.core.dailyUpdate(this.resources)
        this.buildings.forEach(building => {
            this.resources = building.dailyUpdate(this.resources)
        })
        
        // console.log("Ending Daily Resources", this.resources)
        var dResources = ResourceVec.subtract(this.resources, prevResources)
        return dResources
    }

    weeklyUpdate() {
        // console.log(this.resources)
        // this.resources.set(0, this.resources.get(0) * (1 + Player.birthRate))
    }
}
