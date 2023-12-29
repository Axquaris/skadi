
export const resourceTypes = {
    'pop': '#ba6c54',
    'food': '#125d31',
    'energy': '#b3a007',
    'ore': '#6c3833',
    'supplies': '#4e3b7e',
    'weapons': '#c21319'
};


export class ResourceVec{
    constructor({ pop = 0, energy = 0, food = 0, ore = 0, supplies = 0, weapons = 0 } = {}) {
        Object.assign(this, { pop, energy, food, ore, supplies, weapons });
    }

    static fromJSON(json) {
        return new ResourceVec(json);
    }

    static multiply(vec, scalar) {
        return new ResourceVec({
            pop: vec.pop * scalar,
            energy: vec.energy * scalar,
            food: vec.food * scalar,
            ore: vec.ore * scalar,
            supplies: vec.supplies * scalar,
            weapons: vec.weapons * scalar
        });
    }

    static add(vec, other) {
        return new ResourceVec({
            pop: vec.pop + other.pop,
            energy: vec.energy + other.energy,
            food: vec.food + other.food,
            ore: vec.ore + other.ore,
            supplies: vec.supplies + other.supplies,
            weapons: vec.weapons + other.weapons
        });
    }

    static subtract(vec, other) {
        return new ResourceVec({
            pop: vec.pop - other.pop,
            energy: vec.energy - other.energy,
            food: vec.food - other.food,
            ore: vec.ore - other.ore,
            supplies: vec.supplies - other.supplies,
            weapons: vec.weapons - other.weapons
        });
    }

    clone() {
        return new ResourceVec(this);
    }

    roundToInt() {
        const roundedValues = Object.entries(this).reduce((acc, [key, value]) => {
            acc[key] = Math.round(value);
            return acc;
        }, {});
        return new ResourceVec(roundedValues);
    }

    /**
     * Executes a provided callback function once for each element in the array.
     *
     * @param {Function} callback - A function to execute on each element.
     *                             It accepts three arguments: the current element, the index of the current element, and the array itself.
     * @returns {undefined}
     */
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    }

    /**
     * Calculates the resource fulfillment based on the given consumption.
     * 
     * @param {ResourceVec} consumption - The consumption of resources.
     * @returns {number} The resource fulfillment value.
     */
    fulfilment(consumption) {
        var resourceFulfillment = 1;

        var newResources = ResourceVec.add(this, consumption);
        newResources.forEach((val, idx) => {
            if (val < 0) {
                resourceChange.set(idx, 0);
                resourceFulfillment = Math.min(resourceFulfillment, -this.get(idx) / resourceChange.get(idx));
            }
        });

        return resourceFulfillment;
    }
    
    toConvString() {
        var strlist = [];
        for (const prop in this) {
            if (this.hasOwnProperty(prop) && this[prop] != 0) {
                let sign = "";
                if (this[prop] < 0) {
                    sign = "-";
                } else if (this[prop] > 0) {
                    sign = "+";
                }

                let number = Math.abs(this[prop]);
                if (Math.round(number) != number) {
                    number = number.toFixed(2).toString().slice(1)   ;
                }
                strlist.push(`${sign}${number}${prop[0]}`);
            }
        }
        return strlist.join(" ");
    }
    
}

