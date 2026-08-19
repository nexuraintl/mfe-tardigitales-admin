# Manual del servicio — prem-mfetardigitales-notificaciones

> Nota de alcance: este repositorio es un **microfrontend Angular** (SPA estática servida por Nginx), no un microservicio FastAPI. Sigue el estándar de gobernanza GOB-GCP-STD-01 en lo que aplica a Cloud Run/CI-CD/observabilidad, pero no tiene `api/`, lógica de negocio en backend, ni endpoints REST — ver sección 8 para el detalle de las adaptaciones.

## 1. Descripción funcional

| Campo | Valor |
|---|---|
| Nombre del repo | `mfe_tardigitales_admin` (Azure DevOps) / `mfe-tardigitales-admin` (mirror GitHub) |
| Nombre del servicio Cloud Run | `prem-mfetardigitales-notificaciones` |
| Tipo | Microfrontend Angular (SPA), admin |
| Módulo / dominio | Tardigitales — Notificaciones |
| Propósito | Panel de administración para gestión de notificaciones y trámites tardigitales: creación de notificaciones, historial, certificados, validación de códigos QR, CRUD de trámites y tarjetas de contadores/sociedades. |
| Responsable funcional | `[PENDIENTE — indicar dueño de producto/negocio]` |
| Responsable técnico / integración de despliegue | Santiago Valenzuela (`svalenzuela@nexura.com`) |

## 2. Arquitectura

| Campo | Valor |
|---|---|
| Proyecto GCP | `pre-qa-functions` |
| Ambiente | Preproducción |
| Región | `us-central1` |
| Servicio Cloud Run | `prem-mfetardigitales-notificaciones` |
| URL pública | https://prem-mfetardigitales-notificaciones-ghlnutfdwq-uc.a.run.app |
| Exposición | **Directa y pública** — sin API Gateway. Decisión explícita para este servicio (a diferencia de `prem-web-clientes`/`prem-web-asesores`, que sí están detrás de `api-gateway@pre-qa-functions.iam.gserviceaccount.com`). Ver sección 5. |
| Servidor de contenido | Nginx (`nginxinc/nginx-unprivileged:alpine`), sirviendo el build estático de Angular |
| Backend consumido | Ninguno integrado todavía — los componentes actuales no llaman a ninguna API externa. El backend natural por convención de nombres sería `ms_tardigitales_notificaciones` (repo ADO `Nexura Platform Microservicios`), pero la integración no está cableada en el código a la fecha de este documento. |
| Artifact Registry | `us-central1-docker.pkg.dev/pre-qa-functions/cloud-run-source-deploy/mfe-tardigitales-admin/prem-mfetardigitales-notificaciones` |

## 3. Rutas de la aplicación

No aplica el concepto de "endpoints REST" — es una SPA con enrutamiento del lado del cliente (Angular Router). Rutas definidas en `src/app/app.routes.ts`:

| Ruta | Componente | Estado |
|---|---|---|
| `/` | redirige a `historial` | — |
| `/historial` | `NotificationsHistoryComponent` | Implementado |
| `/crud` | `TramitesCrudComponent` | Implementado |
| `/tarjetas-contadores` | `TarjetasContadoresComponent` | Implementado |
| `/sociedades` | `TarjetasSociedadesComponent` | Implementado |
| `/crear-notificacion` | `CrearNotificacionComponent` | Implementado |
| `/certificados` | `CertificadosComponent` | Implementado |
| `/validador-qr` | `ValidadorQrComponent` | Implementado |
| `/reportes` | `PlaceholderComponent` | Pendiente |
| `/branding` | `PlaceholderComponent` | Pendiente |
| `/auditoria` | `PlaceholderComponent` | Pendiente |
| `/usuarios` | `PlaceholderComponent` | Pendiente |
| `/construccion` | `PlaceholderComponent` | Fallback |
| `**` (no encontrada) | redirige a `tarjetas-contadores` | — |

Endpoints de infraestructura servidos por Nginx (equivalentes a `/health`/`/version` del estándar):

| Ruta | Descripción |
|---|---|
| `GET /health` | Retorna `{"status":"UP"}`. Sin autenticación. Usado para health checks. |

## 4. Variables y secretos

No hay variables de entorno de negocio ni secretos en uso actualmente — es contenido estático sin backend propio.

