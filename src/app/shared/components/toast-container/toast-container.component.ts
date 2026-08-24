import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, ToastMessage } from '../../../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nx-toast-container">
      <div 
        *ngFor="let toast of toasts$ | async" 
        class="nx-toast" 
        [ngClass]="'nx-toast-' + toast.type"
      >
        <div class="nx-toast-icon">
          <span *ngIf="toast.type === 'error'" class="fa fa-exclamation-triangle"></span>
          <span *ngIf="toast.type === 'success'" class="fa fa-check-circle"></span>
          <span *ngIf="toast.type === 'warning'" class="fa fa-exclamation-circle"></span>
          <span *ngIf="toast.type === 'info'" class="fa fa-info-circle"></span>
        </div>

        <div class="nx-toast-content">
          <div class="nx-toast-title">
            {{ toast.title }}
          </div>
          <div class="nx-toast-message">
            {{ toast.message }}
          </div>
          <div class="nx-toast-suggestion" *ngIf="toast.suggestion">
            <small>{{ toast.suggestion }}</small>
          </div>
        </div>

        <button 
          type="button" 
          class="nx-toast-close" 
          (click)="notificationService.removeToast(toast.id)"
        >
          ×
        </button>
      </div>
    </div>
  `,
  styles: [`
    .nx-toast-container {
      position: fixed;
      top: 68px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 420px;
      width: 100%;
      pointer-events: none;
    }

    .nx-toast {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      border-left: 4px solid #6c757d;
      animation: slideIn 0.25s ease;
      font-size: 13px;
      line-height: 1.4;
      box-sizing: border-box;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .nx-toast-error {
      border-left-color: #dc3545;
      background: #fff8f8;
    }

    .nx-toast-error .nx-toast-icon {
      color: #dc3545;
    }

    .nx-toast-success {
      border-left-color: #28a745;
      background: #f8fff9;
    }

    .nx-toast-success .nx-toast-icon {
      color: #28a745;
    }

    .nx-toast-warning {
      border-left-color: #ffc107;
      background: #fffdf5;
    }

    .nx-toast-warning .nx-toast-icon {
      color: #d39e00;
    }

    .nx-toast-icon {
      font-size: 18px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .nx-toast-content {
      flex: 1;
    }

    .nx-toast-title {
      font-weight: 700;
      color: #212529;
      margin-bottom: 3px;
    }

    .nx-toast-message {
      color: #495057;
      word-break: break-word;
    }

    .nx-toast-suggestion {
      color: #6c757d;
      margin-top: 6px;
      border-top: 1px dashed #e9ecef;
      padding-top: 4px;
    }

    .nx-toast-close {
      background: transparent;
      border: none;
      font-size: 20px;
      color: #adb5bd;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .nx-toast-close:hover {
      color: #495057;
    }
  `]
})
export class NxToastContainerComponent implements OnInit {
  toasts$: Observable<ToastMessage[]>;

  constructor(public notificationService: NotificationService) {
    this.toasts$ = this.notificationService.getToasts();
  }

  ngOnInit(): void {}
}
