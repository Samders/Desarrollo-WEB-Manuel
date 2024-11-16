import { AppointmentService } from '../services/AppointmentService.js';

export class AppointmentController {
    static async create(req, res) {
        const { doctorId, patientId, date, time } = req.body;
        const appointment = await AppointmentService.createAppointment(doctorId, patientId, date, time);
        res.status(201).json(appointment);
    }
}
