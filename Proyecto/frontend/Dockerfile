# Usar la imagen de Node.js
FROM node:16

# Crear y usar el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
