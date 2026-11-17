import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Facturas as FacturasService, Factura } from '../../servicios/facturas';
import { Pagos as PagosService, RegistroPagos } from '../../servicios/pagos';
@Component({ selector: 'app-reportes', standalone: true, imports: [CommonModule], templateUrl: './reportes.html', styleUrl: './reportes.css' })
export class Reportes implements OnInit {
 private fs=inject(FacturasService); private ps=inject(PagosService); private cdr=inject(ChangeDetectorRef);
 facturas: Factura[]=[]; pagos: RegistroPagos[]=[]; cargando=false; error='';
 ngOnInit(): void { this.cargar(); }
 cargar(): void { this.cargando=true; this.error='';
  forkJoin({facturas:this.fs.consulta(), pagos:this.ps.consulta()}).subscribe({
   next: r=>{this.facturas=r.facturas; this.pagos=r.pagos; this.cargando=false;this.cdr.detectChanges();},
   error:e=>{console.error(e);this.error='No se pudieron consultar los reportes.';this.cargando=false;this.cdr.detectChanges();}
  });
 }
 get pendientes(): number { return this.facturas.filter(f=>f.estado.toLowerCase()==='pendiente').length; }
 get pagadas(): number { return this.facturas.filter(f=>f.estado.toLowerCase()==='pagada').length; }
 get facturado(): number { return this.facturas.reduce((s,f)=>s+Number(f.monto_total),0); }
 get recaudado(): number { return this.pagos.filter(p=>['aprobado','aprobada','pagado','pagada'].includes(p.estado.toLowerCase())).reduce((s,p)=>s+Number(p.monto),0); }
}
