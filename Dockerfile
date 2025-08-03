FROM node:20

WORKDIR /app

# Copiamos el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

#Instalar dependencias de Node.js
RUN npm install

# Copiamos todo el código fuente
COPY . .

#Exponer el puerto 3000
EXPOSE 3000 

# Comando para iniciar el servidor
CMD ["npm", "start"]

