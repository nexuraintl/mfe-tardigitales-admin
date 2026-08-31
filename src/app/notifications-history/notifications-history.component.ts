import { Component, OnInit, OnDestroy, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { API_BASE, CLIENT_ID } from '../core/config/api.config';
import { ErrorHandlerService, AppError } from '../core/services/error-handler.service';
import { NxAlertComponent } from '../shared/components/alert/alert.component';

interface NotificationItem {
  id: number;
  client_id?: number;
  titulo: string;
  canal: string;
  audiencia: string;
  destinatarios: number;
  fecha: string;
  estado: 'Entregada' | 'Programada' | 'Fallida' | 'En proceso';
  creadoPor: string;
  mensaje?: string;
}

@Component({
  selector: 'app-notifications-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NxAlertComponent],
  templateUrl: './notifications-history.component.html',
  styleUrl: './notifications-history.component.css'
})
export class NotificationsHistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private errorHandler = inject(ErrorHandlerService);
  clientId: number = CLIENT_ID;

  notificaciones: NotificationItem[] = [];
  currentError: AppError | null = null;
  private dtInstance: any = null;
  private customFilterFn: any = null;

  // Filtros
  searchQuery: string = '';
  selectedChannel: string = '';
  selectedStatus: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  // Detalle de Notificación (Modal)
  selectedNotification: NotificationItem | null = null;
  isModalOpen: boolean = false;

  irACrearNotificacion(): void {
    this.router.navigate(['/crear-notificacion']);
  }

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  ngAfterViewInit(): void {
    this.ensureDataTablesLoaded();
  }

  ngOnDestroy(): void {
    this.destroyDataTable();
    if (this.customFilterFn && (window as any).DataTable?.ext?.search) {
      const idx = (window as any).DataTable.ext.search.indexOf(this.customFilterFn);
      if (idx !== -1) {
        (window as any).DataTable.ext.search.splice(idx, 1);
      }
    }
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

  isTableReady = true;

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
        const tableEl = document.getElementById('tablaHistorial');
        if (!tableEl) return;

        const dtConstructor = (window as any).DataTable;
        if (typeof dtConstructor === 'function') {
          // Registrar filtro personalizado conectado con la barra de filtros robusta
          if (!this.customFilterFn && dtConstructor.ext?.search) {
            this.customFilterFn = (settings: any, data: any, dataIndex: number) => {
              if (settings.nTable.id !== 'tablaHistorial') return true;
              const item = this.notificaciones[dataIndex];
              if (!item) return true;

              // Búsqueda por texto (título, creador, audiencia)
              if (this.searchQuery) {
                const q = this.searchQuery.toLowerCase();
                const match = (item.titulo && item.titulo.toLowerCase().includes(q)) ||
                              (item.creadoPor && item.creadoPor.toLowerCase().includes(q)) ||
                              (item.audiencia && item.audiencia.toLowerCase().includes(q));
                if (!match) return false;
              }

              // Filtro por canal
              if (this.selectedChannel && item.canal !== this.selectedChannel) {
                return false;
              }

              // Filtro por estado
              if (this.selectedStatus && item.estado !== this.selectedStatus) {
                return false;
              }

              // Filtro por fecha desde / hasta
              if (this.dateFrom || this.dateTo) {
                const nDateStr = item.fecha ? item.fecha.substring(0, 10) : '';
                if (this.dateFrom && (!nDateStr || nDateStr < this.dateFrom)) return false;
                if (this.dateTo && (!nDateStr || nDateStr > this.dateTo)) return false;
              }

              return true;
            };
            dtConstructor.ext.search.push(this.customFilterFn);
          }

          this.dtInstance = new dtConstructor('#tablaHistorial', {
            pageLength: 10,
            responsive: true,
            order: [[5, 'desc']], // Ordenar por fecha y hora descendente por defecto
            language: {
              search: "",
              lengthMenu: "Mostrar _MENU_ registros",
              info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
              infoEmpty: "Mostrando 0 a 0 de 0 registros",
              infoFiltered: "(filtrado de _MAX_ registros totales)",
              zeroRecords: "No se encontraron notificaciones con los filtros seleccionados",
              paginate: {
                first: "««",
                last: "»»",
                next: "»",
                previous: "«"
              }
            },
            layout: {
              topStart: null, // Ocultar el buscador propio de DataTables para usar el buscador robusto
              topEnd: 'pageLength',
              bottomStart: 'info',
              bottomEnd: 'paging'
            }
          });
        }
      }, 50);
    });
  }

  trackByNotifId(index: number, item: NotificationItem): number | string {
    return item.id || index;
  }

  cargarNotificaciones(): void {
    this.destroyDataTable();
    this.isTableReady = false;
    this.currentError = null;
    this.cdr.detectChanges();

    const ts = new Date().getTime();
    this.http.get<NotificationItem[]>(`${API_BASE}/notificaciones/list?client_id=${this.clientId}&_t=${ts}`)
      .subscribe({
        next: (data) => {
          this.notificaciones = [...(data || [])];
          this.isTableReady = true;
          this.cdr.detectChanges();
          setTimeout(() => {
            this.initDataTable();
          }, 60);
        },
        error: (err) => {
          console.error('Error al cargar notificaciones de la API:', err);
          this.currentError = this.errorHandler.parseError(err, 'MS_3820_NOTIFICACIONES_GET', `${API_BASE}/notificaciones/list`);
          this.isTableReady = true;
          this.cdr.detectChanges();
        }
      });
  }

  onFilterChange(): void {
    if (this.dtInstance) {
      this.dtInstance.draw();
    }
  }

  limpiarFiltros(): void {
    this.searchQuery = '';
    this.selectedChannel = '';
    this.selectedStatus = '';
    this.dateFrom = '';
    this.dateTo = '';
    if (this.dtInstance) {
      this.dtInstance.draw();
    }
    this.cdr.detectChanges();
  }

  // Estadísticas calculadas de manera global
  get totalCount(): number {
    return this.notificaciones.length;
  }

  get deliveredCount(): number {
    return this.notificaciones.filter(n => n.estado === 'Entregada').length;
  }

  get scheduledCount(): number {
    return this.notificaciones.filter(n => n.estado === 'Programada').length;
  }

  get failedCount(): number {
    return this.notificaciones.filter(n => n.estado === 'Fallida').length;
  }

  get filteredNotifications(): NotificationItem[] {
    return this.notificaciones.filter(n => {
      const matchSearch = !this.searchQuery ||
        (n.titulo && n.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (n.creadoPor && n.creadoPor.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (n.audiencia && n.audiencia.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const matchChannel = !this.selectedChannel || n.canal === this.selectedChannel;
      const matchStatus = !this.selectedStatus || n.estado === this.selectedStatus;

      let matchDate = true;
      if (this.dateFrom || this.dateTo) {
        const nDateStr = n.fecha ? n.fecha.substring(0, 10) : '';
        if (this.dateFrom && (!nDateStr || nDateStr < this.dateFrom)) matchDate = false;
        if (this.dateTo && (!nDateStr || nDateStr > this.dateTo)) matchDate = false;
      }

      return matchSearch && matchChannel && matchStatus && matchDate;
    });
  }

  verDetalle(notificacion: NotificationItem): void {
    this.selectedNotification = notificacion;
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }

  exportarCSV(): void {
    if (!this.filteredNotifications || this.filteredNotifications.length === 0) {
      alert('No hay registros para exportar');
      return;
    }
    const headers = ['ID', 'Título', 'Canal', 'Audiencia', 'Destinatarios', 'Fecha', 'Estado', 'Creado Por'];
    const rows = this.filteredNotifications.map((n: NotificationItem) => [
      n.id,
      `"${(n.titulo || '').replace(/"/g, '""')}"`,
      `"${n.canal}"`,
      `"${n.audiencia}"`,
      n.destinatarios,
      `"${n.fecha}"`,
      `"${n.estado}"`,
      `"${n.creadoPor}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e: any[]) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `historial_notificaciones_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
