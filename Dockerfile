# Etapa 1: Construcción de la aplicación
FROM node:22-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servidor web con Nginx (imagen non-root, requerida por Cloud Run)
FROM nginxinc/nginx-unprivileged:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build --chown=nginx:nginx /app/dist/jcc-portal/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run enruta al puerto 8080 por defecto
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
