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

    static async updateById(id, { name, role, damage, difficulty, region }) {
        const existingChampion = await Champion.getById(id);
        const newName = name ?? existingChampion.name;
        const newRole = role ?? existingChampion.role;
        const newDamage = damage ?? existingChampion.damage;
        const newDifficulty = difficulty ?? existingChampion.difficulty;
        const newRegion = region ?? existingChampion.region;

        const { rows } = await pool.query(
            'UPDATE champions SET name=$1, role=$2, damage=$3, difficulty=$4, region=$5 WHERE id=$6 RETURNING *',
            [newName, newRole, newDamage, newDifficulty, newRegion, id]
            );

        return new Champion(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM champions WHERE id=$1 RETURNING *', [id]);

            return new Champion(rows[0]);
    }
}

