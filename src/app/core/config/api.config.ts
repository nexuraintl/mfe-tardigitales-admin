/**
 * Ruta base para el API Gateway / Microservicio de Tarjetas Digitales.
 * Al ser una ruta relativa (/apig/tardigitales), el navegador antepondrá automáticamente
 * el dominio en el que esté corriendo la aplicación (Local, Preproducción o Producción).
 */
export const API_BASE = '/apig/tardigitales';

/**
 * Obtiene el ID del cliente / entidad de forma dinámica.
 * Permite que nxPlatform o el contenedor HTML inyecte `window.APP_CONFIG.clientId`
 * o use el valor por defecto configurado (20001).
 */
export function getClientId(): number {
  const globalClientId = (window as any).APP_CONFIG?.clientId;
  if (globalClientId && !isNaN(Number(globalClientId))) {
    return Number(globalClientId);
  }
  return 20001;
}

export const CLIENT_ID: number = getClientId();
