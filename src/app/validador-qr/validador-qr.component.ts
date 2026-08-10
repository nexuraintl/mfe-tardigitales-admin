import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validador-qr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validador-qr.component.html'
})
export class ValidadorQrComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  clientId: number = 20002;
  loading: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  // Configuración de campos
  config = {
    val_foto: true,
    val_nombres: true,
    val_matricula: true,
    val_numero_identificacion: false,
    val_codigo_tarjeta: true,
    val_estado: true
  };

  ngOnInit(): void {
    this.cargarConfiguracion();
  }

  cargarConfiguracion(): void {
    this.loading = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    this.http.get<any>(`http://localhost:8000/api/validador-qr/config?client_id=${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.config = {
            val_foto: data.val_foto === 1,
            val_nombres: data.val_nombres === 1,
            val_matricula: data.val_matricula === 1,
            val_numero_identificacion: data.val_numero_identificacion === 1,
            val_codigo_tarjeta: data.val_codigo_tarjeta === 1,
            val_estado: data.val_estado === 1
          };
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar config de validador:', err);
          this.mensajeError = 'No fue posible cargar la configuración desde el servidor.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  guardarConfiguracion(): void {
    this.loading = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const payload = {
      client_id: this.clientId,
      val_foto: this.config.val_foto ? 1 : 0,
      val_nombres: this.config.val_nombres ? 1 : 0,
      val_matricula: this.config.val_matricula ? 1 : 0,
      val_numero_identificacion: this.config.val_numero_identificacion ? 1 : 0,
      val_codigo_tarjeta: this.config.val_codigo_tarjeta ? 1 : 0,
      val_estado: this.config.val_estado ? 1 : 0
    };

    this.http.post('http://localhost:8000/api/validador-qr/config', payload)
      .subscribe({
        next: (res: any) => {
          this.mensajeExito = 'Configuración guardada correctamente.';
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al guardar config de validador:', err);
          this.mensajeError = 'Error al guardar la configuración en el servidor.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  volver(): void {
    this.router.navigate(['/contadores']);
  }
}
