import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface RegistroNotificaciones { id_notificacion: number; id_cliente: number; cliente: string; id_pago: number | null; mensaje: string; fecha_envio: string; tipo: string; estado: string; }
@Injectable({ providedIn: 'root' })
export class Notificaciones {
  private http = inject(HttpClient);
  consulta() { return this.http.get<RegistroNotificaciones[]>(
    'http://localhost/SEITELCOM/Backend/Controladores/notificaciones.php?control=consulta'
  ); }
}
