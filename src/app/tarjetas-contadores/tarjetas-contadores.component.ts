import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface TarjetaContador {
  id: number;
  client_id?: number;
  tipo_tarjeta: string;
  codigo: string;
  expediente: number;
  solicitante: string;
  documento: string;
  matricula: string;
  correo: string;
  representante?: string;
  tarjeta: string;
  fecha: string;
}

@Component({
  selector: 'app-tarjetas-contadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjetas-contadores.component.html',
  styleUrl: './tarjetas-contadores.component.css'
})
export class TarjetasContadoresComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private clientId: number = 20002;

  tarjetas: TarjetaContador[] = [];
  loading: boolean = false;

  // Filtros y Buscador
  searchQuery: string = '';
  filterColumn: string = '';
  filterValue: string = '';
  pageSize: number = 10;
  currentPage: number = 1;

  // Modal Detalle y Tarjeta Digital
  selectedTarjeta: TarjetaContador | null = null;
  isDetailModalOpen: boolean = false;
  isCardModalOpen: boolean = false;

  // Semilla QR para simular matriz dinámica
  qrSeed: number = 0.5;

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void {
    this.loading = true;
    this.http.get<TarjetaContador[]>(`http://localhost:8000/api/tarjetas?tipo_tarjeta=contadores&client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.tarjetas = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar tarjetas de contadores:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // Filtrado reactivo
  get filteredTarjetas(): TarjetaContador[] {
    return this.tarjetas.filter(t => {
      const matchSearch = !this.searchQuery ||
        t.solicitante.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.documento.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.matricula.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.codigo.toLowerCase().includes(this.searchQuery.toLowerCase());

      let matchColumn = true;
      if (this.filterColumn && this.filterValue) {
        const val = this.filterValue.toLowerCase();
        if (this.filterColumn === 'documento') {
          matchColumn = t.documento.toLowerCase().includes(val);
        } else if (this.filterColumn === 'matricula') {
          matchColumn = t.matricula.toLowerCase().includes(val);
        } else if (this.filterColumn === 'solicitante') {
          matchColumn = t.solicitante.toLowerCase().includes(val);
        } else if (this.filterColumn === 'tarjeta') {
          matchColumn = t.tarjeta.toLowerCase() === val;
        }
      }

      return matchSearch && matchColumn;
    });
  }

  // Paginación
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredTarjetas.length / this.pageSize));
  }

  get paginatedTarjetas(): TarjetaContador[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTarjetas.slice(start, start + this.pageSize);
  }

  get recordRangeStart(): number {
    return this.filteredTarjetas.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get recordRangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredTarjetas.length);
  }

  cambiarPagina(p: number): void {
    if (p >= 1 && p <= this.totalPages) {
      this.currentPage = p;
    }
  }

  abrirDetalle(t: TarjetaContador): void {
    this.selectedTarjeta = t;
    this.isDetailModalOpen = true;
  }

  cerrarDetalle(): void {
    this.isDetailModalOpen = false;
    this.selectedTarjeta = null;
  }

  abrirTarjeta(t: TarjetaContador): void {
    this.selectedTarjeta = t;
    this.qrSeed = Math.random();
    this.isCardModalOpen = true;
  }

  cerrarTarjeta(): void {
    this.isCardModalOpen = false;
    this.selectedTarjeta = null;
  }

  // Simulador de matriz QR en base a un Seed
  getQrDot(x: number, y: number): boolean {
    return ((x * 17 + this.qrSeed * 13 + x * y * 5) % 11) < 5;
  }
}
