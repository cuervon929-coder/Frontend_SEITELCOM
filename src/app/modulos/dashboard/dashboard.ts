
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
Chart.register(...registerables);

@Component({
  imports: [FormsModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit, OnDestroy {

  
  // Texto que escribe el administrador
busquedaFactura: string = '';

// Lista de facturas recientes
facturas = [
  {
    numero: 'FAC-001',
    cliente: 'Juan Pérez',
    servicio: 'Internet',
    valor: 75000,
    estado: 'Pagada'
  },
  {
    numero: 'FAC-002',
    cliente: 'María Gómez',
    servicio: 'Internet y televisión',
    valor: 110000,
    estado: 'Pendiente'
  },
  {
    numero: 'FAC-003',
    cliente: 'Carlos Rodríguez',
    servicio: 'Internet',
    valor: 85000,
    estado: 'Pagada'
  }
];

// Filtrar facturas según la búsqueda
get facturasFiltradas() {
  const texto = this.busquedaFactura
    .toLocaleLowerCase('es-CO')
    .trim();

  if (!texto) {
    return this.facturas;
  }

  return this.facturas.filter(factura =>
    factura.numero.toLocaleLowerCase('es-CO').includes(texto) ||
    factura.cliente.toLocaleLowerCase('es-CO').includes(texto) ||
    factura.servicio.toLocaleLowerCase('es-CO').includes(texto) ||
    factura.estado.toLocaleLowerCase('es-CO').includes(texto)
  );
}

  private graficoIngresos?: Chart;
  private graficoServicios?: Chart;

  ngAfterViewInit(): void {
    this.crearGraficoIngresos();
    this.crearGraficoServicios();
  }

  crearGraficoIngresos(): void {
    const canvas = document.getElementById(
      'incomeChart'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    this.graficoIngresos = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        datasets: [{
          label: 'Ingresos en millones de COP',
          data: [22, 25, 24, 28, 30, 29, 33, 35, 34, 37, 39, 42],
          borderColor: '#1255b8',
          backgroundColor: 'rgba(18, 85, 184, 0.12)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  crearGraficoServicios(): void {
    const canvas = document.getElementById(
      'servicesChart'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    this.graficoServicios = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: [
          'Solo internet',
          'Internet y televisión'
        ],
        datasets: [{
          data: [65, 35],
          backgroundColor: [
            '#1255b8',
            '#60a5fa'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.graficoIngresos?.destroy();
    this.graficoServicios?.destroy();
  }
}
