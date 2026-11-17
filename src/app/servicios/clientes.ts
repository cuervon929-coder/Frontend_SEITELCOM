
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Clientes {

  private http = inject(HttpClient);

  private url =
    'http://localhost/SEITELCOM/Backend/Controladores/clientes.php';

  // Consultar todos los clientes
  consulta() {
    return this.http.get<any[]>(
      `${this.url}?control=consulta`
    );
  }

}