id: EPIC-CL-5
jira_id: CL-19
title: Dashboard y Automatización de Estados
priority: High
business_value: High
estimated_story_points: 16

---

### Description
Esta épica se centra en la automatización que hace que CitaLink sea valioso. Asegura que el estado de las citas se actualice en tiempo real sin intervención manual, proporcionando una fuente de verdad fiable para la clínica y mostrando el valor financiero que la herramienta aporta.

### Scope
**In Scope:**
- Actualización automática del estado de la cita a 'Confirmada' tras un pago exitoso (vía webhook de Stripe).
- Actualización automática del estado a 'Expirada' para links no pagados (vía cron job).
- Un widget o contador simple en el dashboard que muestre los ingresos totales por anticipos en un período de tiempo.

**Out of Scope:**
- Notificaciones en tiempo real en la interfaz (ej. pop-ups) cuando un estado cambia.
- Analíticas detalladas o gráficos de ingresos.
- Envío de notificaciones a la clínica cuando una cita se confirma o expira.

### Acceptance Criteria (Epic-level)
- El estado de una cita en el dashboard se actualiza a 'Confirmada' a los pocos segundos de que un paciente complete el pago.
- Los CitaLinks pendientes se marcan como 'Expirados' de forma fiable una vez que pasa su tiempo límite.
- El contador de ingresos en el dashboard es preciso y se actualiza regularmente.

### Dependencies
- **Épicas dependientes:** EPIC-CL-3 (Dashboard), EPIC-CL-4 (Flujo de pago).
- **Recursos externos:** Stripe (para webhooks), Supabase (para Edge Functions y Scheduled Functions).
- **Technical pre-requisites:** Configuración de webhooks en Stripe y de las funciones programadas en Supabase.

### User Stories
- **STORY-CL-14:** Como Laura, quiero que el estado de una cita en el dashboard cambie automáticamente de `Pendiente` a `Confirmada` cuando un paciente completa el pago, para no tener que comprobarlo manualmente. (8 pts)
- **STORY-CL-15:** Como Laura, quiero que el estado de una cita cambie a `Expirada` si el paciente no ha pagado antes de la fecha límite, para saber que el hueco está disponible de nuevo. (5 pts)
- **STORY-CL-16:** Como Dr. David, quiero ver en el dashboard un contador simple del total de ingresos recaudados por anticipos esta semana/mes, para entender el impacto financiero de la herramienta. (3 pts)
