id: EPIC-CL-2
jira_id: CL-7
title: Configuración de la Clínica
priority: Medium
business_value: Medium
estimated_story_points: 9

---

### Description
Esta épica permite a los administradores de la clínica configurar las reglas de negocio básicas que gobernarán la creación y gestión de los CitaLinks. El objetivo es reducir el trabajo manual y estandarizar las operaciones diarias.

### Scope
**In Scope:**
- Definir un porcentaje de depósito por defecto.
- Establecer un tiempo de expiración por defecto para los links de pago.
- Crear una plantilla de mensaje de WhatsApp personalizable.

**Out of Scope:**
- Múltiples plantillas de mensajes para diferentes tipos de citas.
- Reglas de negocio condicionales (ej. diferente expiración para citas en fin de semana).
- Configuración de horarios de la clínica o de los especialistas.

### Acceptance Criteria (Epic-level)
- El administrador de la clínica puede encontrar fácilmente la sección de configuración.
- Los valores guardados (porcentaje, horas, plantilla) se aplican correctamente al crear un nuevo CitaLink.
- La interfaz proporciona feedback claro cuando se guardan las configuraciones.

### Dependencies
- **Épicas dependientes:** EPIC-CL-1 (se necesita una cuenta de clínica para acceder a la configuración).
- **Recursos externos:** Ninguno.
- **Technical pre-requisites:** La tabla `clinics` en la base de datos debe tener columnas para `default_deposit_percentage`, `default_expiration_hours`, y `message_template`.

### User Stories
- **STORY-CL-5:** Como Dr. David, quiero poder establecer un porcentaje de anticipo por defecto (ej. 20%), para no tener que calcularlo cada vez que genero un link. (3 pts)
- **STORY-CL-6:** Como Laura, quiero poder definir una plantilla de mensaje para WhatsApp con variables (ej. [nombre_paciente], [link]), para copiar y pegar rápidamente el mensaje de confirmación. (3 pts)
- **STORY-CL-7:** Como Dr. David, quiero poder establecer un tiempo de expiración por defecto para los links (ej. 48 horas), para automatizar la liberación de huecos no confirmados. (3 pts)
