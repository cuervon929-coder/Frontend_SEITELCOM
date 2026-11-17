import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface RegistroUsuarios { id_usuario: number; usuario: string; }
@Injectable({ providedIn: 'root' })
export class Usuarios {
  private http = inject(HttpClient);
  consulta() { return this.http.get<RegistroUsuarios[]>(
    'http://localhost/SEITELCOM/Backend/Controladores/usuarios.php?control=consulta'
  ); }
}
