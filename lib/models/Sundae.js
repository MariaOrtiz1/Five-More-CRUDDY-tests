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

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM sundaes WHERE id=$1', [id]
        );

        return new Sundae(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * from sundaes');

        return rows.map((row) => new Sundae(row));
    }

    static async updateById(id, { flavor, scoops, toppings, additionalToppings}) {
        const existingSundae = await Sundae.getById(id);
        const newFlavor = flavor ?? existingSundae.flavor;
        const newScoops = scoops ?? existingSundae.scoops;
        const newToppings = toppings ?? existingSundae.toppings;
        const newAdditionalToppings = additionalToppings ?? existingSundae.additionalToppings;

        const { rows } = await pool.query(
            'UPDATE sundaes SET flavor=$1, scoops=$2, toppings=$3, additional_toppings=$4 WHERE id=$5 RETURNING *',
            [newFlavor, newScoops, newToppings, newAdditionalToppings, id]
            );

        return new Sundae(rows[0]);
    }
}