import { pool } from '../db.js';

export class Doctor {
    static async getByEmail(email) {
        const query = `SELECT * FROM doctors WHERE email = $1;`;
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }

    static async getById(id) {
        const query = `SELECT * FROM doctors WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}
