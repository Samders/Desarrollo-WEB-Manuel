import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://localhost:3000/api/reservas';
  }

  crearReserva(reserva) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(`${this.apiUrl}/crear`, reserva, { headers });
  }
}

ReservasService.parameters = [HttpClient];
