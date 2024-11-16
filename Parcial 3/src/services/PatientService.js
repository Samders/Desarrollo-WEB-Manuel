import { Patient } from '../models/Patient.js';

export class PatientService {
    static async authenticate(email, password) {
        const patient = await Patient.getByEmail(email);
        if (patient && patient.password === password) {
            return patient;
        }
        return null;
    }

    static async getAppointments(patientId, date = null) {
        return await Patient.getByPatient(patientId, date);
    }
}
