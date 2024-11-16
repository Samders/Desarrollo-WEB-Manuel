import express from 'express';
import { PatientController } from '../controllers/PatientController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', PatientController.login);
router.get('/appointments', authenticate, PatientController.listAppointments);

export default router;
