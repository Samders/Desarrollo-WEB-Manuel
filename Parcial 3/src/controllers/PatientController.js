import { JwtUtil } from '../utils/jwt.js';
import { PatientService } from '../services/PatientService.js';

export class PatientController {
    static async login(req, res) {
        const { email, password } = req.body;

        const patient = await PatientService.authenticate(email, password);
        if (!patient) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Genera un token con 30 minutos de vigencia
        const token = JwtUtil.generateToken({ id: patient.id, role: 'patient' }, '30m');
        res.json({ token });
    }

    static async listAppointments(req, res) {
        const { id } = req.user;
        const { date } = req.query;

        const appointments = await PatientService.getAppointments(id, date);
        res.json(appointments);
    }
}

