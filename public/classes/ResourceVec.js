
export const resourceTypes = {
    'pop': '#ba6c54',
    'food': '#125d31',
    'energy': '#b3a007',
    'ore': '#6c3833',
    'supplies': '#4e3b7e',
    'weapons': '#c21319'
};


export class ResourceVec{
    static keys = ['pop', 'energy', 'food', 'ore', 'supplies', 'weapons'];

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
     *                             It accepts the current value.
     * @returns {undefined}
     */
    forEach(callback) {
        ResourceVec.keys.forEach(key => {
            var out = callback(key, this[key]);
            if (out !== undefined) {
                this[key] = out;
            }
        });
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
        newResources.forEach((key, val) => {
            if (val < 0) {
                resourceChange.set(key, 0);
                resourceFulfillment = Math.min(resourceFulfillment, -this.get(key) / resourceChange.get(key));
            }
        });

        return resourceFulfillment;
    }
    
    toConvString() {
        return ResourceVec.keys
            .filter(key => this[key] !== 0)
            .map(key => {
                const value = this[key];
                const sign = value > 0 ? '+' : '';
                const number = Math.abs(value).toFixed(2).replace(/\.?0+$/, '');
                return `${sign}${number}${key[0]}`;
            })
            .join(' ');
    }
}

