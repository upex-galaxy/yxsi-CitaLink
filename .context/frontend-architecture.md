# Arquitectura Frontend - CitaLink

**Generado:** Fase 3.3 - Frontend Setup
**Fecha:** 20 de Noviembre de 2025
**Framework:** Next.js 15.5.6 (App Router)

---

## 📋 Resumen Ejecutivo

CitaLink utiliza **Next.js 15 con App Router**, **React 19**, y **TypeScript** para crear una aplicación web moderna y type-safe que permite a las clínicas gestionar citas con enlaces de pago de anticipo.

**Stack Tecnológico Principal:**
- **Framework:** Next.js 15.5.6 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.9.3
- **Styling:** Tailwind CSS 3.4.18
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React
- **Package Manager:** pnpm

---

## 🏗️ Estructura del Proyecto

```
/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout (tema, providers)
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Estilos globales + Tailwind
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard de clínica
│   │   └── citas/
│   │       └── page.tsx         # Vista de citas
│   │
│   ├── components/
│   │   ├── ui/                  # Componentes UI reutilizables
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── dialog.tsx       # ✨ NUEVO
│   │   │   ├── textarea.tsx     # ✨ NUEVO
│   │   │   ├── select.tsx       # ✨ NUEVO
│   │   │   ├── skeleton.tsx     # ✨ NUEVO
│   │   │   ├── toast.tsx        # ✨ NUEVO
│   │   │   ├── toaster.tsx      # ✨ NUEVO
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── badge.tsx
│   │   │   └── avatar.tsx
│   │   │
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Navbar.tsx       # Barra de navegación superior
│   │   │   ├── Sidebar.tsx      # Navegación lateral
│   │   │   └── LayoutWrapper.tsx # Wrapper principal
│   │   │
│   │   └── theme-provider.tsx   # Provider de tema (dark/light)
│   │
│   ├── lib/                     # Utilidades y helpers
│   │   ├── utils.ts            # cn() function, helpers
│   │   ├── database.types.ts   # 🔗 Tipos generados del backend
│   │   └── types.ts            # 🔗 Type helpers para componentes
│   │
│   └── hooks/                   # Custom React hooks
│       └── use-toast.ts        # Hook para sistema de toasts
│
├── public/                      # Assets estáticos
├── .context/                    # Documentación del proyecto
│   ├── design-system.md        # Design system completo
│   ├── frontend-architecture.md # Este archivo
│   ├── PRD/                    # Product Requirements
│   ├── SRS/                    # Software Requirements
│   └── PBI/                    # Product Backlog
│
├── tailwind.config.ts          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
├── next.config.mjs             # Configuración de Next.js
├── postcss.config.mjs          # Configuración de PostCSS
├── package.json                # Dependencias del proyecto
└── pnpm-lock.yaml              # Lock file de pnpm
```

---

## 🔗 Integración Backend-Frontend

### Tipos TypeScript Sincronizados

**Flujo de tipos:**
```
Backend (Supabase) → database.types.ts → types.ts → Componentes React
```

**1. Tipos generados del backend:**
- **Archivo:** `src/lib/database.types.ts`
- **Origen:** Generado desde Supabase schema (o mockeado para desarrollo)
- **Contiene:** Tipos de todas las tablas (users, clinics, appointments)

**2. Type helpers para frontend:**
- **Archivo:** `src/lib/types.ts`
- **Propósito:** Extraer tipos específicos para uso en componentes

**Ejemplo:**
```typescript
// src/lib/types.ts
import type { Database } from './database.types'

export type User = Database['public']['Tables']['users']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type Clinic = Database['public']['Tables']['clinics']['Row']

export type ApiResponse<T> = {
  data: T | null
  error: string | null
}
```

**Beneficios:**
- ✅ Zero type mismatches entre backend y frontend
- ✅ Autocomplete en componentes
- ✅ Refactoring seguro (cambios en schema se reflejan automáticamente)
- ✅ Prevención de bugs en producción

---

## 🎨 Sistema de Diseño

### Paleta de Colores

**Definida en:** `src/app/globals.css` como variables CSS HSL

