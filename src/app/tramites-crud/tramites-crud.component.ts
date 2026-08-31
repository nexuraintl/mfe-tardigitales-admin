import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class TramitesCrudComponent implements OnInit, OnDestroy, AfterViewInit {
  tramites: Tramite[] = [];
  loading = false;
  currentError: AppError | null = null;
  successMsg: string = '';
  clientId: number = CLIENT_ID;
  private dtInstance: any = null;

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

  isTableReady = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.obtenerTramites();
  }

  ngAfterViewInit(): void {
    this.ensureDataTablesLoaded();
  }

  ngOnDestroy(): void {
    this.destroyDataTable();
  }

  private ensureDataTablesLoaded(): Promise<void> {
    if ((window as any).DataTable) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      if (document.querySelector('script[src*="datatables.net/2.3.1/js/dataTables.min.js"]')) {
        const timer = setInterval(() => {
          if ((window as any).DataTable) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
        return;
      }
      const jqScript = document.createElement('script');
      jqScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
      jqScript.onload = () => {
        const dtScript = document.createElement('script');
        dtScript.src = 'https://cdn.datatables.net/2.3.1/js/dataTables.min.js';
        dtScript.onload = () => {
          const dtBs5Script = document.createElement('script');
          dtBs5Script.src = 'https://cdn.datatables.net/2.3.1/js/dataTables.bootstrap5.min.js';
          dtBs5Script.onload = () => resolve();
          document.head.appendChild(dtBs5Script);
        };
        document.head.appendChild(dtScript);
      };
      document.head.appendChild(jqScript);
    });
  }

  private destroyDataTable(): void {
    if (this.dtInstance) {
      try {
        this.dtInstance.destroy();
      } catch (e) {}
      this.dtInstance = null;
    }
  }

  initDataTable(): void {
    if (!this.isTableReady) return;
    this.ensureDataTablesLoaded().then(() => {
      setTimeout(() => {
        const tableEl = document.getElementById('tablaTramites');
        if (!tableEl) return;

        const dtConstructor = (window as any).DataTable;
        if (typeof dtConstructor === 'function') {
          this.dtInstance = new dtConstructor('#tablaTramites', {
            pageLength: 10,
            responsive: true,
            columnDefs: [
              { targets: 0, type: 'num' }
            ],
            order: [[0, 'desc']], // Ordenar por ID descendente
            language: {
              search: "",
              searchPlaceholder: "Escriba para filtrar...",
              lengthMenu: "Mostrar _MENU_ registros",
              info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
              infoEmpty: "Mostrando 0 a 0 de 0 registros",
              infoFiltered: "(filtrado de _MAX_ registros totales)",
              zeroRecords: "No se encontraron trámites registrados",
              paginate: {
                first: "««",
                last: "»»",
                next: "»",
                previous: "«"
              }
            },
            layout: {
              topStart: 'search',
              topEnd: 'pageLength',
              bottomStart: 'info',
              bottomEnd: 'paging'
            }
          });

          // Agregar botón Buscar al lado del input de búsqueda
          const searchContainer = tableEl.closest('.dt-container')?.querySelector('.dt-search');
          if (searchContainer && !searchContainer.querySelector('.btn-dt-search')) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-outline-primary btn-sm btn-dt-search ms-2';
            btn.innerHTML = '<span class="fa fa-search me-1"></span> Buscar';
            btn.onclick = () => {
              const input = searchContainer.querySelector('input') as HTMLInputElement;
              if (input && this.dtInstance) {
                this.dtInstance.search(input.value).draw();
              }
            };
            searchContainer.appendChild(btn);
          }
        }
      }, 50);
    });
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

  trackByTramiteId(index: number, item: Tramite): number | undefined {
    return item.id || index;
  }

  obtenerTramites(): void {
    this.destroyDataTable();
    this.isTableReady = false;
    this.loading = true;
    this.currentError = null;
    this.cdr.detectChanges();

    const ts = new Date().getTime();
    this.http.get<Tramite[]>(`${API_BASE}/tramites/list?client_id=${this.clientId}&_t=${ts}`)
      .subscribe({
        next: (data) => {
          this.tramites = [...(data || [])];
          this.loading = false;
          this.isTableReady = true;
          this.cdr.detectChanges();
          setTimeout(() => {
            this.initDataTable();
          }, 60);
        },
        error: (err) => {
          this.currentError = this.errorHandler.parseError(err, 'MS_3810_TRAMITES_GET', `${API_BASE}/tramites/list`);
          this.loading = false;
          this.isTableReady = true;
          this.cdr.detectChanges();
        }
      });
  }

  abrirCrear(): void {
    this.isEditing = false;
    this.formError = '';
    this.formTramite = this.getEmptyTramite();
    this.modalOpen = true;
    this.cdr.detectChanges();
  }

  abrirEditar(tramite: Tramite): void {
    if (!tramite.id) return;
    this.isEditing = true;
    this.formError = '';
    this.formTramite = { ...tramite };
    this.modalOpen = true;
    this.cdr.detectChanges();

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
    this.cdr.detectChanges();
  }

  guardarTramite(): void {
    if (!this.formTramite.nombre || this.formTramite.costo < 0) {
      this.formError = 'Por favor complete todos los campos obligatorios del trámite.';
      this.cdr.detectChanges();
      return;
    }

    this.formError = '';

    if (this.isEditing && this.formTramite.id) {
      // Actualizar Trámite (PUT /tramites/update/{id}?client_id=...)
      this.http.put<Tramite>(`${API_BASE}/tramites/update/${this.formTramite.id}?client_id=${this.clientId}`, this.formTramite)
        .subscribe({
          next: () => {
            this.successMsg = 'El trámite ha sido actualizado correctamente.';
            setTimeout(() => {
              this.successMsg = '';
              this.cdr.detectChanges();
            }, 5000);
            this.cerrarModal();
            this.obtenerTramites();
          },
          error: (err) => {
            const appErr = this.errorHandler.parseError(err, 'MS_3813_TRAMITES_UPDATE', `${API_BASE}/tramites/update/${this.formTramite.id}`);
            this.formError = `${appErr.title}: ${appErr.message}`;
            this.cdr.detectChanges();
          }
        });
    } else {
      // Crear Trámite (POST /tramites/create?client_id=...)
      this.http.post<Tramite>(`${API_BASE}/tramites/create?client_id=${this.clientId}`, this.formTramite)
        .subscribe({
          next: () => {
            this.successMsg = 'El trámite ha sido registrado exitosamente.';
            setTimeout(() => {
              this.successMsg = '';
              this.cdr.detectChanges();
            }, 5000);
            this.cerrarModal();
            this.obtenerTramites();
          },
          error: (err) => {
            const appErr = this.errorHandler.parseError(err, 'MS_3812_TRAMITES_CREATE', `${API_BASE}/tramites/create`);
            this.formError = `${appErr.title}: ${appErr.message}`;
            this.cdr.detectChanges();
          }
        });
    }
  }

  eliminarTramite(id: number): void {
    this.tramiteToDeleteId = id;
    this.deleteModalOpen = true;
    this.cdr.detectChanges();
  }

  cerrarConfirmarEliminar(): void {
    this.deleteModalOpen = false;
    this.tramiteToDeleteId = null;
    this.cdr.detectChanges();
  }

  confirmarEliminar(): void {
    if (this.tramiteToDeleteId !== null) {
      const id = this.tramiteToDeleteId;
      this.http.delete(`${API_BASE}/tramites/delete/${id}?client_id=${this.clientId}`)
        .subscribe({
          next: () => {
            this.successMsg = 'El trámite ha sido eliminado correctamente.';
            setTimeout(() => {
              this.successMsg = '';
              this.cdr.detectChanges();
            }, 5000);
            this.cerrarConfirmarEliminar();
            this.obtenerTramites();
          },
          error: (err) => {
            this.currentError = this.errorHandler.parseError(err, 'MS_3814_TRAMITES_DELETE', `${API_BASE}/tramites/delete/${id}`);
            this.cerrarConfirmarEliminar();
            this.cdr.detectChanges();
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
    this.cdr.detectChanges();
  }
}
