import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Tramite {
  id?: number;
  client_id?: number;
  nombre: string;
  tipo: string;
  costo: number;
  estado: 'Activo' | 'Inactivo';
  descripcion: string;
}

@Component({
  selector: 'app-tramites-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramites-crud.component.html',
  styleUrl: './tramites-crud.component.css'
})
export class TramitesCrudComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private clientId: number = 20002;

  tramites: Tramite[] = [];
  loading: boolean = false;
  errorMsg: string = '';

  // Controladores del Modal de Formulario
  modalOpen: boolean = false;
  isEditing: boolean = false;

  // Controladores del Modal de Confirmación de Eliminación
  deleteModalOpen: boolean = false;
  tramiteToDeleteId: number | null = null;

  // Datos del Formulario
  formTramite: Tramite = this.getEmptyTramite();

  ngOnInit(): void {
    this.obtenerTramites();
  }

  getEmptyTramite(): Tramite {
    return {
      client_id: this.clientId,
      nombre: '',
      tipo: 'Contador Público',
      costo: 0,
      estado: 'Activo',
      descripcion: ''
    };
  }

  obtenerTramites(): void {
    this.loading = true;
    this.errorMsg = '';
    this.http.get<Tramite[]>(`https://preproduccion-tardigitales.nexura.com/apig/tardigitales/tramites?client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.tramites = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener trámites:', err);
          this.errorMsg = 'No se pudo conectar con el microservicio de Python. Verifica que esté encendido.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  abrirCrear(): void {
    this.isEditing = false;
    this.formTramite = this.getEmptyTramite();
    this.modalOpen = true;
  }

  abrirEditar(tramite: Tramite): void {
    this.isEditing = true;
    this.formTramite = { ...tramite }; // Clonamos el objeto para evitar modificar la tabla directamente
    this.modalOpen = true;
  }

  cerrarModal(): void {
    this.modalOpen = false;
    this.formTramite = this.getEmptyTramite();
  }

  guardarTramite(): void {
    if (!this.formTramite.nombre || this.formTramite.costo < 0) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.formTramite.client_id = this.clientId;

    if (this.isEditing && this.formTramite.id) {
      // Actualizar Trámite
      this.http.put<Tramite>(`https://preproduccion-tardigitales.nexura.com/apig/tardigitales/tramites/${this.formTramite.id}`, this.formTramite)
        .subscribe({
          next: () => {
            this.cerrarModal();
            this.obtenerTramites();
          },
          error: (err) => {
            console.error('Error al actualizar trámite:', err);
            alert('Error al intentar actualizar el trámite.');
          }
        });
    } else {
      // Crear Trámite
      this.http.post<Tramite>('http://localhost:8000/tramites', this.formTramite)
        .subscribe({
          next: () => {
            this.cerrarModal();
            this.obtenerTramites();
          },
          error: (err) => {
            console.error('Error al registrar trámite:', err);
            alert('Error al intentar registrar el trámite.');
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
      this.http.delete(`https://preproduccion-tardigitales.nexura.com/apig/tardigitales/tramites/${this.tramiteToDeleteId}?client_id=${this.clientId}`)
        .subscribe({
          next: () => {
            this.cerrarConfirmarEliminar();
            this.obtenerTramites();
          },
          error: (err) => {
            console.error('Error al eliminar trámite:', err);
            alert('Error al intentar eliminar el trámite.');
            this.cerrarConfirmarEliminar();
          }
        });
    }
  }
}
