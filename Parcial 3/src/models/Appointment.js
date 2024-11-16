import { pool } from '../db.js';

export class Appointment {
    static async create(doctorId, patientId, date, time) {
        const query = `
            INSERT INTO appointments (doctor_id, patient_id, date, time)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [doctorId, patientId, date, time];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async getByPatient(patientId, date = null) {
        const query = date
            ? `SELECT * FROM appointments WHERE patient_id = $1 AND date = $2;`
            : `SELECT * FROM appointments WHERE patient_id = $1;`;

        const { rows } = await pool.query(query, date ? [patientId, date] : [patientId]);
        return rows;
    }

    static async getByDoctor(doctorId, date = null) {
        const query = date
            ? `SELECT * FROM appointments WHERE doctor_id = $1 AND date = $2;`
            : `SELECT * FROM appointments WHERE doctor_id = $1;`;

        const { rows } = await pool.query(query, date ? [doctorId, date] : [doctorId]);
        return rows;
    }
}
