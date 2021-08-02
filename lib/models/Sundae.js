import pool from "../utils/pool";

export default class Sundae {
    id;
    flavor;
    scoops;
    toppings;
    additionalToppings;

    constructor(row) {
        this.id  = row.id;
        this.flavor  = row.flavor;
        this.scoops  = row.scoops;
        this.toppings  = row.toppings;
        this.additionalToppings  = row.additional_toppings;
    }

    static async insert({ flavor, scoops, toppings, additionalToppings }) {
        const { rows } = await pool.query(
            'INSERT INTO sundaes (flavor, scoops, toppings, additional_toppings) VALUES ($1, $2, $3, $4) RETURNING *',
            [flavor, scoops, toppings, additionalToppings]
        );

        return new Sundae(rows[0]);
    }
}