import { JwtUtil } from '../utils/jwt.js';
import { DoctorService } from '../services/DoctorService.js';

export class DoctorController {
    static async login(req, res) {
        const { email, password } = req.body;

        const doctor = await DoctorService.authenticate(email, password);
        if (!doctor) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Genera un token con 1 hora de vigencia
        const token = JwtUtil.generateToken({ id: doctor.id, role: 'doctor' }, '1h');
        res.json({ token });
    }

    static async listAppointments(req, res) {
        const { id } = req.user;
        const { date } = req.query;

        const appointments = await DoctorService.getAppointments(id, date);
        res.json(appointments);
    }
}

