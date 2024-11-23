// Validar token y rol
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Debes iniciar sesión primero");
      window.location.href = "index.html";
    }
  
    // Opcional: Verificar el rol en el backend
    fetch("http://localhost:3000/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token inválido");
        }
        return res.json();
      })
      .then((data) => {
        const { role } = data;
        if (window.location.pathname === "/admin.html" && role !== "admin") {
          alert("Acceso denegado");
          window.location.href = "reservas.html";
        }
      })
      .catch(() => {
        alert("Sesión no válida");
        window.location.href = "index.html";
      });
  });
  