import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="view">
      <header class="page-header">
        <div>
          <h1>Módulo en Construcción</h1>
          <p>Esta sección estará disponible próximamente en la plataforma.</p>
        </div>
      </header>
      
      <div class="empty-state-container">
        <div class="empty-state-card">
          <div class="empty-state-icon">🚧</div>
          <h3>Próximamente</h3>
          <p>Estamos trabajando activamente en el desarrollo de esta sección para el portal de la Junta Central de Contadores.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .empty-state-container {
      padding: 60px 22px;
      display: flex;
      justify-content: center;
    }
    .empty-state-card {
      background: #fff;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 40px 30px;
      max-width: 450px;
      width: 100%;
      text-align: center;
    }
    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .empty-state-card h3 {
      margin: 0 0 10px 0;
      color: #0c3158;
      font-size: 18px;
    }
    .empty-state-card p {
      margin: 0;
      color: #6c757d;
      font-size: 13px;
      line-height: 1.5;
    }
  `]
})
export class PlaceholderComponent {}
