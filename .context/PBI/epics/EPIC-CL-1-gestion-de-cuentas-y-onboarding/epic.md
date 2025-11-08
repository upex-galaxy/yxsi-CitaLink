id: EPIC-CL-1
jira_id: CL-2
title: Gestión de Cuentas y Onboarding
priority: High
business_value: High
estimated_story_points: 18

---

### Description
Esta épica cubre el ciclo de vida completo de la cuenta de una clínica, desde el registro inicial y la autenticación hasta la recuperación de la cuenta y el proceso de onboarding crítico para la configuración inicial del sistema, incluyendo la integración de pagos.

### Scope
**In Scope:**
- Creación de cuenta para una clínica con email y contraseña.
- Inicio de sesión para usuarios de la clínica.
- Flujo de reseteo de contraseña vía email.
- Proceso de onboarding guiado para conectar Stripe y añadir datos básicos de la clínica.

**Out of Scope:**
- Múltiples roles de usuario (admin, recepcionista) con distintos permisos.
- Autenticación mediante proveedores sociales (Google, etc.).
- Verificación de email obligatoria para activar la cuenta.

### Acceptance Criteria (Epic-level)
- Un nuevo director de clínica (como Dr. David) puede registrar su clínica, iniciar sesión, y completar el onboarding sin asistencia.
- El sistema previene la creación de cuentas con emails duplicados.
- La conexión con Stripe es segura y el `stripe_account_id` se almacena correctamente.
- El flujo de recuperación de contraseña funciona de manera fiable.

### Dependencies
- **Épicas dependientes:** Ninguna.
- **Recursos externos:** Supabase Auth (para autenticación y envío de emails de reseteo), Stripe Connect (para onboarding de pagos).
- **Technical pre-requisites:** Configuración de las variables de entorno de Supabase y Stripe en el backend.

### User Stories
- **STORY-CL-1:** Como Dr. David, quiero poder registrar mi clínica usando un email y contraseña, para crear una cuenta en CitaLink. (5 pts)
- **STORY-CL-2:** Como Laura (recepcionista), quiero poder iniciar sesión con las credenciales de la clínica, para acceder a nuestro panel de gestión. (3 pts)
- **STORY-CL-3:** Como Dr. David, quiero poder restablecer la contraseña si la olvido, para no perder el acceso a mi cuenta. (5 pts)
- **STORY-CL-4:** Como Dr. David, quiero pasar por un onboarding simple la primera vez que inicio sesión, para conectar mi cuenta de Stripe y configurar los datos básicos de mi clínica. (5 pts)
