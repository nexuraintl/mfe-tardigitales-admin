import { Component, OnInit, inject, ChangeDetectorRef, HostListener } from '@angular/core';
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
    this.http.get<TarjetaContador[]>(`https://preproduccion-tardigitales.nexura.com/apig/tardigitales/tarjetas?tipo_tarjeta=contadores&client_id=${this.clientId}`)
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

  // Métodos para Emisión Individual (Nueva tarjeta)
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

  // Métodos para Emisión Masiva
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
    const header = "numero_identificacion\n";
    const example = "1023456789\n";
    const blob = new Blob([header + example], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plantilla_emision_contadores.csv";
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

      this.bulkResultText = `Archivo validado: ${records} contadores listos para emisión. La integración con el backend procesará duplicados, errores y notificaciones.`;
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

  consultarMatricula(): void {
    const identification = this.nuevaIdentificacion.trim();
    if (!identification) {
      this.mensajeError = "Ingrese el número de identificación.";
      return;
    }
    this.mensajeError = '';
    this.mensajeExito = '';
    this.cargandoBusqueda = true;

    // Buscar en tarjetas locales si ya existe
    const row = this.tarjetas.find(item =>
      item.documento.replace(/\D/g, '') === identification.replace(/\D/g, '')
    );

    if (row) {
      this.datosConsulta = {
        solicitante: row.solicitante,
        documento: row.documento,
        matricula: row.matricula,
        expediente: row.expediente,
        correo: row.correo || `contador.${identification.slice(-4)}@example.com`,
        universidad: "Universidad Nacional de Colombia",
        existe: true
      };
    } else {
      // Datos simulados idénticos a la plantilla
      this.datosConsulta = {
        solicitante: "Contador Público Consultado",
        documento: `CC ${identification}`,
        matricula: "TP " + identification.slice(-6).padStart(6, '0'),
        expediente: Math.floor(100000 + Math.random() * 900000),
        correo: `contador.${identification.slice(-4)}@example.com`,
        universidad: "Universidad Nacional de Colombia",
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
      tipo_tarjeta: "contadores",
      codigo: `TJM-${new Date().getTime()}-${this.datosConsulta.matricula.replace(/\D/g, '')}`,
      expediente: this.datosConsulta.expediente,
      solicitante: this.datosConsulta.solicitante,
      documento: this.datosConsulta.documento,
      matricula: this.datosConsulta.matricula,
      correo: this.datosConsulta.correo,
      representante: null,
      tarjeta: "Activa",
      fecha: new Date().toISOString().split('T')[0],
      client_id: this.clientId
    };

    this.http.post('https://preproduccion-tardigitales.nexura.com/apig/tardigitales/tarjetas', payload)
      .subscribe({
        next: (response) => {
          this.mensajeExito = "Emisión confirmada correctamente.";
          this.loading = false;
          this.cargarTarjetas();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al emitir tarjeta:', err);
          this.mensajeError = "Error al emitir la tarjeta en el servidor.";
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

  abrirHistorial(t: TarjetaContador): void {
    this.selectedTarjeta = t;
    this.vistaActiva = 'historial';
    this.selectedTarjetaHistorial = null;
    this.http.get(`https://preproduccion-tardigitales.nexura.com/apig/tardigitales/tarjetas/${t.id}/historial?client_id=${this.clientId}`)
      .subscribe({
        next: (res) => {
          this.selectedTarjetaHistorial = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar historial de la tarjeta:', err);
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
