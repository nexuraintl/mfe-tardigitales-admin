import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_BASE, CLIENT_ID } from '../core/config/api.config';
import { ErrorHandlerService, AppError } from '../core/services/error-handler.service';
import { NxAlertComponent } from '../shared/components/alert/alert.component';

export interface Tramite {
  id?: number;
  nombre: string;
  tipo: string;
  costo: number;
  estado: string;
  descripcion?: string;
}

@Component({
  selector: 'app-tramites-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, NxAlertComponent],
  templateUrl: './tramites-crud.component.html',
  styleUrl: './tramites-crud.component.css'
})
export class TramitesCrudComponent implements OnInit {
  tramites: Tramite[] = [];
  loading = false;
  currentError: AppError | null = null;
  successMsg: string = '';
  clientId: number = CLIENT_ID;

  // Filtros
  filtroTexto = '';
  filtroTipo = '';
  filtroEstado = '';

  // Modal Crear/Editar
  modalOpen = false;
  isEditing = false;
  formTramite: Tramite = this.getEmptyTramite();
  formError: string = '';

  // Modal Confirmar Eliminar
  deleteModalOpen = false;
  tramiteToDeleteId: number | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.obtenerTramites();
  }

  getEmptyTramite(): Tramite {
    return {
      nombre: '',
      tipo: 'Contador Público',
      costo: 0,
      estado: 'Activo',
      descripcion: ''
    };
  }

  obtenerTramites(): void {
    this.loading = true;
    this.currentError = null;
    this.http.get<Tramite[]>(`${API_BASE}/tramites/list?client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.tramites = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.currentError = this.errorHandler.parseError(err, 'MS_3810_TRAMITES_GET', `${API_BASE}/tramites/list`);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  abrirCrear(): void {
    this.isEditing = false;
    this.formError = '';
    this.formTramite = this.getEmptyTramite();
    this.modalOpen = true;
  }

  abrirEditar(tramite: Tramite): void {
    if (!tramite.id) return;
    this.isEditing = true;
    this.formError = '';
    this.formTramite = { ...tramite };
    this.modalOpen = true;

    // Consultar información fresca y actualizada directamente del servidor
    this.http.get<Tramite>(`${API_BASE}/tramites/get/${tramite.id}?client_id=${this.clientId}`)
      .subscribe({
        next: (freshData) => {
          if (freshData) {
            this.formTramite = { ...freshData };
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Error al consultar datos actualizados del trámite:', err);
          const appErr = this.errorHandler.parseError(err, 'MS_3811_TRAMITES_NOT_FOUND', `${API_BASE}/tramites/get/${tramite.id}`);
          this.formError = `${appErr.title}: ${appErr.message}`;
          this.cdr.detectChanges();
        }
      });
  }

  cerrarModal(): void {
    this.modalOpen = false;
    this.formError = '';
    this.formTramite = this.getEmptyTramite();
  }

  guardarTramite(): void {
    if (!this.formTramite.nombre || this.formTramite.costo < 0) {
      this.formError = 'Por favor complete todos los campos obligatorios del trámite.';
      return;
    }

    this.formError = '';

    if (this.isEditing && this.formTramite.id) {
      // Actualizar Trámite (PUT /tramites/update/{id}?client_id=...)
      this.http.put<Tramite>(`${API_BASE}/tramites/update/${this.formTramite.id}?client_id=${this.clientId}`, this.formTramite)
        .subscribe({
          next: () => {
            this.successMsg = 'El trámite ha sido actualizado correctamente.';
            setTimeout(() => this.successMsg = '', 5000);
            this.cerrarModal();
            this.obtenerTramites();
          },
          error: (err) => {
            const appErr = this.errorHandler.parseError(err, 'MS_3813_TRAMITES_UPDATE', `${API_BASE}/tramites/update/${this.formTramite.id}`);
            this.formError = `${appErr.title}: ${appErr.message}`;
          }
        });
    } else {
      // Crear Trámite (POST /tramites/create?client_id=...)
      this.http.post<Tramite>(`${API_BASE}/tramites/create?client_id=${this.clientId}`, this.formTramite)
        .subscribe({
          next: () => {
            this.successMsg = 'El trámite ha sido registrado exitosamente.';
            setTimeout(() => this.successMsg = '', 5000);
            this.cerrarModal();
            this.obtenerTramites();
          },
          error: (err) => {
            const appErr = this.errorHandler.parseError(err, 'MS_3812_TRAMITES_CREATE', `${API_BASE}/tramites/create`);
            this.formError = `${appErr.title}: ${appErr.message}`;
          }
        });
    }
  }

  eliminarTramite(id: number): void {
    this.tramiteToDeleteId = id;
    this.deleteModalOpen = true;
  }

  cerrarConfirmarEliminar(): void {
    this.deleteModalOpen = false;
    this.tramiteToDeleteId = null;
  }

  confirmarEliminar(): void {
    if (this.tramiteToDeleteId !== null) {
      const id = this.tramiteToDeleteId;
      this.http.delete(`${API_BASE}/tramites/delete/${id}?client_id=${this.clientId}`)
        .subscribe({
          next: () => {
            this.successMsg = 'El trámite ha sido eliminado correctamente.';
            setTimeout(() => this.successMsg = '', 5000);
            this.cerrarConfirmarEliminar();
            this.obtenerTramites();
          },
          error: (err) => {
            this.currentError = this.errorHandler.parseError(err, 'MS_3814_TRAMITES_DELETE', `${API_BASE}/tramites/delete/${id}`);
            this.cerrarConfirmarEliminar();
          }
        });
    }
  }

  get tramitesFiltrados(): Tramite[] {
    return this.tramites.filter(t => {
      const matchTexto = !this.filtroTexto || 
        t.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        (t.descripcion && t.descripcion.toLowerCase().includes(this.filtroTexto.toLowerCase()));
      const matchTipo = !this.filtroTipo || t.tipo === this.filtroTipo;
      const matchEstado = !this.filtroEstado || t.estado === this.filtroEstado;
      return matchTexto && matchTipo && matchEstado;
    });
  }

  limpiarFiltros(): void {
    this.filtroTexto = '';
    this.filtroTipo = '';
    this.filtroEstado = '';
  }
}
