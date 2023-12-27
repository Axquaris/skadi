import { ResourceVec } from "./ResourceVec.js";


export class Building {
    static displayName = "Building";
    static workersNeeded = 0;
    static resourceChange = new ResourceVec();

    constructor() {
        this.workers = 0.;
        this.efficiency = 0.;
    }

    static fromJSON(json) {
        var building = new classes[json.type]();
        building.workers = json.workers;
        building.efficiency = json.efficiency;
        return building;
    }

    toJSON() {
        return {
            type: this.constructor.name,
            workers: this.workers,
            efficiency: this.efficiency
        }
    }

    dailyUpdate(currentResources) {
        // Amount (0-1) of workers fulfilled
        var workerFulfilment = Math.max(Math.min(this.workers / this.constructor.workersNeeded, 1), 0);

        // Hypothetical resource change given current workers
        var resourceChange = ResourceVec.multiply(this.constructor.resourceChange, workerFulfilment);
        if (resourceChange.energy > 0) {
            // Energy consumption scales to a minumum of 25%
            resourceChange.energy = this.constructor.resourceChange.energy * (1 + 3 * workerFulfilment) / 4;
        }

        // Amount (0-1) of resource needs fulfilled
        var resourceFulfillment = 1;
        var newResources = ResourceVec.add(currentResources, resourceChange);
        newResources.forEach((val, idx) => {
            if (val < 0) {
                resourceChange.set(idx, 0);
                resourceFulfillment = Math.min(resourceFulfillment, -currentResources.get(idx) / resourceChange.get(idx));
                console.log("Resource Fulfillment", val, idx,currentResources, resourceChange );
            }
        });

        // Percent (0-1) efficiency of production
        var newEfficiency = workerFulfilment * resourceFulfillment;
        if (newEfficiency != this.efficiency) {
            this.efficiency = newEfficiency;
            // TODO: make sure listeners are notified of this change
        }

        // Resource change given calculated efficiency
        resourceChange = ResourceVec.multiply(this.constructor.resourceChange, this.efficiency);
        if (resourceChange.energy > 0) {
            // Energy consumption scales to a minumum of 25%
            resourceChange.energy = this.constructor.resourceChange.energy * (1 + 3 * this.efficiency) / 4;
        }
        newResources = ResourceVec.add(currentResources, resourceChange);
        return newResources;
    }
}


export class Agroponics extends Building {
    static displayName = "Agroponics";
    static workersNeeded = 1800;

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-0.03, -35, 30, -10, -10, 0);
}


export class SupplyManufactories extends Building {
    static displayName = "Supply Manufactories";
    static workersNeeded = 2200;

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-0.06, -40, 0, -10, 40, 0);
}


export class WarManufactories extends Building {
    static displayName = "War Manufactories";
    static workersNeeded = 2200;

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-0.06, -40, 0, -10, 0, 10);
}


export class WellnessCenter extends Building {
    static displayName = "Wellness Center";
    static workersNeeded = 600;

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(2, -40, -8, 0, -5, 0);
}


export class Core extends Building {
    static displayName = "Core";
    static workersNeeded = 1200;

    // pop, energy, food, material, supplies, weapons
    static resourceChange = new ResourceVec(-0.06, 80, 0, 0, -5, 0);
}


export var buildingClasses = [Agroponics, WellnessCenter, SupplyManufactories, WarManufactories];

var classes = {
    "Building": Building,
    "Agroponics": Agroponics,
    "SupplyManufactories": SupplyManufactories,
    "WarManufactories": WarManufactories,
    "WellnessCenter": WellnessCenter,
    "Core": Core,
}
