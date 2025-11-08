id: STORY-CL-7
jira_id: CL-10
epic_id: EPIC-CL-2
title: Como Dr. David, quiero poder establecer un tiempo de expiración por defecto para los links (ej. 48 horas), para automatizar la liberación de huecos no confirmados
priority: Medium
story_points: 3
assignee: null
status: To Do

---

### Description
Permite al usuario definir un tiempo estándar en horas tras el cual un CitaLink no pagado cambiará su estado a "Expirado". Esto ayuda a gestionar la disponibilidad de la agenda.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Guardar un tiempo de expiración válido**
```gherkin
Given Estoy en la página de "Configuración"
When Introduzco "24" en el campo "Horas de Expiración por Defecto"
And Hago clic en "Guardar Configuración"
Then Veo un mensaje de éxito "Configuración guardada"
And el valor "24" se almacena en la base de datos
```

**Scenario 2: El tiempo de expiración se aplica al crear un CitaLink**
```gherkin
Given He configurado el tiempo de expiración en "24" horas
When Creo un nuevo CitaLink a las 10:00 AM del Lunes
Then el campo `expiresAt` del nuevo CitaLink en la base de datos se establece a las 10:00 AM del Martes
```

### Technical Notes (iniciales)
- El backend calculará la fecha de expiración (`expiresAt`) en el momento de la creación del CitaLink, sumando las horas configuradas a la fecha y hora actuales.
- El campo en la base de datos debe ser de tipo `timestamp`.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