| Variable | Uso | Origen |
|---|---|---|
| `NODE_ENV` | Definida en `docker-compose.yml` para uso local (`production`) | No usada en runtime del contenedor final (Nginx no la lee) |

No hay `.env`, ni integración con Secret Manager. Si en el futuro el MFE consume una API (p. ej. `ms_tardigitales_notificaciones`), la URL base debería inyectarse en build-time (vía `src/environments/`) o en runtime (script de arranque que genere un `env.js` a partir de variables del contenedor), y documentarse aquí.

## 5. IAM

| Cuenta de servicio | Rol | Uso |
|---|---|---|
| `58937908768-compute@developer.gserviceaccount.com` | Runtime del servicio Cloud Run (`run-sa`) y ejecución de Cloud Build (`deploy-sa`) | Cuenta de servicio de cómputo por defecto del proyecto — mismo patrón usado por el resto de servicios `prem-*`/`qa-*` en `pre-qa-functions`. No hay separación run-sa/deploy-sa dedicada en este proyecto. |
| `allUsers` | `roles/run.invoker` | Acceso público directo a la URL del servicio (sin autenticación), por decisión explícita para este MFE. |

## 6. Despliegue

**Pipeline:** Azure DevOps (`.azure-pipeline.yml`) → mirror a `github.com/nexuraintl/mfe-tardigitales-admin` → trigger de Cloud Build (`trigger-prem-mfetardigitales-notificaciones`, push a `master`) → build + push a Artifact Registry + deploy a Cloud Run (`cloudbuild.yaml`).

| Parámetro | Valor |
|---|---|
| Rama que dispara despliegue | `master` |
| Build config | `cloudbuild.yaml` (raíz del repo) |
| CPU | 1 vCPU (1000m) |
| Memoria | 512 Mi |
| Concurrencia por instancia | 80 |
| Min instancias | 0 (default) |
| Max instancias | 100 (default, sin override) |
| Startup CPU boost | Activado |
| Ingress | Todo el tráfico (`all`), `--allow-unauthenticated` |

Otros ambientes (`dev`, `qa`, `main`) están contemplados en el trigger de `.azure-pipeline.yml` para sincronizar el mirror, pero **no tienen trigger de Cloud Build creado todavía** — solo existe el de `master` → `prem-mfetardigitales-notificaciones`. Si se requiere un ambiente QA (`qa-mfetardigitales-notificaciones` o similar) hay que crear un trigger adicional análogo con `--branch-pattern="^qa$"`.

## 7. Observabilidad

- Logs de acceso y error de Nginx van a stdout/stderr del contenedor → Cloud Logging automáticamente.
- Filtro sugerido en Cloud Logging:
  ```
  resource.type="cloud_run_revision"
  resource.labels.service_name="prem-mfetardigitales-notificaciones"
  ```
- Los logs de Nginx **no están en formato JSON estructurado** (a diferencia del estándar de logging de los microservicios FastAPI con `severity`/`trace`/`correlation_id`) — son el formato de log de acceso/error por defecto de Nginx. No hay correlación de trace entre requests todavía.
- No hay métricas de negocio propias; se depende de las métricas estándar de Cloud Run (latencia, instancias, tasa de errores 5xx).

## 8. Adaptaciones frente al estándar GOB-GCP-STD-01

Este servicio es un microfrontend, no un microservicio FastAPI, por lo que las siguientes partes del estándar **no aplican** o se adaptan:

| Elemento del estándar | Adaptación |
|---|---|
| `api/`, `core/config.py`, `core/logging.py`, `core/middleware.py` | No aplica — no hay backend propio, es contenido estático. |
| Logging JSON con `severity`/`trace`/`correlation_id` | No implementado — logs de Nginx en formato estándar. Pendiente si se justifica la necesidad. |
| Endpoints `/v1/...` | No aplica — no hay API de negocio en este repo. |
| `requirements.txt` / `requirements-dev.txt` | Reemplazado por `package.json` (Node/Angular). |
| Ingress `internal-and-cloud-load-balancing` detrás de API Gateway | **Deliberadamente no aplicado** — este servicio es público y de acceso directo por decisión de producto. Puede revisarse en el futuro para exigir token (IAM invoker) si cambia el requerimiento. |
| `run-sa`/`deploy-sa` dedicadas | No implementado — usa la cuenta de servicio de cómputo por defecto, igual que el resto de servicios del proyecto `pre-qa-functions`. |
