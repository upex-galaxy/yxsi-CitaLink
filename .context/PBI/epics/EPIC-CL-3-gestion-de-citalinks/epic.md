id: EPIC-CL-3
jira_id: CL-11
title: Gestión de CitaLinks
priority: High
business_value: High
estimated_story_points: 13

---

### Description
Esta épica es el corazón de la aplicación. Cubre la creación de CitaLinks, la capacidad de compartirlos fácilmente y la visualización de su estado en un dashboard simple. Es la funcionalidad principal que usarán las recepcionistas en su día a día.

### Scope
**In Scope:**
- Formulario para crear un CitaLink con datos del paciente, cita e importe.
- Botón para copiar el link o un mensaje predefinido al portapapeles.
- Un listado/dashboard que muestre los CitaLinks generados con su estado (Pendiente, Confirmado, Expirado).

**Out of Scope:**
- Edición o eliminación de CitaLinks una vez creados.
- Creación de CitaLinks en lote.
- Búsqueda o filtrado avanzado en la lista de CitaLinks.

### Acceptance Criteria (Epic-level)
- Un usuario de la clínica (como Laura) puede crear un CitaLink en menos de 30 segundos.
- El estado de los CitaLinks en el dashboard es un reflejo fiel de su estado real en la base de datos.
- El flujo de crear y copiar es intuitivo y minimiza la posibilidad de errores.

### Dependencies
- **Épicas dependientes:** EPIC-CL-2 (utiliza la configuración por defecto de la clínica para crear los links).
- **Recursos externos:** Ninguno.
- **Technical pre-requisites:** La tabla `appointments` debe estar definida en la base de datos.

### User Stories
- **STORY-CL-8:** Como Laura, quiero poder crear un nuevo CitaLink introduciendo manualmente los detalles (nombre del paciente, fecha/hora de la cita, importe total del servicio), para generar el link de pago de anticipo. (5 pts)
- **STORY-CL-9:** Como Laura, quiero poder copiar el CitaLink generado con un solo clic, para pegarlo directamente en una conversación de WhatsApp con el paciente. (3 pts)
- **STORY-CL-10:** Como Laura, quiero ver una lista simple de todos los links generados con su estado actual (Pendiente, Confirmado, Expirado), para tener una visión rápida de la jornada. (5 pts)
