import express from 'express';
import { DoctorController } from '../controllers/DoctorController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', DoctorController.login);
router.get('/appointments', authenticate, DoctorController.listAppointments);

export default router;
