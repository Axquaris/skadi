
export class R {
    static pop = 0
    static energy = 1
    static food = 2
    static material = 3
    static supplies = 4
    static weapons = 5
}


export class Building {
    static workersNeeded = 0

    static resourceChange = nj.array([0, 0, 0, 0, 0, 0])

    constructor() {
        this.workers = 2000
    }

    dailyUpdate(currentResources) {
        var workerFulfilment = Math.max(this.workersNeeded / this.workers, 1)
        console.log(this.resourceChange)
        
        var resourceChange = this.resourceChange * workerFulfilment
        
        if (resourceChange.get(R.energy) > 0) {
            resourceChange.set(R.energy, this.resourceChange.get(R.energy) * (1 + workerFulfilment) * .5)
        }

        console.log(resourceChange)
        return currentResources //+ resourceChange
    }
}


export class Agroponics extends Building {
    static workersNeeded = 1800

    // pop, energy, food, material, supplies, weapons
    static resourceChange = nj.array([-.03, -35, 30, -10, -10, 0])
}


export class SupplyManufactories extends Building {
    static workersNeeded = 2200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = nj.array([-.06, -40, 0, -10, 40, 0])
}


export class WarManufactories extends Building {
    static workersNeeded = 2200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = nj.array([-.06, -40, 0, -10, 0, 10])
}


export class WellnessCenter extends Building {
    static workersNeeded = 600

    // pop, energy, food, material, supplies, weapons
    static resourceChange = nj.array([1, -40, -8, 0, -5, 0])
}


export class Core extends Building {
    static workersNeeded = 1200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = nj.array([-.06, 80, 0, 0, -5, 0])
}


export class Player {
    // Weekly growth of population
    static birthRate = .00035

    // Pop consumption
    // pop, energy, food, material, supplies, weapons
    static resourcePerPop = nj.array([0, -.0035, -.002, 0, -.003, 0])
    // energy per pop: Scaled down by 10 from 13 kwh per year per person

    constructor(username) {
        this.username = username
        // pop, energy, food, material, supplies, weapons
        this.resources = nj.array([10000, 10000, 1000, 1000, 1000, 10])
        this.buildings = [new Core(), new Core()]
        this.outposts = []
        console.log(this.resources)
        
    }

    dailyUpdate() {
        // console.log(this.resources)
        // this.resources = this.resources.add(Player.resourcePerPop).multiply(this.resources.get(0))
        // console.log(this.resources)
        this.buildings.forEach(building => {
            this.resources = building.dailyUpdate(this.resources)
        })
    }

    weeklyUpdate() {
        // console.log(this.resources)
        // this.resources.set(0, this.resources.get(0) * (1 + Player.birthRate))
    }
}
