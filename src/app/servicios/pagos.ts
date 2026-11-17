import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface RegistroPagos { id_pago: number; id_factura: number; id_plataforma: number | null; cliente: string; fecha_pago: string; monto: number; metodo: string; estado: string; }
@Injectable({ providedIn: 'root' })
export class Pagos {
  private http = inject(HttpClient);
  consulta() { return this.http.get<RegistroPagos[]>(
    'http://localhost/SEITELCOM/Backend/Controladores/pagos.php?control=consulta'
  ); }
}
