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
}
