import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications-history.component.html',
  styleUrl: './notifications-history.component.css'
})
export class NotificationsHistoryComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private clientId: number = 20002;
  
  notificaciones: NotificationItem[] = [];

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    this.http.get<NotificationItem[]>(`http://localhost:8000/api/notificaciones?client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.notificaciones = data;
          this.cdr.detectChanges(); // Forzar el renderizado en entornos sin Zone.js (Zoneless)
        },
        error: (err) => {
          console.error('Error al cargar notificaciones de la API:', err);
        }
      });
  }

  // Filtros
  searchQuery: string = '';
  selectedChannel: string = '';
  selectedStatus: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  // Detalle de Notificación (Modal)
  selectedNotification: NotificationItem | null = null;
  isModalOpen: boolean = false;

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

  // Filtrado reactivo en tiempo real con blindaje contra valores nulos
  get filteredNotifications(): NotificationItem[] {
    return this.notificaciones.filter(n => {
      const matchSearch = !this.searchQuery || 
        (n.titulo && n.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (n.creadoPor && n.creadoPor.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (n.audiencia && n.audiencia.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const matchChannel = !this.selectedChannel || n.canal === this.selectedChannel;
      const matchStatus = !this.selectedStatus || n.estado === this.selectedStatus;
      
      // Filtrado por fecha seguro
      let matchDate = true;
      if (this.dateFrom || this.dateTo) {
        const nDateStr = n.fecha ? n.fecha.substring(0, 10) : '';
        if (this.dateFrom && (!nDateStr || nDateStr < this.dateFrom)) matchDate = false;
        if (this.dateTo && (!nDateStr || nDateStr > this.dateTo)) matchDate = false;
      }

      return matchSearch && matchChannel && matchStatus && matchDate;
    });
  }

  limpiarFiltros(): void {
    this.searchQuery = '';
    this.selectedChannel = '';
    this.selectedStatus = '';
    this.dateFrom = '';
    this.dateTo = '';
  }

  verDetalle(notificacion: NotificationItem): void {
    this.selectedNotification = notificacion;
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }
}
