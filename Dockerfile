# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia solo los archivos necesarios primero (aprovecha cache de Docker)
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila NestJS a JS en /dist
RUN npm run build

# Etapa 2: Run
FROM node:20-alpine

WORKDIR /app

# Copia solo los package.json para instalar prod deps
COPY --from=builder /app/package*.json ./

# Instala solo dependencias necesarias para producción
RUN npm install --only=production

# Copia los archivos compilados de la etapa build
COPY --from=builder /app/dist ./dist

# Expone el puerto
EXPOSE 3000

# 👇 Importante: Nest debe escuchar en 0.0.0.0 dentro del contenedor
CMD ["node", "dist/main.js"]
