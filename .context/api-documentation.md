# API Documentation - CitaLink

Esta documentación describe cómo interactuar con la capa de API de Supabase para el proyecto CitaLink. Se recomienda encarecidamente utilizar los clientes de Supabase (`@supabase/ssr`, `@supabase/supabase-js`) en lugar de realizar llamadas `fetch` directas, ya que estos clientes manejan la autenticación, la gestión de tokens y la tipificación de datos automáticamente.

## Acceso a la Base de Datos (RESTful API)

Supabase expone automáticamente una API RESTful para cada una de tus tablas de base de datos. Puedes interactuar con estas tablas a través de los clientes de Supabase.

### URL Base de la API
La URL base de tu API de Supabase se define en `NEXT_PUBLIC_SUPABASE_URL` y se gestiona a través de `src/lib/config.ts`.

### Clave de Anon (Anon Key)
La clave de anon se define en `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Esta clave se utiliza para acceder a tu API de forma anónima o con las políticas de RLS adecuadas. Es segura para exponer en el lado del cliente.

### Clave de Rol de Servicio (Service Role Key)
La clave de rol de servicio (`SUPABASE_SERVICE_ROLE_KEY`) otorga privilegios de superusuario y **bypassea todas las políticas de RLS**. **Nunca debe ser expuesta en el lado del cliente.** Solo debe usarse en entornos de servidor seguro (API Routes, Edge Functions, Servidor de Next.js).

## Ejemplos de Uso con el Cliente de Supabase

### Cliente de Navegador (`src/lib/supabase/client.ts`)
Úsalo en componentes `client` de React para interactuar con Supabase desde el lado del cliente.

```typescript
// src/app/dashboard/some-client-component.tsx
"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Appointment } from '@/lib/types';

export default function MyClientComponent() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error.message);
      } else {
        setAppointments(data || []);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div>
      {appointments.map(appt => (
        <div key={appt.id}>{appt.patient_name} - {new Date(appt.appointment_date).toLocaleDateString()}</div>
      ))}
    </div>
  );
}
```

### Cliente de Servidor (`src/lib/supabase/server.ts`)
Úsalo en Server Components, API Routes o Route Handlers de Next.js para interacciones seguras y con RLS habilitado (o con `service_role_key` si se necesita bypass RLS).

```typescript
// src/app/dashboard/page.tsx (Server Component)
import { createServer } from '@/lib/supabase/server';
import type { Appointment } from '@/lib/types';

export default async function DashboardPage() {
  const supabase = createServer();
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching appointments:', error);
    return <div>Error al cargar las citas.</div>;
  }

  // Renderiza un Client Component o muestra los datos directamente
  return (
    <div>
      {appointments.map(appt => (
        <div key={appt.id}>{appt.patient_name} - {new Date(appt.appointment_date).toLocaleDateString()}</div>
      ))}
    </div>
  );
}
```

### Funciones de Base de Datos
Puedes invocar funciones de Postgres directamente a través del cliente de Supabase.

```typescript
// Ejemplo de invocación de función
const { data, error } = await supabase
  .rpc('get_current_clinic_id'); // Llama a la función get_current_clinic_id
```

## Autenticación (Auth)
El cliente de Supabase también proporciona métodos para la autenticación de usuarios.

```typescript
// Ejemplo de inicio de sesión
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'your_password',
});

// Ejemplo de cierre de sesión
await supabase.auth.signOut();
```

## Edge Functions
Para lógica de backend que requiere un entorno serverless y cercana al usuario (ej. webhooks de Stripe), se pueden utilizar Supabase Edge Functions.

## Pruebas de API
Puedes probar los endpoints REST directamente (por ejemplo, con Postman o Insomnia) utilizando la URL de tu proyecto y la clave de anon, asegurándote de que la política de RLS te permita acceder a los datos.
```
GET https://<YOUR_PROJECT_REF>.supabase.co/rest/v1/appointments
apikey: <YOUR_ANON_KEY>
Authorization: Bearer <YOUR_JWT_TOKEN>
```
