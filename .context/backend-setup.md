# Backend Setup - CitaLink

Este documento detalla la configuración del backend de CitaLink utilizando Supabase, Next.js y TypeScript.

## Database Schema

Hemos implementado las siguientes tablas fundacionales en Supabase:

### `clinics`
- **Propósito:** Almacena información sobre cada clínica registrada, incluyendo su configuración y detalles de integración con Stripe.
- **Columnas clave:**
  - `id`: UUID (PK, auto-generado)
  - `name`: Nombre de la clínica
  - `stripe_account_id`: ID de la cuenta de Stripe Connect asociada
  - `settings`: JSONB para configuraciones como porcentaje de anticipo, plantilla de mensaje, etc.
  - `created_at`: Marca de tiempo de creación
- **Relaciones:** Uno-a-Muchos con `appointments` (a través de `clinic_id`).
- **RLS:**
  - `SELECT`: Permitir a los usuarios ver su propia clínica (basado en `public.get_current_clinic_id()`).
  - `UPDATE`: Permitir a los usuarios actualizar su propia clínica (basado en `public.get_current_clinic_id()`).

### `users`
- **Propósito:** Extiende la tabla `auth.users` de Supabase para almacenar información pública o específica del perfil de usuario, vinculando al usuario a una clínica.
- **Columnas clave:**
  - `id`: UUID (PK, FK a `auth.users.id`)
  - `full_name`: Nombre completo del usuario
  - `avatar_url`: URL del avatar del usuario
  - `clinic_id`: UUID (FK a `clinics.id`, vincula el usuario a una clínica)
  - `updated_at`: Marca de tiempo de la última actualización
- **Relaciones:** Uno-a-Uno con `auth.users`, Muchos-a-Uno con `clinics`.
- **RLS:**
  - `SELECT`: Permitir a los usuarios ver su propio perfil O perfiles de usuarios de su misma clínica.
  - `UPDATE`: Permitir a los usuarios actualizar su propio perfil.
- **Trigger:** `on_auth_user_created` llama a `handle_new_user()` para crear una entrada en `public.users` automáticamente cuando un nuevo usuario se registra en `auth.users`.

### `appointments`
- **Propósito:** Almacena los detalles de cada cita que requiere un anticipo.
- **Columnas clave:**
  - `id`: UUID (PK, auto-generado)
  - `clinic_id`: UUID (FK a `clinics.id`, identifica la clínica a la que pertenece la cita)
  - `patient_name`: Nombre del paciente
  - `status`: Estado de la cita ('pending', 'confirmed', 'expired', 'cancelled')
  - `total_amount`: Importe total del servicio
  - `deposit_amount`: Importe del anticipo requerido
  - `appointment_date`: Fecha y hora de la cita
  - `expires_at`: Fecha y hora de expiración del enlace de pago
  - `created_at`: Marca de tiempo de creación
- **Relaciones:** Muchos-a-Uno con `clinics`.
- **RLS:**
  - `ALL`: Permitir a los usuarios gestionar (SELECT, INSERT, UPDATE, DELETE) las citas de su propia clínica (basado en `clinic_id = public.get_current_clinic_id()`).

### Funciones de la Base de Datos
- **`public.get_current_clinic_id()`:** Función SQL estable que devuelve el `clinic_id` del usuario actualmente autenticado, crucial para las políticas de RLS multi-tenant.
- **`public.handle_new_user()`:** Función PL/pgSQL que inserta un nuevo registro en `public.users` al registrarse un nuevo usuario en Supabase Auth.

## Authentication

Hemos integrado Supabase Auth para la gestión de usuarios:

- **Proveedores:** Supabase Auth (email/contraseña).
- **Flujo:**
  1.  Los usuarios se registran/inician sesión a través de Supabase Auth.
  2.  Un `middleware.ts` en Next.js refresca la sesión y protege las rutas.
  3.  Un `AuthProvider` en el frontend (`src/components/auth-provider.tsx`) proporciona la sesión y el usuario autenticado a los componentes React.
- **Archivos clave:**
  - `src/lib/supabase/client.ts`: Cliente Supabase para el navegador.
  - `src/lib/supabase/server.ts`: Cliente Supabase para Server Components y Route Handlers.
  - `src/middleware.ts`: Gestiona la autenticación y protección de rutas.
  - `src/components/auth-provider.tsx`: Contexto de autenticación para el frontend.

## API Layer

- **Paquetes:** `@supabase/ssr` y `@supabase/supabase-js`.
- **Configuración centralizada:** `src/lib/config.ts` lee variables de entorno de forma segura y tipada.

## Variables de Entorno

- **Estrategia:** Uso de archivos `.env.local` (localmente) y variables de entorno configuradas en el entorno de despliegue (Vercel).
- **Archivos:**
  - `.env.example`: Plantilla descriptiva con instrucciones.
  - `.env.local`: Archivo real con credenciales (IGNORADO por Git).
- **Variables requeridas:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (solo para el servidor)
  - `NEXT_PUBLIC_APP_URL`

## Comandos Útiles

- **Generar tipados de Supabase:** `supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts`
- **Iniciar servidor de desarrollo:** `pnpm run dev`
- **Construir para producción:** `pnpm run build`
- **Verificar tipos:** `npx tsc --noEmit`

## Troubleshooting

- **"Permission denied for schema auth"**: Asegúrate de crear funciones y triggers en el esquema `public`, no en `auth`.
- **"Access token not provided" al generar tipos**: Utiliza la herramienta `generate_typescript_types` del agente o asegúrate de haber ejecutado `supabase login` en tu CLI local.
- **Errores de variables de entorno**: Verifica que `.env.local` está configurado correctamente y que tu servidor de desarrollo fue reiniciado.

---
