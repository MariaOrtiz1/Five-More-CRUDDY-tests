import pool from "../utils/pool";

export default class Champion {
    id;
    name;
    role;
    damage;
    difficulty;
    region;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.role = row.role;
        this.damage = row.damage;
        this.difficulty = row.difficulty;
        this.region = row.region;
    }
}