**Colores principales:**
- **Primary:** Verde profesional (`142.1 76.2% 36.3%`)
- **Secondary:** Gris claro (`220 14.3% 95.9%`)
- **Accent:** Gris claro (`220 14.3% 95.9%`)
- **Destructive:** Rojo (`0 84.2% 60.2%`)

**Modo oscuro:** Soportado via `next-themes` con variables CSS adaptadas

**Ver:** `.context/design-system.md` para paleta completa

---

### Componentes UI

**Base:** Radix UI + shadcn/ui pattern
**Total:** 12 componentes base

**Componentes esenciales:**
1. **Button** - Botones con 6 variantes y 4 tamaños
2. **Card** - Contenedores de información
3. **Input** - Campos de formulario
4. **Label** - Etiquetas de formulario
5. **Dialog** - Modales y confirmaciones
6. **Textarea** - Áreas de texto multi-línea
7. **Select** - Selectores desplegables
8. **Skeleton** - Loading states
9. **Toast** - Notificaciones
10. **Dropdown Menu** - Menús contextuales
11. **Badge** - Etiquetas de estado
12. **Avatar** - Imágenes de perfil

**Patrón de uso:**
```tsx
import { Button } from "@/components/ui/button"
import type { Appointment } from "@/lib/types"

// Type-safe component con datos del backend
const MyComponent = ({ appt }: { appt: Appointment }) => {
  return <Button>Confirmar {appt.patient_name}</Button>
}
```

---

## 🚀 Routing (Next.js App Router)

### Estructura de Rutas

```
app/
├── page.tsx                 → /              (Home)
├── dashboard/
│   └── page.tsx            → /dashboard     (Dashboard de clínica)
└── citas/
    └── page.tsx            → /citas         (Vista de citas)
```

### Características del App Router

- **Server Components por defecto:** Renderizado en servidor
- **Client Components:** Marcados con `"use client"`
- **Layouts anidados:** `layout.tsx` envuelve páginas hijas
- **Loading states:** Usando `loading.tsx` (por implementar)
- **Error boundaries:** Usando `error.tsx` (por implementar)

---

## 📦 Gestión de Estado

### Estado Local
**Herramienta:** React `useState`, `useReducer`
**Uso:** Estado de UI (modals, forms, toggles)

### Estado del Servidor
**Próximo:** Supabase real-time subscriptions (Fase 7)
**Patrón:** Server Components + Server Actions

### Estado Global (Tema)
**Herramienta:** `next-themes`
**Archivo:** `src/components/theme-provider.tsx`
**Uso:** Dark/Light mode

---

## 🎯 Patrones de Desarrollo

### 1. Type-Safe Components

**SIEMPRE usar tipos del backend:**
```tsx
// ✅ CORRECTO
import type { Appointment } from "@/lib/types"

const AppointmentCard = ({ appt }: { appt: Appointment }) => {
  return <div>{appt.patient_name}</div>
}

// ❌ INCORRECTO
const AppointmentCard = ({ appt }: { appt: any }) => {
  return <div>{appt.patient_name}</div>
}
```

---

### 2. Component Composition

**Usar componentes del design system:**
```tsx
// ✅ CORRECTO
import { Button } from "@/components/ui/button"

<Button variant="default">Crear Cita</Button>

// ❌ INCORRECTO
<button className="bg-blue-500 px-4 py-2">Crear Cita</button>
```

---

### 3. Estilos con Tailwind

**Usar clases de Tailwind + paleta definida:**
```tsx
// ✅ CORRECTO
<div className="bg-primary text-primary-foreground p-4">
  Contenido
</div>

// ❌ INCORRECTO
<div style={{ backgroundColor: '#10B981', color: 'white', padding: '16px' }}>
  Contenido
</div>
```

---

### 4. Server vs Client Components

**Server Components (por defecto):**
- Fetch de datos
- Renderizado estático
- SEO-friendly

**Client Components (`"use client"`):**
- Interactividad (onClick, onChange)
- Hooks de React (useState, useEffect)
- Browser APIs

