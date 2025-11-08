id: STORY-CL-8
jira_id: CL-12
epic_id: EPIC-CL-3
title: Como Laura, quiero poder crear un nuevo CitaLink introduciendo manualmente los detalles (nombre del paciente, fecha/hora de la cita, importe total del servicio), para generar el link de pago de anticipo
priority: High
story_points: 5
assignee: null
status: To Do

---

### Description
Implementa el formulario principal de la aplicación para generar un nuevo CitaLink. Debe ser rápido y fácil de usar, aplicando las configuraciones por defecto de la clínica pero permitiendo sobreescribirlas si es necesario.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Crear un CitaLink exitosamente**
```gherkin
Given Estoy en el dashboard de mi clínica
When Hago clic en "Nuevo CitaLink"
And Relleno "Nombre del Paciente" con "Carlos Ruiz"
And Selecciono una fecha y hora para la cita
And Relleno "Importe Total" con "100"
And Hago clic en "Generar Link"
Then Veo el nuevo CitaLink para "Carlos Ruiz" en mi lista con estado "Pendiente"
And se ha creado un registro en la tabla `appointments` con los datos correctos
```

**Scenario 2: Crear un CitaLink con datos inválidos**
```gherkin
Given Estoy en el formulario de "Nuevo CitaLink"
When Dejo el campo "Nombre del Paciente" vacío
And Hago clic en "Generar Link"
Then Veo un mensaje de error que dice "El nombre del paciente no puede estar vacío"
```

### Technical Notes (iniciales)
- El backend calculará el `depositAmount` y `expiresAt` basándose en la configuración de la clínica.
- Se debe generar un ID único y no secuencial para el CitaLink para que no sea predecible (ej. UUID).
- El formulario debe usar componentes de calendario y hora amigables.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
