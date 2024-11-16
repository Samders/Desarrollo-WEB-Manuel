import express from 'express';
import { AppointmentController } from '../controllers/AppointmentController.js';

const router = express.Router();

router.post('/', AppointmentController.create);

export default router;
