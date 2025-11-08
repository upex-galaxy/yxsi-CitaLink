id: STORY-CL-12
jira_id: CL-17
epic_id: EPIC-CL-4
title: Como Paciente, quiero poder pagar el anticipo de forma segura usando mi tarjeta de crédito/débito, para confirmar mi cita sin complicaciones
priority: High
story_points: 8
assignee: null
status: To Do

---

### Description
Esta historia implementa la lógica de procesamiento de pagos. Integra el formulario del frontend con Stripe para crear un `PaymentIntent` y confirmar el pago, asegurando que los fondos se transfieran a la cuenta de Stripe Connect de la clínica.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Pago exitoso con tarjeta válida**
```gherkin
Given Estoy en la página de pago para un CitaLink pendiente
When Relleno el formulario de tarjeta con datos válidos
And Hago clic en el botón "Pagar Ahora"
Then Veo un indicador de carga mientras se procesa el pago
And El pago se completa exitosamente
Then Soy redirigido a la página de confirmación
```

**Scenario 2: Pago fallido por tarjeta rechazada**
```gherkin
Given Estoy en la página de pago
When Relleno el formulario con datos de una tarjeta sin fondos
And Hago clic en "Pagar Ahora"
Then Veo un mensaje de error en la misma página que dice "Tu tarjeta ha sido rechazada. Por favor, usa otra tarjeta."
And El estado de la cita permanece "Pendiente"
```

### Technical Notes (iniciales)
- Usar Stripe Elements en el frontend para la recolección segura de los datos de la tarjeta (PCI compliance).
- El frontend crea un `PaymentMethod` y lo envía al backend.
- El backend crea y confirma un `PaymentIntent` de Stripe. Es crucial pasar el `stripe_account_id` de la clínica en la llamada a la API de Stripe para que los fondos se transfieran correctamente.
- El `appointment_id` debe ser incluido en los metadatos del `PaymentIntent` para poder identificarlo en el webhook.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
