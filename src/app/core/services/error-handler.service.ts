import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES, ErrorMessageKey, ErrorMessageDefinition } from '../constants/error-messages.constants';

export interface AppError {
  code: string;
  title: string;
  message: string;
  httpStatus: number;
  suggestion?: string;
  timestamp: Date;
  endpoint?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  
  /**
   * Procesa un error HTTP y retorna un objeto de error estandarizado según la serie MS-38XX.
   */
  public parseError(
    error: unknown,
    contextKey?: ErrorMessageKey,
    endpointHint?: string
  ): AppError {
    let status = 0;
    let endpoint = endpointHint || '';
    let serverDetail = '';

    if (error instanceof HttpErrorResponse) {
      status = error.status;
      if (!endpoint && error.url) {
        try {
          const urlObj = new URL(error.url, window.location.origin);
          endpoint = urlObj.pathname;
        } catch {
          endpoint = error.url;
        }
      }
      if (error.error && typeof error.error === 'object' && error.error.message) {
        serverDetail = error.error.message;
      }
    } else if (error && typeof error === 'object' && 'status' in error) {
      status = (error as any).status || 0;
    }

    // Determinar la definición de mensaje a utilizar
    let def: ErrorMessageDefinition;

    if (status === 0) {
      def = ERROR_MESSAGES.MS_3800_NO_CONNECTION;
    } else if (status === 502 || status === 503 || status === 504) {
      def = ERROR_MESSAGES.MS_3801_GATEWAY_TIMEOUT;
    } else if (status === 401 || status === 403) {
      def = ERROR_MESSAGES.MS_3802_UNAUTHORIZED;
    } else if (status === 400 && serverDetail && serverDetail.toLowerCase().includes('client_id')) {
      def = ERROR_MESSAGES.MS_3803_INVALID_CLIENT;
    } else if (contextKey && ERROR_MESSAGES[contextKey]) {
      def = ERROR_MESSAGES[contextKey];
    } else if (status === 404) {
      def = ERROR_MESSAGES.MS_3806_NOT_FOUND;
    } else if (status === 500) {
      def = ERROR_MESSAGES.MS_3804_DATABASE_ERROR;
    } else {
      def = ERROR_MESSAGES.MS_3800_NO_CONNECTION;
    }

    // Formatear plantilla
    const endpointLabel = endpoint ? ` ${endpoint}` : '';
    const statusLabel = status > 0 ? `${status}` : 'Sin conexión';
    const formattedMessage = def.template
      .replace('{endpoint}', endpointLabel)
      .replace('{status}', statusLabel);

    return {
      code: def.code,
      title: `${def.title} ${def.code}`,
      message: formattedMessage,
      httpStatus: status,
      suggestion: def.suggestion,
      timestamp: new Date(),
      endpoint: endpoint
    };
  }

  /**
   * Genera el texto estándar de alerta para compatibilidad o soporte técnico.
   */
  public formatErrorMessage(
    error: unknown,
    contextKey?: ErrorMessageKey,
    endpointHint?: string
  ): string {
    const err = this.parseError(error, contextKey, endpointHint);
    let output = `${err.title}\n${err.message}`;
    if (err.suggestion) {
      output += `\n\n${err.suggestion}`;
    }
    return output;
  }
}
