id: STORY-CL-14
jira_id: CL-20
epic_id: EPIC-CL-5
title: Como Laura, quiero que el estado de una cita en el dashboard cambie automáticamente de `Pendiente` a `Confirmada` cuando un paciente completa el pago, para no tener que comprobarlo manualmente
priority: High
story_points: 8
assignee: null
status: To Do

---

### Description
Implementa la automatización clave que actualiza el estado de una cita después de un pago. Se basa en un webhook de Stripe que notifica al sistema sobre un pago exitoso.

### Acceptance Criteria (Gherkin format)

**Scenario 1: El estado se actualiza tras un pago exitoso**
```gherkin
Given Hay un CitaLink con ID "xyz123" y estado "Pendiente"
And un paciente paga exitosamente ese CitaLink
When el sistema recibe el webhook `payment_intent.succeeded` de Stripe para ese pago
Then el estado del CitaLink "xyz123" en la base de datos se actualiza a "Confirmado"
And la próxima vez que vea el dashboard, el CitaLink "xyz123" aparecerá como "Confirmado"
```

**Scenario 2: El sistema maneja un webhook inválido**
```gherkin
Given el sistema recibe una petición a su endpoint de webhooks que no tiene una firma de Stripe válida
When el sistema intenta procesar la petición
Then la petición es rechazada con un código de estado 400 (Bad Request)
And no se realiza ninguna actualización en la base de datos
```

### Technical Notes (iniciales)
- Se debe crear una Supabase Edge Function que actúe como endpoint para el webhook de Stripe.
- La función debe verificar la firma del webhook (`stripe.webhooks.constructEvent`) para seguridad.
- El `appointment_id`, guardado en los metadatos del `PaymentIntent`, se usa para saber qué registro actualizar.
- La actualización en la base de datos debe ser una operación simple: `UPDATE appointments SET status = 'confirmed' WHERE id = ?`.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
