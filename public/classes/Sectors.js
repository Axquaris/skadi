import { ResourceVec } from "./ResourceVec.js";


export const buildingOptions = ["agroponics", "supply_m", "war_m", "welness"];
// ResourceVec: pop, energy, food, ore, supplies, weapons
export const sectorTypes = {
    "empty": {
        displayName: "Empty",
        workersNeeded: 0,
        resourceChange: new ResourceVec(),
        upgradeOptions: [],
    },
    "agroponics": {
        displayName: "Agroponics",
        workersNeeded: 1800,
        resourceChange: new ResourceVec({ pop: -0.03, energy: -35, food: 30, supplies: -10 }),
        upgradeOptions: ["agroponics2"],
    },
    "agroponics2": {
        displayName: "Agroponics 2",
        workersNeeded: 2200,
        resourceChange: new ResourceVec({ pop: -0.03, energy: -35, food: 60, supplies: -15 }),
        upgradeOptions: [],
    },
    "supply_m": {
        displayName: "Supply Manufactories",
        workersNeeded: 2200,
        resourceChange: new ResourceVec({ pop: -0.06, energy: -40, ore: -10, supplies: 40 }),
        upgradeOptions: ["war_m"],
    },
    "war_m": {
        displayName: "War Manufactories",
        workersNeeded: 2200,
        resourceChange: new ResourceVec({ pop: -0.06, energy: -40, ore: -10, weapons: 10 }),
        upgradeOptions: ["supply_m"],
    },
    "welness": {
        displayName: "Wellness Center",
        workersNeeded: 600,
        resourceChange: new ResourceVec({ pop: 2, energy: -40, food: -8, supplies: -5 }),
        upgradeOptions: [],
    },
    "core": {
        displayName: "Core",
        workersNeeded: 1200,
        resourceChange: new ResourceVec({ pop: -0.06, energy: 80, supplies: -5}),
        upgradeOptions: [],
    }
};


export class Sector {
    constructor(state = "empty", type = "empty") {
        this.state = state; // empty, building, built
        this.type = type; // see sectorTypes

        this.workers = 0.;
        this.efficiency = 0.;
    }

    static fromJSON(json) {
        var building = new Sector();
        building.state = json.state;
        building.type = json.type;
        building.workers = json.workers;
        building.efficiency = json.efficiency;
        return building;
    }

    toJSON() {
        return {
            state: this.state,
            type: this.type,
            workers: this.workers,
            efficiency: this.efficiency
        }
    }

    get displayName() { return sectorTypes[this.type].displayName; }
    get workersNeeded() { return sectorTypes[this.type].workersNeeded; }
    get resourceChange() { return sectorTypes[this.type].resourceChange; }
    get upgradeOptions() { return sectorTypes[this.type].upgradeOptions; }

    build(buildIdx) {
        this.type = buildingOptions[buildIdx];
        this.state = "built";
    }

    upgrade(upgradeIdx) {
        this.type = sectorTypes[this.type].upgradeOptions[upgradeIdx];
        this.state = "built";
    }

    dailyUpdate(currentResources) {
        if (this.state != "built") {
            return currentResources;
        }
        else {
            // Amount (0-1) of workers fulfilled
            var workerFulfilment = Math.max(Math.min(this.workers / this.workersNeeded, 1), 0);

            // Hypothetical resource change given current workers
            var resourceChange = ResourceVec.multiply(this.resourceChange, workerFulfilment);
            if (resourceChange.energy > 0) {
                // Energy consumption scales to a minumum of 25%
                resourceChange.energy = this.resourceChange.energy * (1 + 3 * workerFulfilment) / 4;
            }

            // Amount (0-1) of resource needs fulfilled
            var resourceFulfillment = 1;
            var newResources = ResourceVec.add(currentResources, resourceChange);
            newResources.forEach((val, idx) => {
                if (val < 0) {
                    resourceChange.set(idx, 0);
                    resourceFulfillment = Math.min(resourceFulfillment, -currentResources.get(idx) / resourceChange.get(idx));
                    console.log("Resource Fulfillment", val, idx, currentResources, resourceChange);
                }
            });

            // Percent (0-1) efficiency of production
            var newEfficiency = workerFulfilment * resourceFulfillment;
            if (newEfficiency != this.efficiency) {
                this.efficiency = newEfficiency;
            }

            // Resource change given calculated efficiency
            resourceChange = ResourceVec.multiply(this.resourceChange, this.efficiency);
            if (resourceChange.energy > 0) {
                // Energy consumption scales to a minumum of 25%
                resourceChange.energy = this.resourceChange.energy * (1 + 3 * this.efficiency) / 4;
            }
            newResources = ResourceVec.add(currentResources, resourceChange);
            return newResources;
        }
    }

    weeklyUpdate(currentResources) {
        if (this.state == "building") {
            return currentResources;
        }
    }
}
