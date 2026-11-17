import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface RegistroHistorialPagos { id_historial: number; id_pago: number; fecha_registro: string; descripcion: string; id_factura: number; monto: number; metodo: string; estado_pago: string; cliente: string; }
@Injectable({ providedIn: 'root' })
export class HistorialPagos {
  private http = inject(HttpClient);
  consulta() { return this.http.get<RegistroHistorialPagos[]>(
    'http://localhost/SEITELCOM/Backend/Controladores/historial_pagos.php?control=consulta'
  ); }
}
