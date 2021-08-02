import pool from "../utils/pool";

export default class Trial {
    id;
    name;
    level;
    boss;
    expansion;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.level = row.level;
        this.boss = row.boss;
        this.expansion = row.expansion;
    }
    
}