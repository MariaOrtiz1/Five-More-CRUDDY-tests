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

    static async insert({ name, level, boss, expansion }) {
        const { rows } = await pool.query(
            'INSERT INTO trials (name, level, boss, expansion) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, level, boss, expansion]
        );

        return new Trial(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM trials WHERE id=$1', [id]);

            return new Trial(rows[0]);
    }
}