# Design System - CitaLink

**Generado:** Fase 3.3 - Frontend Setup
**Fecha:** 17 de Noviembre de 2025
**Estilo Visual:** Minimalista y Profesional

---

## 🔗 Integración Backend-Frontend

### Tipos TypeScript Compartidos

**Beneficio clave:** Zero type mismatches entre backend y frontend.

**Archivo de tipos mockeado:** `src/lib/database.types.ts` (simula la salida de Supabase CLI)
**Helper de tipos:** `src/lib/types.ts` (extrae tipos específicos para el frontend)

**Ejemplo de uso:**

```typescript
import type { Appointment } from '@/lib/types'

// TypeScript sabe exactamente qué campos tiene Appointment
const AppointmentCard = ({ appt }: { appt: Appointment }) => {
  return (
    <div>
      <h3>{appt.patient_name}</h3>      {/* ✅ TypeScript valida que 'patient_name' existe */}
      <p>{appt.status}</p>             {/* ✅ TypeScript valida que 'status' existe */}
      {/* <p>{appt.invalid_field}</p> */} {/* ❌ Error: 'invalid_field' no existe en Appointment */}
    </div>
  )
}
```

---

## 🎨 Paleta de Colores (Azul Profesional)

La paleta de colores está definida como variables CSS en `src/app/globals.css` y configurada en `tailwind.config.ts`.

### Colores Principales
| Color     | HSL (light)   | Uso                                                    |
|-----------|---------------|--------------------------------------------------------|
| Primary   | `210 40% 50%`   | Botones primarios, links, focus states, elementos activos |
| Secondary | `210 40% 96.1%` | Fondos de elementos secundarios, botones secundarios    |
| Accent    | `210 40% 96.1%` | Highlights, fondos de hover sutiles                    |

### Colores de Sistema
| Color        | HSL (light)     | Uso                                         |
|--------------|-----------------|---------------------------------------------|
| Background   | `0 0% 100%`       | Fondo principal de la aplicación            |
| Foreground   | `222.2 84% 4.9%`  | Texto principal                             |
| Card         | `0 0% 100%`       | Fondo de cards, modals, popovers            |
| Border       | `210 40% 89.8%`   | Bordes de inputs, cards, separadores        |
| Muted        | `210 40% 45%`     | Texto secundario, placeholders              |

### Acceso en código:
```tsx
// Tailwind classes
<div className="bg-primary text-primary-foreground">...</div>
<p className="text-muted-foreground">...</p>

// CSS variables (en archivos CSS)
color: hsl(var(--primary));
```

---

## 🧱 Componentes UI

Componentes base ubicados en `src/components/ui`.

### Button
**Ubicación:** `src/components/ui/button.tsx`

Botón reutilizable con variantes y tamaños.

**Variantes:** `default` (primary), `secondary`, `destructive`, `outline`, `ghost`, `link`.
**Tamaños:** `default`, `sm`, `lg`, `icon`.

**Ejemplo de uso:**
```tsx
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Botón primario
<Button>Crear CitaLink</Button>

// Botón outline pequeño
<Button variant="outline" size="sm">Ver Detalles</Button>

// Botón de icono
<Button variant="ghost" size="icon">
  <PlusCircle className="h-4 w-4" />
</Button>
```

### Card
**Ubicación:** `src/components/ui/card.tsx`

Contenedor para agrupar información.

**Sub-componentes:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

**Ejemplo de uso con tipos del backend:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Appointment } from "@/lib/types";

