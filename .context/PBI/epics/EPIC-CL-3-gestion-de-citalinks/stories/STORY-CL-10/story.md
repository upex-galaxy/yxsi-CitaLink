id: STORY-CL-10
jira_id: CL-14
epic_id: EPIC-CL-3
title: Como Laura, quiero ver una lista simple de todos los links generados con su estado actual (Pendiente, Confirmado, Expirado), para tener una visión rápida de la jornada
priority: High
story_points: 5
assignee: null
status: To Do

---

### Description
El dashboard principal mostrará una tabla o lista de los CitaLinks creados por la clínica. Cada elemento de la lista debe mostrar información clave y tener un indicador visual claro de su estado.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Visualizar la lista de CitaLinks**
```gherkin
Given He creado varios CitaLinks con diferentes estados
When Visito el dashboard de mi clínica
Then Veo una lista de los CitaLinks ordenados por fecha de la cita (los más próximos primero)
And Cada CitaLink en la lista muestra el nombre del paciente, la fecha/hora de la cita, el importe del anticipo y su estado
```

**Scenario 2: Los estados se muestran visualmente**
```gherkin
Given Veo la lista de CitaLinks
When un CitaLink tiene el estado "Pendiente"
Then se muestra con un indicador de color amarillo
When un CitaLink tiene el estado "Confirmado"
Then se muestra con un indicador de color verde
When un CitaLink tiene el estado "Expirado"
Then se muestra con un indicador de color gris
```

### Technical Notes (iniciales)
- El frontend obtendrá los datos de un endpoint de la API que devuelve los `appointments` de la clínica.
- La lista debe ser responsive y legible en dispositivos móviles.
- Considerar la paginación si se espera un gran número de CitaLinks por día.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
