# CitaLink - Frontend

Este es el repositorio del frontend para CitaLink, una aplicación web para ayudar a las clínicas a gestionar y asegurar sus citas mediante enlaces de pago de anticipo.

Construido con Next.js, TailwindCSS, y TypeScript.

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm

## Cómo Empezar

1.  **Clonar el repositorio:**
    ```bash
    git clone <repository-url>
    cd citalink-frontend
    ```

2.  **Instalar dependencias:**
    Usa `pnpm` para instalar todas las dependencias del proyecto.
    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno:**
    Copia el archivo de ejemplo `.env.example` a un nuevo archivo llamado `.env.local` y completa las variables necesarias.
    ```bash
    cp .env.example .env.local
    ```

4.  **Ejecutar el servidor de desarrollo:**
    Inicia la aplicación en modo de desarrollo.
    ```bash
    pnpm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Scripts Disponibles

- `pnpm run dev`: Inicia el servidor de desarrollo.
- `pnpm run build`: Compila la aplicación para producción.
- `pnpm run start`: Inicia el servidor de producción (después de un `build`).
- `pnpm run lint`: Ejecuta el linter de Next.js para verificar la calidad del código.
