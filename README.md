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
4. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   ```bash
   PORT=3000
   MAILER_EMAIL=
   MAILER_SECRET_KEY=
   DEV=
   PROD=
   ```

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm test`: Ejecuta las pruebas.

### Estructura del Proyecto

- `src/`: Código fuente del proyecto.
- `logs/`: Logs de la aplicación.
