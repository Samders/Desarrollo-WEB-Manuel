# Usar la imagen de Node.js
FROM node:16

# Crear y usar el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto
EXPOSE 5000

# Iniciar la aplicación
CMD ["node", "src/app.js"]
