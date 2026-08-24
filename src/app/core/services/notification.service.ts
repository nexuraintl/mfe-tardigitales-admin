import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppError } from './error-handler.service';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  code?: string;
  suggestion?: string;
  durationMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toasts$ = new BehaviorSubject<ToastMessage[]>([]);

  public getToasts(): Observable<ToastMessage[]> {
    return this.toasts$.asObservable();
  }

  public showSuccess(message: string, title: string = 'Operación Exitosa', durationMs: number = 4000): void {
    this.addToast({
      id: Math.random().toString(36).substring(2, 9),
      type: 'success',
      title,
      message,
      durationMs
    });
  }

  public showError(appError: AppError | string, title?: string, durationMs: number = 8000): void {
    if (typeof appError === 'string') {
      this.addToast({
        id: Math.random().toString(36).substring(2, 9),
        type: 'error',
        title: title || 'Error del Sistema',
        message: appError,
        durationMs
      });
    } else {
      this.addToast({
        id: Math.random().toString(36).substring(2, 9),
        type: 'error',
        title: appError.title,
        message: appError.message,
        code: appError.code,
        suggestion: appError.suggestion,
        durationMs
      });
    }
  }

  public showWarning(message: string, title: string = 'Advertencia', durationMs: number = 5000): void {
    this.addToast({
      id: Math.random().toString(36).substring(2, 9),
      type: 'warning',
      title,
      message,
      durationMs
    });
  }

  public removeToast(id: string): void {
    const current = this.toasts$.getValue();
    this.toasts$.next(current.filter(t => t.id !== id));
  }

  private addToast(toast: ToastMessage): void {
    const current = this.toasts$.getValue();
    this.toasts$.next([...current, toast]);

    if (toast.durationMs && toast.durationMs > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, toast.durationMs);
    }
  }
}
