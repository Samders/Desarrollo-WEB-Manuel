import config from './config.js';

const apiUrl = config.apiUrl;

// Elementos del DOM
const authSection = document.getElementById('auth-section');
const reservationSection = document.getElementById('reservation-section');
const authForm = document.getElementById('auth-form');
const reservationForm = document.getElementById('reservation-form');
const registerBtn = document.getElementById('register-btn');

// Guardar el token JWT en el localStorage
function saveToken(token) {
    localStorage.setItem('jwtToken', token);
}

// Obtener el token JWT
function getToken() {
    return localStorage.getItem('jwtToken');
}

// Iniciar sesión
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
       // Enviar datos al backend
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
  
      const data = await response.json();
      const { token, role } = data; // Suponiendo que el backend devuelve { token, role }
  
      // Guardar token en localStorage
      localStorage.setItem("jwt", token);
  
      // Redirigir según el rol
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "reservas.html";
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
});

// Crear reserva
reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    const token = getToken();

    if (!token) {
        alert('Debes iniciar sesión para realizar una reserva.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ producto, cantidad }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Reserva creada con éxito');
        } else {
            alert(data.message || 'Error al crear la reserva');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear la reserva');
    }
});

// Manejo del registro (simplemente cambia al backend el endpoint)
registerBtn.addEventListener('click', async () => {
    const email = prompt('Ingresa tu correo:');
    const password = prompt('Ingresa tu contraseña:');

    if (!email || !password) return alert('Datos inválidos');

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Usuario registrado con éxito');
        } else {
            alert(data.message || 'Error al registrarse');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrarse');
    }
});
