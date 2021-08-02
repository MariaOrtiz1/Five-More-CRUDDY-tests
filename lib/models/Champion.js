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

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM champions WHERE id=$1', [id]);

            return new Champion(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * from champions');

        return rows.map((row) => new Champion(row));
    }
}

