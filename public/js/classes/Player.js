
export class ResourceVec {
    constructor(pop, energy, food, materials, supplies, weapons) {
        this.pop = pop;
        this.energy = energy;
        this.food = food;
        this.materials = materials;
        this.supplies = supplies;
        this.weapons = weapons;
    }

    static multiply(vec, scalar) {
        return new ResourceVec(
            vec.pop * scalar,
            vec.energy * scalar,
            vec.food * scalar,
            vec.materials * scalar,
            vec.supplies * scalar,
            vec.weapons * scalar
        );
    }

    static add(vec, other) {
        return new ResourceVec(
            vec.pop + other.pop,
            vec.energy + other.energy,
            vec.food + other.food,
            vec.materials + other.materials,
            vec.supplies + other.supplies,
            vec.weapons + other.weapons
        );
    }
}


export class Building {
    static workersNeeded = 0
    static resourceChange = new ResourceVec(0, 0, 0, 0, 0, 0)

    constructor() {
        this.workers = 2000
    }

    dailyUpdate(currentResources) {
        var workerFulfilment = Math.max(this.constructor.workersNeeded / this.workers, 1)
        
        var resourceChange = ResourceVec.multiply(this.constructor.resourceChange, workerFulfilment)
        
        if (resourceChange.energy > 0) {
            resourceChange.energy = this.constructor.resourceChange.energy * (1 + workerFulfilment) * .5
        }

        return ResourceVec.add(currentResources, resourceChange)
    }
}


export class Agroponics extends Building {
    static workersNeeded = 1800

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.03, -35, 30, -10, -10, 0)
}


export class SupplyManufactories extends Building {
    static workersNeeded = 2200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.06, -40, 0, -10, 40, 0)
}


export class WarManufactories extends Building {
    static workersNeeded = 2200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.06, -40, 0, -10, 0, 10)
}


export class WellnessCenter extends Building {
    static workersNeeded = 600

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(1, -40, -8, 0, -5, 0)
}


export class Core extends Building {
    static workersNeeded = 1200

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-.06, 80, 0, 0, -5, 0)
}


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
        this.buildings = [new Core(), new Core()]
        this.outposts = []
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