const AppointmentCard = ({ appt }: { appt: Appointment }) => (
  <Card>
    <CardHeader>
      <CardTitle>{appt.patient_name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Estado: {appt.status}</p>
    </CardContent>
  </Card>
);
```

### Input, Label
**Ubicación:** `src/components/ui/input.tsx`, `src/components/ui/label.tsx`

Componentes esenciales para formularios.

**Ejemplo de uso:**
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

### Textarea
**Ubicación:** `src/components/ui/textarea.tsx`

Componente de área de texto para formularios con múltiples líneas.

**Ejemplo de uso:**
```tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Notas de la cita</Label>
  <Textarea id="message" placeholder="Escribe notas adicionales..." />
</div>
```

### Select
**Ubicación:** `src/components/ui/select.tsx`

Componente de selección desplegable con estilo coherente.

**Ejemplo de uso:**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Seleccionar estado" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="pending">Pendiente</SelectItem>
    <SelectItem value="confirmed">Confirmada</SelectItem>
    <SelectItem value="expired">Expirada</SelectItem>
  </SelectContent>
</Select>
```

### Dialog
**Ubicación:** `src/components/ui/dialog.tsx`

Componente modal para confirmaciones, formularios y detalles.

**Sub-componentes:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`.

**Ejemplo de uso:**
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button>Crear Nueva Cita</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Nueva Cita</DialogTitle>
      <DialogDescription>
        Completa los datos para crear un nuevo CitaLink.
      </DialogDescription>
    </DialogHeader>
    {/* Formulario aquí */}
    <DialogFooter>
      <Button type="submit">Guardar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Skeleton
**Ubicación:** `src/components/ui/skeleton.tsx`

Componente placeholder para estados de carga.

**Ejemplo de uso:**
```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Loading state para una card
<Card>
  <CardHeader>
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-20 w-full" />
  </CardContent>
</Card>
```

### Toast
**Ubicación:** `src/components/ui/toast.tsx`, `src/components/ui/toaster.tsx`

Sistema de notificaciones toast para feedback al usuario.

**Hook:** `src/hooks/use-toast.ts`

**Ejemplo de uso:**
```tsx
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Cita creada exitosamente",
          description: "El link de pago ha sido generado.",
        });
      }}
    >
      Crear Cita
    </Button>
  );
}

// No olvides agregar <Toaster /> en tu layout principal
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### Dropdown Menu
**Ubicación:** `src/components/ui/dropdown-menu.tsx`

Menú desplegable para acciones contextuales.

**Ejemplo de uso:**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Opciones</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
    <DropdownMenuItem>Editar</DropdownMenuItem>
    <DropdownMenuItem>Eliminar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Badge
**Ubicación:** `src/components/ui/badge.tsx`

Componente para etiquetas y estados.

**Variantes:** `default`, `secondary`, `destructive`, `outline`.

**Ejemplo de uso:**
```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Pendiente</Badge>
<Badge variant="destructive">Expirada</Badge>
<Badge variant="outline">Confirmada</Badge>
```

### Avatar
**Ubicación:** `src/components/ui/avatar.tsx`

Componente para mostrar imágenes de perfil con fallback.

**Ejemplo de uso:**
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="https://github.com/user.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

---

## 📐 Layout

**Estructura Elegida:** Top Navbar
**Razón:** Para el MVP, una barra de navegación superior es suficiente y proporciona una experiencia limpia y simple. La estructura está preparada para añadir una `Sidebar` en el futuro a medida que la aplicación crezca.

**Componentes:**
- `src/components/layout/Navbar.tsx`: Barra de navegación superior principal.
- `src/components/theme-provider.tsx`: Gestiona el cambio entre modo claro y oscuro.

---

## ✨ Guidelines de Uso

### ✅ **Hacer (DO)**
- **Usar componentes del design system:** `Button`, `Card`, etc., para mantener la consistencia.
- **Usar la paleta de colores de Tailwind:** `bg-primary`, `text-muted-foreground`, etc.
- **Usar tipos del backend:** `import type { Appointment } from '@/lib/types'` para props y datos.
- **Mantener espaciado consistente:** Usar utilidades de `gap`, `p`, `m` de Tailwind.

### ❌ **No Hacer (DON'T)**
- **No usar colores hardcodeados:** `style={{ color: '#3B82F6' }}` está prohibido. Usa las clases de Tailwind.
- **No usar el tipo `any`:** Evita `const data: any = ...`. Usa los tipos importados.
- **No crear componentes custom para UI básica:** No reinventes el botón. Extiende los existentes si es necesario.
