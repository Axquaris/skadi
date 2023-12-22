
export class ResourceVec{
    constructor(pop = 0, energy = 0, food = 0, materials = 0, supplies = 0, weapons = 0) {
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

    static subtract(vec, other) {
        return new ResourceVec(
            vec.pop - other.pop,
            vec.energy - other.energy,
            vec.food - other.food,
            vec.materials - other.materials,
            vec.supplies - other.supplies,
            vec.weapons - other.weapons
        );
    }

    clone() {
        return new ResourceVec(
            this.pop,
            this.energy,
            this.food,
            this.materials,
            this.supplies,
            this.weapons
        );
    }

    roundToInt() {
        return new ResourceVec(
            Math.round(this.pop),
            Math.round(this.energy),
            Math.round(this.food),
            Math.round(this.materials),
            Math.round(this.supplies),
            Math.round(this.weapons)
        );
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
}
