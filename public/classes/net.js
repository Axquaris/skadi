import { World } from './World.js';
import { Player } from './Player.js';
import { Building, Core, Agroponics, SupplyManufactories, WarManufactories, WellnessCenter, Agroponics } from './Building.js';
import { ResourceVec } from './ResourceVec.js';


var classes = {
    "World": World,
    "Player": Player,
    "Building": Building,
    "Core": Core,
    "ResourceVec": ResourceVec
}


export function fromJSON(json) {
    switch (json.type) {
        case "World":
            return World.fromJSON(json);
        case "Player":
            return Player.fromJSON(json);
        case "Building":
            return Building.fromJSON(json);
        case "Core":
            return Core.fromJSON(json);
        case "ResourceVec":
        default:
            throw new Error(`Unknown type: ${json.type}`);
    }
}

export function toJSON(obj) {
    return JSON.stringify(obj);
}
