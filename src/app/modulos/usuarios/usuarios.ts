import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuarios as UsuariosService, RegistroUsuarios } from '../../servicios/usuarios';
@Component({ selector: 'app-usuarios', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './usuarios.html', styleUrl: './usuarios.css' })
export class Usuarios implements OnInit {
  private api = inject(UsuariosService);
  private cdr = inject(ChangeDetectorRef);
  registros: RegistroUsuarios[] = [];
  busqueda = ''; cargando = false; error = '';
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.cargando = true; this.error = '';
    this.api.consulta().subscribe({
      next: datos => { this.registros = datos; this.cargando = false; this.cdr.detectChanges(); },
      error: err => { console.error(err); this.error = 'No fue posible cargar los datos. Comprueba Apache y MySQL.'; this.cargando = false; this.cdr.detectChanges(); }
    });
  }
  get filtrados(): RegistroUsuarios[] {
    const q = this.busqueda.trim().toLowerCase();
    return !q ? this.registros : this.registros.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q)));
  }
}
