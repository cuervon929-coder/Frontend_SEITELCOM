
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Facturas as FacturasService,
  Factura
} from '../../servicios/facturas';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facturas.html',
  styleUrl: './facturas.css'
})
export class Facturas implements OnInit {

  private facturasService = inject(FacturasService);
  private cdr = inject(ChangeDetectorRef);

  facturas: Factura[] = [];
  busqueda = '';
  cargando = false;
  error = '';

  facturaSeleccionada: Factura | null = null;

  editando = false;
  guardando = false;
  errorEdicion = '';
  facturaEditar: Factura | null = null;

  ngOnInit(): void {
    this.cargarFacturas();
  }

  // Consultar facturas
  cargarFacturas(): void {
    this.cargando = true;
    this.error = '';

    this.facturasService.consulta().subscribe({
      next: (respuesta) => {
        this.facturas = respuesta.map(factura => ({
          ...factura,
          id_factura: Number(factura.id_factura),
          id_cliente: Number(factura.id_cliente),
          id_usuario: Number(factura.id_usuario),
          monto_total: Number(factura.monto_total)
        }));

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al consultar facturas:', error);
        this.error = 'No fue posible cargar las facturas.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Ver detalle de factura
  verFactura(factura: Factura): void {
    this.facturaSeleccionada = factura;
    this.cdr.detectChanges();
  }

  cerrarDetalle(): void {
    this.facturaSeleccionada = null;
    this.cdr.detectChanges();
  }

  // Abrir edición
  abrirEdicion(factura: Factura): void {
    if (factura.estado.toLowerCase() !== 'pendiente') {
      return;
    }

    this.facturaEditar = { ...factura };
    this.errorEdicion = '';
    this.editando = true;
    this.cdr.detectChanges();
  }

  // Cerrar edición
  cerrarEdicion(): void {
    if (this.guardando) {
      return;
    }

    this.editando = false;
    this.facturaEditar = null;
    this.errorEdicion = '';
    this.cdr.detectChanges();
  }

  // Guardar cambios
  guardarEdicion(): void {
    if (!this.facturaEditar || this.guardando) {
      return;
    }

    const factura = this.facturaEditar;

    if (
      !Number.isFinite(Number(factura.monto_total)) ||
      Number(factura.monto_total) <= 0
    ) {
      this.errorEdicion =
        'Ingresa un valor válido mayor que cero.';
      return;
    }

    if (
      !factura.fecha_emision ||
      !factura.fecha_vencimiento ||
      factura.fecha_vencimiento < factura.fecha_emision
    ) {
      this.errorEdicion =
        'Verifica las fechas de emisión y vencimiento.';
      return;
    }

    this.guardando = true;
    this.errorEdicion = '';

    this.facturasService.editar(factura.id_factura, {
      id_cliente: factura.id_cliente,
      id_usuario: factura.id_usuario,
      fecha_emision: factura.fecha_emision,
      fecha_vencimiento: factura.fecha_vencimiento,
      monto_total: Number(factura.monto_total),
      estado: 'pendiente'
    }).subscribe({
      next: (respuesta) => {
        this.guardando = false;

        if (respuesta.resultado !== 'Ok') {
          this.errorEdicion = respuesta.mensaje;
          this.cdr.detectChanges();
          return;
        }

        this.cerrarEdicion();
        this.cargarFacturas();
      },
      error: (error) => {
        console.error('Error al editar factura:', error);
        this.errorEdicion =
          error.error?.mensaje ||
          'No fue posible actualizar la factura.';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Buscar facturas
  get facturasFiltradas(): Factura[] {
    const texto = this.busqueda.trim().toLowerCase();

    if (!texto) {
      return this.facturas;
    }

    return this.facturas.filter(factura =>
      String(factura.id_factura).includes(texto) ||
      String(factura.cliente).toLowerCase().includes(texto) ||
      String(factura.estado).toLowerCase().includes(texto)
    );
  }

  // Contar facturas pagadas
  get facturasPagadas(): number {
    return this.facturas.filter(
      factura => factura.estado.toLowerCase() === 'pagada'
    ).length;
  }

  // Contar facturas pendientes
  get facturasPendientes(): number {
    return this.facturas.filter(
      factura => factura.estado.toLowerCase() === 'pendiente'
    ).length;
  }

  // Calcular valor total
  get valorTotal(): number {
    return this.facturas.reduce(
      (total, factura) => total + factura.monto_total,
      0
    );
  }
}