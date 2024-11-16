const API_URL = 'http://localhost:3000'; // Cambia esto por tu URL si es necesario

// Función para hacer login de un doctor
document.getElementById('doctor-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('doctor-email').value;
    const password = document.getElementById('doctor-password').value;

    try {
        const response = await fetch(`${API_URL}/doctor/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Doctor logged in successfully!');
            localStorage.setItem('doctorToken', data.token);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error logging in doctor:', error);
    }
});

// Función para hacer login de un paciente
document.getElementById('patient-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('patient-email').value;
    const password = document.getElementById('patient-password').value;

    try {
        const response = await fetch(`${API_URL}/patient/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Patient logged in successfully!');
            localStorage.setItem('patientToken', data.token);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error logging in patient:', error);
    }
});

// Función para obtener las citas de un doctor o paciente
document.getElementById('get-appointments').addEventListener('click', async () => {
    const token = localStorage.getItem('doctorToken') || localStorage.getItem('patientToken');

    if (!token) {
        alert('Please login first');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/doctor/appointment`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (response.ok) {
            displayAppointments(data);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
});

// Función para mostrar citas
function displayAppointments(appointments) {
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';
    
    if (appointments.length === 0) {
        appointmentsList.innerHTML = 'No appointments found.';
    } else {
        appointments.forEach(app => {
            const appointmentItem = document.createElement('div');
            appointmentItem.textContent = `Patient ID: ${app.patient_id}, Date: ${app.date}, Time: ${app.time}`;
            appointmentsList.appendChild(appointmentItem);
        });
    }
}
