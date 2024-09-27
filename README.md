# NOC Project

Este es el repositorio del proyecto NOC. Aquí encontrarás toda la información necesaria para entender y configurar el entorno de desarrollo.

## Configuración del Entorno de Desarrollo

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Git

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/NOC.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd NOC
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Levantar el docker-compose:
   ```bash
   docker-compose up -d
   ```
5. Crea un archivo `.env` en la raíz del proyecto con las variables de entorno disponibles en el archivo `.env.template`.
6. Generar el cliente de prisma:
   ```bash
   npx prisma migrate dev
   ```

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm test`: Ejecuta las pruebas.

### Estructura del Proyecto

- `src/`: Código fuente del proyecto.
- `logs/`: Logs de la aplicación.
