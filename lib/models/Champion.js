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

    static async insert({ name, role, damage, difficulty, region }) {
        const { rows } = await pool.query(
            'INSERT INTO champions (name, role, damage, difficulty, region) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, role, damage, difficulty, region]
        );

        return new Champion(rows[0]);
    }
}

