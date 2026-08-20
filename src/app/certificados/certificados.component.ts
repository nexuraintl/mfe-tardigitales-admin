import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface Certificado {
  id: number;
  client_id: number;
  expediente: number;
  titular: string;
  documento: string;
  matricula: string;
  correo: string;
  archivo_pdf: string;
  fecha_generacion: string;
}

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificados.component.html'
})
export class CertificadosComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  clientId: number = 20002;
  certificados: Certificado[] = [];
  loading: boolean = false;

  // Búsqueda y paginación
  searchQuery: string = '';
  pageSize: number = 10;
  currentPage: number = 1;

  ngOnInit(): void {
    this.cargarCertificados();
  }

  cargarCertificados(): void {
    this.loading = true;
    this.http.get<Certificado[]>(`https://preproduccion-tardigitales.nexura.com/apig/tardigitales/certificados?client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.certificados = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar certificados:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  get filteredCertificados(): Certificado[] {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) return this.certificados;
    return this.certificados.filter(c =>
      c.titular.toLowerCase().includes(query) ||
      c.documento.toLowerCase().includes(query) ||
      c.matricula.toLowerCase().includes(query) ||
      String(c.expediente).includes(query)
    );
  }

  get paginatedCertificados(): Certificado[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCertificados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCertificados.length / this.pageSize) || 1;
  }

  get recordRangeStart(): number {
    return this.filteredCertificados.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get recordRangeEnd(): number {
    const end = this.currentPage * this.pageSize;
    return Math.min(end, this.filteredCertificados.length);
  }

  cambiarPagina(p: number): void {
    if (p >= 1 && p <= this.totalPages) {
      this.currentPage = p;
      this.cdr.detectChanges();
    }
  }

  exportarCSV(): void {
    const headers = "No,Expediente,Titular,Documento,Matricula,Correo,Fecha\n";
    const rows = this.filteredCertificados.map((c, idx) =>
      `${idx + 1},${c.expediente},"${c.titular}",${c.documento},${c.matricula},${c.correo || ''},${c.fecha_generacion}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificados_generados.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  descargarPdf(c: Certificado): void {
    // Generar un PDF mock simple sobre la marcha
    const content = `Junta Central de Contadores\nCertificado de Vigencia y Antecedentes Disciplinarios\n\nExpediente: ${c.expediente}\nTitular: ${c.titular}\nDocumento: ${c.documento}\nMatrícula/Registro: ${c.matricula}\nFecha: ${c.fecha_generacion}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Certificado_${c.expediente}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
}
