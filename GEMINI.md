# Proyecto: CitaLink Frontend

## Resumen del Proyecto

Este es el frontend de CitaLink, una aplicación web diseñada para ayudar a las clínicas a gestionar y asegurar sus citas mediante enlaces de pago de anticipos.

El proyecto está construido con:

*   **Framework:** Next.js (v15)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **Componentes de UI:** Probablemente se usa shadcn/ui, basado en el uso de Radix UI (`@radix-ui/*`) y `lucide-react`.

La arquitectura sigue la estructura estándar del App Router de Next.js.

## Configuraciones Específicas

### Idioma

*   **Todas las interacciones, configuraciones y respuestas deben ser en español.**

### Atlassian MCP (Jira)

Al interactuar con las herramientas de Atlassian, utiliza los siguientes Cloud IDs:
*   **Instancia Personal:** `b8875c38-7e3c-4bb7-bc1f-f869f539a377`
*   **Organización Upex-Galaxy:** `e7975fd7-55bc-430a-8e25-560375493dd7`
*   **Autenticación:** La autenticación debe realizarse siempre bajo demanda. No asumas una sesión preexistente.

### Supabase

*   **Project ID:** El ID del proyecto de Supabase para esta aplicación es `ogvaibogcfwvodfzjhze`.

## Construcción y Ejecución

### Prerrequisitos

*   Node.js (v18 o superior recomendado)
*   Gestor de paquetes pnpm

### Comandos Clave

*   **Instalar Dependencias:**
    ```bash
    pnpm install
    ```

*   **Ejecutar Servidor de Desarrollo:**
    Inicia la aplicación en `http://localhost:3000`.
    ```bash
    pnpm run dev
    ```

*   **Construir para Producción:**
    ```bash
    pnpm run build
    ```

*   **Ejecutar Servidor de Producción:**
    ```bash
    pnpm run start
    ```

*   **Verificar Código (Lint):**
    ```bash
    pnpm run lint
    ```

## Convenciones de Desarrollo

*   **Estilo de Código:** El proyecto utiliza la configuración de linting estándar de Next.js (`next lint`) para asegurar la calidad del código.
*   **Alias de Rutas:** El proyecto está configurado con un alias de ruta `@/*` que apunta al directorio `./src/*`, el cual debe usarse para importaciones más limpias.
*   **Desarrollo de UI:** La interfaz de usuario se construye con Tailwind CSS para los estilos, con un tema personalizado definido en `tailwind.config.ts`. Los componentes parecen estar basados en los principios de shadcn/ui, aprovechando Radix UI para la accesibilidad y `lucide-react` para los iconos.
*   **Variables de Entorno:** Se debe crear un archivo `.env.local` copiando `.env.example` para gestionar las variables específicas del entorno.
