import pool from "../utils/pool";

export default class Character {
    id;
    name;
    class;
    race;
    gender;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.class = row.class;
        this.race = row.race;
        this.gender = row.gender;
    }
}
