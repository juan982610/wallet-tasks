# Wallet Tasks

Una aplicación web moderna para la gestión de finanzas personales y proyectos. Desarrollada con las últimas tecnologías del ecosistema React.

## Características Principales

- **Gestión de Transacciones**: 
  - Registro detallado de ingresos y gastos (categoría, banco, fecha, notas).
  - Filtrado avanzado por tipo, categoría, banco y rango de fechas.
  - Búsqueda en tiempo real.
  - Soporte para expresiones matemáticas en el campo de monto (ej: `=50+20`).
  
- **Proyecciones Financieras**: 
  - Módulo dedicado para crear y visualizar proyecciones.
  - Comparativa de valores proyectados vs ingresados.

- **Dashboard Interactivo**: 
  - Tarjetas de resumen (KPIs) para Balance, Ingresos y Gastos.
  - Interfaz limpia con soporte para **Modo Oscuro**.

## Tecnologías Utilizadas

Este proyecto está construido con un stack moderno y potente:

- **[React 19](https://react.dev/)**: Biblioteca principal para la interfaz de usuario.
- **[Vite](https://vitejs.dev/)**: Herramienta de construcción y servidor de desarrollo rápido.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework de utilidades para el diseño.
- **[React Router 7](https://reactrouter.com/)**: Enrutamiento declarativo del lado del cliente.

## Primeros Pasos

### Prerrequisitos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Crea la versión optimizada para producción.
- `npm run preview`: Previsualiza la build de producción localmente.
- `npm run lint`: Ejecuta ESLint para buscar problemas en el código.
