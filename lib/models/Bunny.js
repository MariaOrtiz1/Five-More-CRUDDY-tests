import pool from "../utils/pool";

export default class Bunny {
    id;
    name;
    mainColor;
    secondColor;
    ears;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.mainColor = row.main_color;
        this.secondColor = row.second_color;
        this.ears = row.ears;
    }

    static async insert({ name, mainColor, secondColor, ears }) {
        const { rows } = await pool.query(
            'INSERT INTO bunnies (name, main_color, second_color, ears) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, mainColor, secondColor, ears]
        );

        return new Bunny(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM bunnies WHERE id=$1', [id]);

            return new Bunny(rows[0]);
    }
}