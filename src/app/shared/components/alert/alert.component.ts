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
      class="nx-alert" 
      [ngClass]="'nx-alert-' + (error ? 'danger' : type)"
      role="alert"
    >
      <div class="nx-alert-icon">
        <span *ngIf="(error || type === 'danger' || type === 'error')" class="fa fa-exclamation-triangle"></span>
        <span *ngIf="type === 'success'" class="fa fa-check-circle"></span>
        <span *ngIf="type === 'warning'" class="fa fa-exclamation-circle"></span>
        <span *ngIf="type === 'info'" class="fa fa-info-circle"></span>
      </div>

      <div class="nx-alert-body">
        <strong *ngIf="displayTitle" class="nx-alert-title">{{ displayTitle }}</strong>
        <div class="nx-alert-message">{{ displayMessage }}</div>
        <small *ngIf="displaySuggestion" class="nx-alert-suggestion">{{ displaySuggestion }}</small>
      </div>

      <button *ngIf="dismissible" type="button" class="nx-alert-close" (click)="close()" title="Cerrar">
        ×
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .nx-alert {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 4px;
      margin: 0 22px 14px 22px !important;
      border: 1px solid transparent;
      border-left-width: 4px;
      font-size: 13px;
      line-height: 1.45;
      box-sizing: border-box;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Danger / Error */
    .nx-alert-danger, .nx-alert-error {
      background-color: #fce8e6;
      border-color: #fad2cf;
      border-left-color: #d93025;
      color: #5f1411;
    }
    .nx-alert-danger .nx-alert-icon, .nx-alert-error .nx-alert-icon {
      color: #d93025;
    }
    .nx-alert-danger .nx-alert-title, .nx-alert-error .nx-alert-title {
      color: #c5221f;
    }

    /* Success */
    .nx-alert-success {
      background-color: #e6f4ea;
      border-color: #ceead6;
      border-left-color: #188038;
      color: #0d652d;
    }
    .nx-alert-success .nx-alert-icon {
      color: #188038;
    }
    .nx-alert-success .nx-alert-title {
      color: #137333;
    }

    /* Warning */
    .nx-alert-warning {
      background-color: #fef7e0;
      border-color: #feefc3;
      border-left-color: #f29900;
      color: #7c4a00;
    }
    .nx-alert-warning .nx-alert-icon {
      color: #ea8600;
    }

    /* Info */
    .nx-alert-info {
      background-color: #e8f0fe;
      border-color: #d2e3fc;
      border-left-color: #1a73e8;
      color: #174ea6;
    }
    .nx-alert-info .nx-alert-icon {
      color: #1a73e8;
    }

    .nx-alert-icon {
      font-size: 16px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .nx-alert-body {
      flex: 1;
      min-width: 0;
    }

    .nx-alert-title {
      display: block;
      font-size: 13.5px;
      font-weight: 700;
      margin-bottom: 3px;
    }

    .nx-alert-message {
      word-break: break-word;
    }

    .nx-alert-suggestion {
      display: block;
      margin-top: 6px;
      opacity: 0.85;
      font-size: 12px;
      border-top: 1px dashed rgba(0, 0, 0, 0.1);
      padding-top: 4px;
    }

    .nx-alert-close {
      background: transparent;
      border: none;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      color: inherit;
      opacity: 0.6;
      padding: 0 4px;
      margin-left: auto;
    }

    .nx-alert-close:hover {
      opacity: 1;
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
