import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MenuSection, UserProfile, AppTile, PrimaryAction } from './shared/nexura-layout/types';

export interface HeaderAction {
  id: string;
  label: string;
  icon?: string;
  btnClass?: string;
  action?: () => void;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App implements OnInit {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  currentUrl = (typeof window !== 'undefined' && window.location.pathname) ? window.location.pathname : '';
  pageTitle = 'Tarjeta Digital para Contadores';
  activeComponent: any = null;
  viewActions: HeaderAction[] = [];

  private routeTitles: { [key: string]: string } = {
    '/tarjetas-contadores': 'Tarjeta Digital para Contadores',
    '/sociedades': 'Tarjeta Digital para Sociedades',
    '/historial': 'Historial de Notificaciones',
    '/crear-notificacion': 'Crear Notificación',
    '/crud': 'Gestión de Trámites',
    '/validador-qr': 'Campos del Validador QR',
    '/certificados': 'Certificados Oficiales',
    '/reportes': 'Reportes',
    '/branding': 'Branding',
    '/auditoria': 'Auditoría API',
    '/usuarios': 'Usuarios'
  };

  // Configuración del usuario para el shell
  currentUser: UserProfile = {
    name: 'Fabian Vargas',
    email: 'fvargas@nexura.com',
    role: 'Administrador',
    initials: 'FV'
  };

  // Acción principal destacada sobre el sidebar (configurable y opcional por vista)
  primaryAction: PrimaryAction | null = null;

  // Configuración de aplicaciones globales en el topbar
  appGrid: AppTile[] = [
    { id: 'tarjetas', name: 'Tarjetas', color: 'blue', iconClass: 'fa fa-id-card', path: '/tarjetas-contadores', active: true },
    { id: 'sociedades', name: 'Sociedades', color: 'cyan', iconClass: 'fa fa-building-o', path: '/sociedades' },
    { id: 'notificaciones', name: 'Notificaciones', color: 'orange', iconClass: 'fa fa-bell', path: '/crear-notificacion' },
    { id: 'tramites', name: 'Trámites', color: 'green', iconClass: 'fa fa-tasks', path: '/crud' },
    { id: 'reportes', name: 'Reportes', color: 'purple', iconClass: 'fa fa-bar-chart', path: '/reportes' },
    { id: 'validador', name: 'Validador QR', color: 'dark', iconClass: 'fa fa-qrcode', path: '/validador-qr' }
  ];

  menuSections: MenuSection[] = [
    {
      sectionTitle: 'Gestión principal',
      items: [
        {
          id: 'grupo-tarjetas',
          label: 'Tarjetas',
          icon: 'fa fa-id-card',
          children: [
            { label: 'Tarjetas Contadores', icon: 'fa fa-user', path: '/tarjetas-contadores' },
            { label: 'Tarjetas Sociedades', icon: 'fa fa-building-o', path: '/sociedades' }
          ]
        },
        {
          id: 'grupo-notificaciones',
          label: 'Notificaciones',
          icon: 'fa fa-bell',
          children: [
            { label: 'Crear notificación', icon: 'fa fa-paper-plane', path: '/crear-notificacion' },
            { label: 'Historial de notificaciones', icon: 'fa fa-history', path: '/historial' }
          ]
        },
        { label: 'Gestión de Trámites (CRUD)', icon: 'fa fa-tasks', path: '/crud' }
      ]
    },
    {
      sectionTitle: 'Administración',
      items: [
        { label: 'Reportes', icon: 'fa fa-bar-chart', path: '/reportes' },
        { label: 'Certificados', icon: 'fa fa-certificate', path: '/certificados' },
        { label: 'Branding', icon: 'fa fa-paint-brush', path: '/branding' },
        { label: 'Validador QR', icon: 'fa fa-qrcode', path: '/validador-qr' },
        { label: 'Auditoría API', icon: 'fa fa-shield', path: '/auditoria' },
        { label: 'Usuarios', icon: 'fa fa-users', path: '/usuarios' }
      ]
    }
  ];

  ngOnInit(): void {
    this.currentUrl = (typeof window !== 'undefined' && window.location.pathname) ? window.location.pathname : this.router.url;
    this.updatePageTitle(this.currentUrl);
    this.updateViewActions(this.currentUrl);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.urlAfterRedirects || window.location.pathname;
        this.updatePageTitle(this.currentUrl);
        this.updateViewActions(this.currentUrl);
        this.cdr.detectChanges();
      });
  }

  onRouteActivate(componentInstance: any): void {
    this.activeComponent = componentInstance;
    this.currentUrl = (typeof window !== 'undefined' && window.location.pathname) ? window.location.pathname : this.router.url;
    this.updatePageTitle(this.currentUrl);
    this.updateViewActions(this.currentUrl);
    this.cdr.detectChanges();
  }

  private updatePageTitle(url: string) {
    const cleanUrl = url.split('?')[0].split('#')[0];
    const match = Object.keys(this.routeTitles).find(route => cleanUrl.endsWith(route) || cleanUrl.includes(route));
    if (match) {
      this.pageTitle = this.routeTitles[match];
    }
  }

  private updateViewActions(url: string) {
    const cleanUrl = url.split('?')[0].split('#')[0];
    if (cleanUrl.includes('tarjetas-contadores')) {
      this.primaryAction = {
        label: 'Nueva tarjeta',
        icon: 'fa fa-plus',
        action: () => this.activeComponent?.abrirNuevaTarjeta?.()
      };
      this.viewActions = [
        {
          id: 'exportar-csv',
          label: 'Exportar CSV',
          icon: 'fa fa-download',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.exportarCSV?.()
        },
        {
          id: 'emision-masiva',
          label: 'Emisión masiva',
          icon: 'fa fa-file-excel-o',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.abrirEmisionMasiva?.()
        }
      ];
    } else if (cleanUrl.includes('sociedades')) {
      this.primaryAction = {
        label: 'Nueva tarjeta',
        icon: 'fa fa-plus',
        action: () => this.activeComponent?.abrirNuevaTarjeta?.()
      };
      this.viewActions = [
        {
          id: 'exportar-csv',
          label: 'Exportar CSV',
          icon: 'fa fa-download',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.exportarCSV?.()
        },
        {
          id: 'emision-masiva',
          label: 'Emisión masiva',
          icon: 'fa fa-file-excel-o',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.abrirEmisionMasiva?.()
        }
      ];
    } else if (cleanUrl.includes('crud')) {
      this.primaryAction = null;
      this.viewActions = [
        {
          id: 'actualizar-tramites',
          label: 'Actualizar',
          icon: 'fa fa-refresh',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.obtenerTramites?.()
        },
        {
          id: 'nuevo-tramite',
          label: 'Nuevo trámite',
          icon: 'fa fa-plus',
          btnClass: 'btn btn-primary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.abrirCrear?.()
        }
      ];
    } else if (cleanUrl.includes('historial')) {
      this.primaryAction = null;
      this.viewActions = [
        {
          id: 'exportar-csv',
          label: 'Exportar CSV',
          icon: 'fa fa-download',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.exportarCSV?.()
        },
        {
          id: 'nueva-notificacion',
          label: 'Nueva notificación',
          icon: 'fa fa-plus',
          btnClass: 'btn btn-primary px-3 py-2 fw-semibold',
          action: () => this.navegarA('/crear-notificacion')
        }
      ];
    } else if (cleanUrl.includes('crear-notificacion')) {
      this.primaryAction = null;
      this.viewActions = [
        {
          id: 'ver-historial',
          label: 'Ver historial',
          icon: 'fa fa-history',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.navegarA('/historial')
        }
      ];
    } else if (cleanUrl.includes('certificados')) {
      this.primaryAction = null;
      this.viewActions = [
        {
          id: 'exportar-csv',
          label: 'Exportar CSV',
          icon: 'fa fa-download',
          btnClass: 'btn btn-outline-secondary px-3 py-2 fw-semibold',
          action: () => this.activeComponent?.exportarCSV?.()
        }
      ];
    } else {
      this.primaryAction = null;
      this.viewActions = [];
    }
  }

  navegarA(path: string): void {
    if (!path) return;
    this.currentUrl = path;
    this.updatePageTitle(path);
    this.updateViewActions(path);
    this.cdr.detectChanges();
    this.router.navigateByUrl(path);
  }

  ejecutarAccion(action: HeaderAction): void {
    if (action.action) {
      action.action();
      this.cdr.detectChanges();
    }
  }

  // Manejo de eventos emitidos por el Web Component de Lit
  onNavigate(event: CustomEvent): void {
    const path = event.detail?.path;
    if (path) {
      this.navegarA(path);
    }
  }

  onAppChange(event: CustomEvent): void {
    const app = event.detail?.app;
    if (app?.path) {
      this.navegarA(app.path);
    }
  }

  onPrimaryAction(event: CustomEvent): void {
    const actionObj = this.primaryAction || event.detail?.action;
    console.log('[MFE] Acción principal solicitada:', actionObj);
    if (typeof actionObj?.action === 'function') {
      actionObj.action();
      this.cdr.detectChanges();
    } else if (actionObj?.path) {
      this.navegarA(actionObj.path);
    }
  }

  onBack(): void {
    if (this.activeComponent && typeof this.activeComponent.volver === 'function') {
      this.activeComponent.volver();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      this.navegarA('/tarjetas-contadores');
    }
  }

  onProfileAction(event: CustomEvent): void {
    const action = event.detail?.action;
    console.log('[MFE] Acción de perfil solicitada:', action);
    if (action === 'logout') {
      alert('Cerrando sesión...');
    }
  }
}
