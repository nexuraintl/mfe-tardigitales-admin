import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppError } from '../../../core/services/error-handler.service';

@Component({
  selector: 'nx-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="visible && (error || message)" 
      class="alert alert-dismissible fade show d-flex align-items-center gap-3 mb-4 shadow-sm" 
      [ngClass]="'alert-' + (error ? 'danger' : (type === 'error' ? 'danger' : type))"
      role="alert"
    >
      <div class="flex-shrink-0 d-flex align-items-center justify-content-center fs-5">
        <span *ngIf="(error || type === 'danger' || type === 'error')" class="fa fa-exclamation-triangle"></span>
        <span *ngIf="type === 'success'" class="fa fa-check-circle"></span>
        <span *ngIf="type === 'warning'" class="fa fa-exclamation-circle"></span>
        <span *ngIf="type === 'info'" class="fa fa-info-circle"></span>
      </div>

      <div class="flex-grow-1">
        <h6 *ngIf="displayTitle" class="alert-heading fw-bold mb-1">{{ displayTitle }}</h6>
        <div class="mb-0">{{ displayMessage }}</div>
        <div *ngIf="displaySuggestion" class="small mt-2 pt-1 border-top border-secondary border-opacity-25 opacity-75">
          {{ displaySuggestion }}
        </div>
      </div>

      <button *ngIf="dismissible" type="button" class="btn-close position-relative p-2 ms-auto me-0 my-0" (click)="close()" aria-label="Cerrar"></button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .alert {
      border-radius: 10px;
      padding: 0.85rem 1.25rem;
    }
  `]
})
export class NxAlertComponent {
  @Input() type: 'danger' | 'error' | 'success' | 'warning' | 'info' = 'danger';
  @Input() title?: string;
  @Input() message?: string;
  @Input() suggestion?: string;
  @Input() error?: AppError | null = null;
  @Input() dismissible: boolean = true;
  @Output() onClose = new EventEmitter<void>();

  visible: boolean = true;

  get displayTitle(): string {
    if (this.error) return this.error.title;
    return this.title || '';
  }

  get displayMessage(): string {
    if (this.error) return this.error.message;
    return this.message || '';
  }

  get displaySuggestion(): string | undefined {
    if (this.error) return this.error.suggestion;
    return this.suggestion;
  }

  close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}
