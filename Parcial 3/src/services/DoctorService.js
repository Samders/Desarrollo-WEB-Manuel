import { Doctor } from '../models/Doctor.js';

export class DoctorService {
    static async authenticate(email, password) {
        const doctor = await Doctor.getByEmail(email);
        if (doctor && doctor.password === password) {
            return doctor;
        }
        return null;
    }

    static async getAppointments(doctorId, date = null) {
        return await Doctor.getByDoctor(doctorId, date);
    }
}
