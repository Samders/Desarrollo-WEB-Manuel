import { Appointment } from '../models/Appointment.js';

export class AppointmentService {
    static async createAppointment(doctorId, patientId, date, time) {
        return await Appointment.create(doctorId, patientId, date, time);
    }
}
