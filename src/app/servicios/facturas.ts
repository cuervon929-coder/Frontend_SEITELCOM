
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Factura {
  id_factura: number;
  id_cliente: number;
  id_usuario: number;
  fecha_emision: string;
  fecha_vencimiento: string;
  monto_total: number;
  estado: string;
  cliente: string;
}

export type DatosFactura = Pick<
  Factura,
  | 'id_cliente'
  | 'id_usuario'
  | 'fecha_emision'
  | 'fecha_vencimiento'
  | 'monto_total'
  | 'estado'
>;

export interface RespuestaFactura {
  resultado: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class Facturas {

  private http = inject(HttpClient);

  private url =
    'http://localhost/SEITELCOM/Backend/Controladores/facturas.php';

  // Consultar facturas
  consulta() {
    return this.http.get<Factura[]>(
      `${this.url}?control=consulta`
    );
  }

  // Registrar factura
  insertar(datos: DatosFactura) {
    return this.http.post<RespuestaFactura>(
      `${this.url}?control=insertar`,
      datos
    );
  }

  // Editar factura
  editar(idFactura: number, datos: DatosFactura) {
    return this.http.put<RespuestaFactura>(
      `${this.url}?control=editar&id=${idFactura}`,
      datos
    );
  }

  // Anular factura
  anular(idFactura: number) {
    return this.http.patch<RespuestaFactura>(
      `${this.url}?control=anular&id=${idFactura}`,
      {}
    );
  }
}