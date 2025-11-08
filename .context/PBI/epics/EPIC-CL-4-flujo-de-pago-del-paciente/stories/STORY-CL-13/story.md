id: STORY-CL-13
jira_id: CL-18
epic_id: EPIC-CL-4
title: Como Paciente, quiero recibir una confirmación visual inmediata en pantalla después del pago, para saber que el proceso ha sido exitoso
priority: High
story_points: 3
assignee: null
status: To Do

---

### Description
Crea una página de "éxito" a la que el paciente es redirigido después de un pago correcto. Esta página sirve como confirmación final y cierra el flujo del paciente.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Ver la página de confirmación**
```gherkin
Given Acabo de completar un pago de forma exitosa
When Soy redirigido automáticamente
Then Veo una página con un gran tick verde (✔)
And un mensaje que dice "¡Pago completado! Tu cita está confirmada."
And Veo un resumen de los detalles de la cita (clínica, fecha, hora)
```

### Technical Notes (iniciales)
- Puede ser una página estática o una ruta en el frontend que se muestra después de que la promesa de pago de Stripe se resuelva con éxito.
- El diseño debe ser simple, claro y tranquilizador para el usuario.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
