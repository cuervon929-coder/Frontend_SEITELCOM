
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ClienteServicio {
  id_cliente_servicio: number;
  id_cliente: number;
  id_servicio: number;
  cliente: string;
  tipo: string;
  plan: string;
  costo_mensual: string;
  fecha_inicio: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteServicioService {

  private http = inject(HttpClient);

  private url =
    'http://localhost/SEITELCOM/Backend/Controladores/cliente_servicio.php';

  consulta() {
    return this.http.get<ClienteServicio[]>(
      `${this.url}?control=consulta`
    );
  }
}