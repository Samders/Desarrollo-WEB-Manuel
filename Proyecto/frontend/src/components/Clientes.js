import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente._id}>{cliente.nombre} - {cliente.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
