
export class ResourceVec {
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
}
