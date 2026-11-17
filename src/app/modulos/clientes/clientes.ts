
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clientes as ClientesService } from '../../servicios/clientes';
import {ClienteServicioService, ClienteServicio} from '../../servicios/cliente-servicio';

interface Cliente {
  id_cliente: number;
  nombre: string;
  tipo_documento?: string;
  numero_documento?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  private clientesService = inject(ClientesService);
  private clienteServicioService = inject(ClienteServicioService);
  private cdr = inject(ChangeDetectorRef);

  clientes: Cliente[] = [];
  serviciosContratados: ClienteServicio[] = [];
  busqueda = '';
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarServicios();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.error = '';

    this.clientesService.consulta().subscribe({
      next: (respuesta) => {
        this.clientes = respuesta;
        this.cargando = false;

        console.log('Clientes obtenidos:', respuesta);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al consultar clientes:', error);

        this.error = 'No fue posible cargar los clientes.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

cargarServicios(): void {
  this.clienteServicioService.consulta().subscribe({
    next: (respuesta) => {
      this.serviciosContratados = respuesta;

      console.log('Servicios obtenidos:', respuesta);

      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al consultar servicios:', error);
    }
  });
}

clienteSeleccionado: Cliente | null = null;

verCliente(cliente: Cliente): void {
  this.clienteSeleccionado = cliente;
  this.cdr.detectChanges();
}

cerrarDetalle(): void {
  this.clienteSeleccionado = null;
  this.cdr.detectChanges();
}

obtenerServicios(idCliente: number): string {
  const servicios = this.serviciosContratados.filter(
    servicio => Number(servicio.id_cliente) === Number(idCliente)
  );

  if (servicios.length === 0) {
    return 'Sin servicios registrados';
  }

  return servicios.map(servicio => servicio.plan).join(' / ');
}

obtenerEstado(idCliente: number): string {

  const tieneServicioActivo = this.serviciosContratados.some(
    servicio =>
      Number(servicio.id_cliente) === Number(idCliente) &&
      servicio.estado.toLowerCase() === 'activo'
  );

  return tieneServicioActivo ? 'Activo' : 'Inactivo';
}

get clientesActivos(): number {
  return this.clientes.filter(cliente =>
    this.serviciosContratados.some(servicio =>
      Number(servicio.id_cliente) === Number(cliente.id_cliente) &&
      servicio.estado.toLowerCase() === 'activo'
    )
  ).length;
}

get clientesInactivos(): number {
  return this.clientes.length - this.clientesActivos;
}

  // Filtrar los clientes según lo escrito
  get clientesFiltrados(): Cliente[] {

    const texto = this.busqueda.trim().toLowerCase();

    if (!texto) {
      return this.clientes;
    }

    return this.clientes.filter(cliente =>
      String(cliente.nombre ?? '').toLowerCase().includes(texto) ||
      String(cliente.numero_documento ?? '').includes(texto) ||
      String(cliente.correo ?? '').toLowerCase().includes(texto) ||
      String(cliente.telefono ?? '').includes(texto)
    );
  }
}
