import { Component, OnInit, inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_BASE, CLIENT_ID } from '../core/config/api.config';
import { ErrorHandlerService, AppError } from '../core/services/error-handler.service';
import { NxAlertComponent } from '../shared/components/alert/alert.component';

interface TarjetaSociedad {
  id: number;
  client_id?: number;
  tipo_tarjeta: string;
  codigo: string;
  expediente: number;
  solicitante: string; // Razón Social
  documento: string; // NIT
  matricula: string; // N.° Registro
  correo: string;
  representante: string; // Representante Legal
  tarjeta: string;
  fecha: string;
}

@Component({
  selector: 'app-tarjetas-sociedades',
  standalone: true,
  imports: [CommonModule, FormsModule, NxAlertComponent],
  templateUrl: './tarjetas-sociedades.component.html',
  styleUrl: './tarjetas-sociedades.component.css'
})
export class TarjetasSociedadesComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private errorHandler = inject(ErrorHandlerService);
  clientId: number = CLIENT_ID;

  tarjetas: TarjetaSociedad[] = [];
  loading: boolean = false;
  currentError: AppError | null = null;

  // Filtros y Buscador
  searchQuery: string = '';
  filterColumn: string = '';
  filterValue: string = '';
  pageSize: number = 10;
  currentPage: number = 1;

  // Modal Detalle y Tarjeta Digital
  selectedTarjeta: TarjetaSociedad | null = null;
  isDetailModalOpen: boolean = false;
  isCardModalOpen: boolean = false;

  // Semilla QR para simular matriz dinámica
  qrSeed: number = 0.8;

  // Control de vistas (listado, emision-individual, emision-masiva, historial)
  vistaActiva: 'listado' | 'emision-individual' | 'emision-masiva' | 'historial' = 'listado';
  selectedTarjetaHistorial: any = null;

  // Variables para la creación de tarjeta (Emisión individual)
  nuevaIdentificacion: string = '';
  busquedaRealizada: boolean = false;
  cargandoBusqueda: boolean = false;
  datosConsulta: any = null;
  mensajeExito: string = '';
  mensajeError: string = '';

  // Variables para Emisión Masiva
  bulkFile: File | null = null;
  bulkResultText: string = '';
  bulkResultClass: string = 'bulk-result';

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void {
    this.loading = true;
    this.currentError = null;
    this.http.get<TarjetaSociedad[]>(`${API_BASE}/tarjetas/list?tipo_tarjeta=sociedades&client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.tarjetas = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar tarjetas de sociedades:', err);
          this.currentError = this.errorHandler.parseError(err, 'MS_3830_TARJETAS_GET', `${API_BASE}/tarjetas/list`);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // Filtrado reactivo
  get filteredTarjetas(): TarjetaSociedad[] {
    return this.tarjetas.filter(t => {
      const matchSearch = !this.searchQuery ||
        t.solicitante.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.documento.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.matricula.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.representante.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.codigo.toLowerCase().includes(this.searchQuery.toLowerCase());

      let matchColumn = true;
      if (this.filterColumn && this.filterValue) {
        const val = this.filterValue.toLowerCase();
        if (this.filterColumn === 'razonSocial') {
          matchColumn = t.solicitante.toLowerCase().includes(val);
        } else if (this.filterColumn === 'nit') {
          matchColumn = t.documento.toLowerCase().includes(val);
        } else if (this.filterColumn === 'registro') {
          matchColumn = t.matricula.toLowerCase().includes(val);
        } else if (this.filterColumn === 'representante') {
          matchColumn = t.representante.toLowerCase().includes(val);
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

  get paginatedTarjetas(): TarjetaSociedad[] {
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

  abrirDetalle(t: TarjetaSociedad): void {
    this.selectedTarjeta = t;
    this.isDetailModalOpen = true;
  }

  cerrarDetalle(): void {
    this.isDetailModalOpen = false;
    this.selectedTarjeta = null;
  }

  abrirTarjeta(t: TarjetaSociedad): void {
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

  // Métodos para Emisión Individual (Nueva tarjeta de sociedad)
  abrirNuevaTarjeta(): void {
    this.vistaActiva = 'emision-individual';
    this.nuevaIdentificacion = '';
    this.busquedaRealizada = false;
    this.datosConsulta = null;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  cerrarNuevaTarjeta(): void {
    this.vistaActiva = 'listado';
    this.nuevaIdentificacion = '';
    this.busquedaRealizada = false;
    this.datosConsulta = null;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  // Métodos para Emisión Masiva (Sociedades)
  abrirEmisionMasiva(): void {
    this.vistaActiva = 'emision-masiva';
    this.bulkFile = null;
    this.bulkResultText = '';
    this.bulkResultClass = 'bulk-result';
  }

  cerrarEmisionMasiva(): void {
    this.vistaActiva = 'listado';
    this.bulkFile = null;
    this.bulkResultText = '';
    this.bulkResultClass = 'bulk-result';
  }

  seleccionarArchivo(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.bulkFile = files[0];
    } else {
      this.bulkFile = null;
    }
  }

  descargarPlantillaCSV(): void {
    const header = "nit\n";
    const example = "900123456-7\n";
    const blob = new Blob([header + example], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plantilla_emision_sociedades.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  procesarEmisionMasiva(): void {
    if (!this.bulkFile) {
      this.bulkResultText = "Seleccione un archivo CSV o TXT antes de procesar.";
      this.bulkResultClass = "bulk-result visible error";
      return;
    }

    if (!/\.(csv|txt)$/i.test(this.bulkFile.name)) {
      this.bulkResultText = "El archivo debe tener extensión .csv o .txt.";
      this.bulkResultClass = "bulk-result visible error";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      const rows = fileContent.split(/\r?\n/).filter(row => row.trim());
      const records = Math.max(0, rows.length - 1);

      if (!records) {
        this.bulkResultText = "La plantilla no contiene registros para procesar.";
        this.bulkResultClass = "bulk-result visible error";
        return;
      }

      this.bulkResultText = `Archivo validado: ${records} sociedades listas para emisión. La integración con el backend procesará duplicados, errores y notificaciones.`;
      this.bulkResultClass = "bulk-result visible";
      this.cdr.detectChanges();
    };
    reader.onerror = () => {
      this.bulkResultText = "No fue posible leer el archivo seleccionado.";
      this.bulkResultClass = "bulk-result visible error";
      this.cdr.detectChanges();
    };
    reader.readAsText(this.bulkFile);
  }

  consultarSociedad(): void {
    const identification = this.nuevaIdentificacion.trim();
    if (!identification) {
      this.mensajeError = "Ingrese el NIT de la sociedad.";
      return;
    }
    this.mensajeError = '';
    this.mensajeExito = '';
    this.cargandoBusqueda = true;

    // Buscar en tarjetas locales si ya existe por NIT/documento
    const row = this.tarjetas.find(item =>
      item.documento.replace(/\D/g, '') === identification.replace(/\D/g, '')
    );

    if (row) {
      this.datosConsulta = {
        razonSocial: row.solicitante,
        nit: row.documento,
        registro: row.matricula,
        expediente: row.expediente,
        correo: row.correo || `contacto.${identification.slice(-4)}@example.com`,
        representante: row.representante || "Representante Legal Registrado",
        resolucion: `Resolución ${row.id.toString().padStart(4, '0')} de 2026`,
        existe: true
      };
    } else {
      // Datos simulados idénticos a la plantilla
      this.datosConsulta = {
        razonSocial: "Sociedad de Contadores Consultada",
        nit: identification,
        registro: "SOC-" + identification.slice(-6).padStart(6, '0'),
        expediente: Math.floor(100000 + Math.random() * 900000),
        correo: `contacto.${identification.slice(-4)}@example.com`,
        representante: "Representante Legal Simulado",
        resolucion: `Resolución ${identification.slice(-4)} de 2026`,
        existe: false
      };
    }

    this.busquedaRealizada = true;
    this.cargandoBusqueda = false;
    this.cdr.detectChanges();
  }

  confirmarEmision(): void {
    if (!this.datosConsulta) return;

    this.loading = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const payload = {
      tipo_tarjeta: "sociedades",
      codigo: `TJS-${new Date().getTime()}-${this.datosConsulta.registro.replace(/\D/g, '')}`,
      expediente: this.datosConsulta.expediente,
      solicitante: this.datosConsulta.razonSocial,
      documento: this.datosConsulta.nit,
      matricula: this.datosConsulta.registro,
      correo: this.datosConsulta.correo,
      representante: this.datosConsulta.representante,
      tarjeta: "Activa",
      fecha: new Date().toISOString().split('T')[0],
      client_id: this.clientId
    };

    this.http.post(`${API_BASE}/tarjetas/create?client_id=${this.clientId}`, payload)
      .subscribe({
        next: (response) => {
          this.mensajeExito = "Emisión confirmada correctamente.";
          this.loading = false;
          this.cargarTarjetas();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al emitir tarjeta de sociedad:', err);
          const appErr = this.errorHandler.parseError(err, 'MS_3831_TARJETAS_CREATE', `${API_BASE}/tarjetas/create`);
          this.mensajeError = `${appErr.title}: ${appErr.message}`;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // Variables y métodos para menú desplegable de acciones
  activeMenuId: number | null = null;

  toggleActionsMenu(event: Event, id: number): void {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.activeMenuId = null;
  }

  abrirHistorial(t: TarjetaSociedad): void {
    this.selectedTarjeta = t;
    this.vistaActiva = 'historial';
    this.selectedTarjetaHistorial = null;
    this.http.get(`${API_BASE}/tarjetas/historial/${t.id}?client_id=${this.clientId}`)
      .subscribe({
        next: (res) => {
          this.selectedTarjetaHistorial = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar historial de la tarjeta de sociedad:', err);
          this.currentError = this.errorHandler.parseError(err, 'MS_3832_TARJETAS_HISTORIAL', `${API_BASE}/tarjetas/historial/${t.id}`);
          this.cdr.detectChanges();
        }
      });
  }

  cerrarHistorial(): void {
    this.vistaActiva = 'listado';
    this.selectedTarjeta = null;
    this.selectedTarjetaHistorial = null;
  }
}
