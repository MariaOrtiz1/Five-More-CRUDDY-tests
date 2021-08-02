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

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * from trials');

        return rows.map((row) => new Trial(row));
    }

    static async updateById(id, { name, level, boss, expansion}) {
        const existingTrial = await Trial.getById(id);
        const newName = name ?? existingTrial.name;
        const newLevel = level ?? existingTrial.level;
        const newBoss = boss ?? existingTrial.boss;
        const newExpansion = expansion ?? existingTrial.expansion;

        const { rows } = await pool.query(
            'UPDATE trials SET name=$1, level=$2, boss=$3, expansion=$4 WHERE id=$5 RETURNING *',
            [newName, newLevel, newBoss, newExpansion, id]
            );

        return new Trial(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM trials WHERE id=$1 RETURNING *', [id]);

            return new Trial(rows[0]);
    }
}