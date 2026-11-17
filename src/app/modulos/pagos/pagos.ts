import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagos as PagosService, RegistroPagos } from '../../servicios/pagos';
@Component({ selector: 'app-pagos', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './pagos.html', styleUrl: './pagos.css' })
export class Pagos implements OnInit {
  private api = inject(PagosService);
  private cdr = inject(ChangeDetectorRef);
  registros: RegistroPagos[] = [];
  busqueda = ''; cargando = false; error = '';
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.cargando = true; this.error = '';
    this.api.consulta().subscribe({
      next: datos => { this.registros = datos; this.cargando = false; this.cdr.detectChanges(); },
      error: err => { console.error(err); this.error = 'No fue posible cargar los datos. Comprueba Apache y MySQL.'; this.cargando = false; this.cdr.detectChanges(); }
    });
  }
  get filtrados(): RegistroPagos[] {
    const q = this.busqueda.trim().toLowerCase();
    return !q ? this.registros : this.registros.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q)));
  }
}
