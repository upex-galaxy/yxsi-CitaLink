id: EPIC-CL-4
jira_id: CL-15
title: Flujo de Pago del Paciente
priority: High
business_value: High
estimated_story_points: 16

---

### Description
Esta épica define la experiencia del paciente, desde que recibe el CitaLink hasta que completa el pago. Debe ser un proceso extremadamente simple, rápido y seguro, optimizado para dispositivos móviles, ya que es un punto crítico de conversión.

### Scope
**In Scope:**
- Página de pago pública y responsive que muestra los detalles de la cita.
- Integración con Stripe Elements para una captura segura de los datos de la tarjeta.
- Procesamiento del pago a través de Stripe.
- Página de confirmación visual inmediata tras un pago exitoso.

**Out of Scope:**
- Permitir al paciente reprogramar o cancelar la cita desde la página de pago.
- Ofrecer múltiples métodos de pago además de tarjeta (ej. PayPal, Bizum).
- Guardar los datos de la tarjeta del paciente para futuros pagos.

### Acceptance Criteria (Epic-level)
- Un paciente puede completar el pago en menos de 1 minuto si tiene su tarjeta a mano.
- La página de pago es clara, profesional y genera confianza.
- El pago se procesa de forma segura y el paciente recibe confirmación inmediata.
- El flujo funciona correctamente en los principales navegadores móviles (Safari en iOS, Chrome en Android).

### Dependencies
- **Épicas dependientes:** EPIC-CL-3 (necesita que se haya creado un CitaLink).
- **Recursos externos:** Stripe (para Stripe Elements y procesamiento de pagos).
- **Technical pre-requisites:** La cuenta de Stripe de la clínica debe estar conectada (EPIC-CL-1).

### User Stories
- **STORY-CL-11:** Como Paciente, quiero poder abrir el link en mi móvil y ver claramente los detalles de mi cita y el importe a pagar, para saber qué estoy confirmando. (5 pts)
- **STORY-CL-12:** Como Paciente, quiero poder pagar el anticipo de forma segura usando mi tarjeta de crédito/débito, para confirmar mi cita sin complicaciones. (8 pts)
- **STORY-CL-13:** Como Paciente, quiero recibir una confirmación visual inmediata en pantalla después del pago, para saber que el proceso ha sido exitoso. (3 pts)
