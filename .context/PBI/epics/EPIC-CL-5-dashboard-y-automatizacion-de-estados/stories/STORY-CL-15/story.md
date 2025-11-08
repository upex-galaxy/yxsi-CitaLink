id: STORY-CL-15
jira_id: CL-21
epic_id: EPIC-CL-5
title: Como Laura, quiero que el estado de una cita cambie a `Expirada` si el paciente no ha pagado antes de la fecha límite, para saber que el hueco está disponible de nuevo
priority: Medium
story_points: 5
assignee: null
status: To Do

---

### Description
Implementa un proceso automatizado (cron job) que se ejecuta periódicamente para "limpiar" los CitaLinks que no fueron pagados a tiempo, marcándolos como expirados.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Un CitaLink pendiente expira**
```gherkin
Given Hay un CitaLink pendiente con una fecha de expiración `expiresAt` de hace una hora
When el cron job de expiración se ejecuta
Then el estado de ese CitaLink en la base de datos se actualiza a "Expirado"
```

**Scenario 2: Un CitaLink confirmado no se ve afectado**
```gherkin
Given Hay un CitaLink confirmado con una fecha de expiración `expiresAt` de hace una hora
When el cron job de expiración se ejecuta
Then el estado de ese CitaLink permanece como "Confirmado"
```

### Technical Notes (iniciales)
- Usar Supabase Scheduled Functions para implementar el cron job.
- La función se puede programar para ejecutarse cada hora (ej. `0 * * * *`).
- La consulta SQL debe ser eficiente: `UPDATE appointments SET status = 'expired' WHERE status = 'pending' AND expiresAt < NOW();`.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
