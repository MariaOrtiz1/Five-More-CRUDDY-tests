import pool from "../utils/pool";

export default class Character {
    id;
    name;
    jobClass;
    race;
    gender;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.jobClass = row.job_class;
        this.race = row.race;
        this.gender = row.gender;
    }

    static async insert({ name, jobClass, race, gender }) {
        const { rows } = await pool.query(
            'INSERT INTO characters (name, job_class, race, gender) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, jobClass, race, gender]
        );

        return new Character(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM characters WHERE id=$1', [id]);

            return new Character(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * from characters');

        return rows.map((row) => new Character(row));
    }

    static async updateById(id, { name, jobClass, race, gender }) {
        const existingCharacter = await Character.getById(id);
        const newName = name ?? existingCharacter.name;
        const newJobClass = jobClass ?? existingCharacter.jobClass;
        const newRace = race ?? existingCharacter.race;
        const newGender = gender ?? existingCharacter.gender;

        const { rows } = await pool.query(
            'UPDATE characters SET name=$1, job_class=$2, race=$3, gender=$4 WHERE id=$5 RETURNING *',
            [newName, newJobClass, newRace, newGender, id]
            );

        return new Character(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM characters WHERE id=$1 RETURNING *', [id]);

            return new Character(rows[0]);
    }
}
