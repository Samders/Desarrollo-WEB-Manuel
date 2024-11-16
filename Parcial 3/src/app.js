import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './db.js'; // Conexión a la base de dato
import DoctorRoutes from './routes/DoctorRoutes.js';
import PatientRoutes from './routes/PatientRoutes.js';
import AppointmentRoutes from './routes/AppointmentRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/doctor', DoctorRoutes);
app.use('/patient', PatientRoutes);
app.use('/appointment', AppointmentRoutes);

const port = process.env.PORT || 3000;  // Si no hay variable de entorno, usar el puerto 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });

export default app;