```tsx
// Server Component (por defecto)
async function DashboardPage() {
  const data = await fetchData() // Fetch en servidor
  return <Dashboard data={data} />
}

// Client Component
"use client"
import { useState } from "react"

function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

---

## 🔧 Configuraciones Clave

### Next.js Config
**Archivo:** `next.config.mjs`

```js
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;
```

**Características:**
- React Strict Mode habilitado
- Configuración básica (expandible según necesidades)

---

### Tailwind Config
**Archivo:** `tailwind.config.ts`

**Características:**
- Dark mode: `class` (via next-themes)
- Content paths: `src/**/*.{ts,tsx}`
- Tema extendido con paleta personalizada
- Plugin: `tailwindcss-animate`

---

### TypeScript Config
**Archivo:** `tsconfig.json`

**Características clave:**
- `jsx: "react-jsx"` (Next.js optimizado)
- `moduleResolution: "bundler"`
- Path alias: `@/*` → `./src/*`
- Strict mode habilitado

---

## 📚 Dependencias Principales

### Core Framework
```json
{
  "next": "^15.1.8",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.15",
  "tailwind-merge": "^3.4.0",
  "tailwindcss-animate": "^1.0.7",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.554.0"
}
```

### Radix UI (Componentes)
```json
{
  "@radix-ui/react-avatar": "^1.1.11",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-label": "^2.1.8",
  "@radix-ui/react-select": "^2.1.11",
  "@radix-ui/react-slot": "^1.2.4",
  "@radix-ui/react-toast": "^1.2.5"
}
```

### Tema
```json
{
  "next-themes": "^0.4.6"
}
```

---

## 🚦 Performance & Optimización

### Estrategias Aplicadas

1. **Server Components por defecto**
   - Menos JavaScript enviado al cliente
   - Renderizado en servidor más rápido

2. **Code Splitting automático**
   - Next.js divide código por rutas
   - Carga lazy de componentes pesados

3. **Image Optimization**
   - `next/image` para optimización automática
   - (Por implementar en imágenes de UI)

4. **CSS-in-JS optimizado**
   - Tailwind purge automático
   - Solo clases usadas en build

---

## 🔐 Seguridad

### Medidas Implementadas

1. **React Strict Mode:** Detecta problemas en desarrollo
2. **TypeScript Strict Mode:** Previene errores de tipos
3. **CSP Headers:** (Por configurar en `next.config.mjs`)
4. **Validación de inputs:** (Por implementar en formularios)

---

## 🧪 Testing (Por Implementar)

### Estrategia Recomendada

**Unit Tests:**
- Jest + React Testing Library
- Componentes UI aislados
- Helpers y utilities

**Integration Tests:**
- Playwright / Cypress
- Flujos de usuario completos
- Integración con backend

**Type Checking:**
- `pnpm run build` valida tipos
- TypeScript catch errors en compile-time

---

## 📖 Documentación de Referencia

### Interna
- **Design System:** `.context/design-system.md`
- **Product Requirements:** `.context/PRD/`
- **Technical Specs:** `.context/SRS/`

### Externa
- **Next.js 15:** https://nextjs.org/docs
- **React 19:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Radix UI:** https://www.radix-ui.com/
- **shadcn/ui:** https://ui.shadcn.com/

---

## 🔄 Próximos Pasos (Fase 7 - Implementation)

1. **Integración real con Supabase**
   - Configurar Supabase client
   - Implementar autenticación
   - Queries y mutations reales

2. **Formularios avanzados**
   - React Hook Form
   - Validación con Zod
   - Error handling

3. **Estado del servidor**
   - React Query / SWR
   - Optimistic updates
   - Cache management

4. **Features de negocio**
   - Crear CitaLinks
   - Gestión de citas
   - Integración con Stripe

---

## 👥 Contribución

### Agregar Nuevos Componentes UI

1. Crear en `src/components/ui/[nombre].tsx`
2. Usar pattern de Radix UI + shadcn/ui
3. Aplicar paleta de `tailwind.config.ts`
4. Documentar en `.context/design-system.md`
5. Usar tipos del backend si aplica

### Agregar Nuevas Páginas

1. Crear en `src/app/[ruta]/page.tsx`
2. Usar componentes del design system
3. Importar tipos de `@/lib/types`
4. Implementar loading/error states
5. Documentar en `.context/PBI/`

---

**Última actualización:** 20 de Noviembre de 2025
**Mantenido por:** Equipo de desarrollo CitaLink
