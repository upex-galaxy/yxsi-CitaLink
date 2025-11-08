id: STORY-CL-5
jira_id: CL-8
epic_id: EPIC-CL-2
title: Como Dr. David, quiero poder establecer un porcentaje de anticipo por defecto (ej. 20%), para no tener que calcularlo cada vez que genero un link
priority: Medium
story_points: 3
assignee: null
status: To Do

---

### Description
Permite al usuario definir un porcentaje estándar que se usará para calcular el monto del depósito en todos los CitaLinks nuevos, agilizando la creación de los mismos.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Guardar un porcentaje de anticipo válido**
```gherkin
Given Estoy en la página de "Configuración" de mi clínica
When Introduzco "25" en el campo "Porcentaje de Anticipo por Defecto"
And Hago clic en "Guardar Configuración"
Then Veo un mensaje de éxito "Configuración guardada"
And el valor "25" se almacena en la base de datos para mi clínica
```

**Scenario 2: Intentar guardar un valor inválido**
```gherkin
Given Estoy en la página de "Configuración" de mi clínica
When Introduzco "-10" en el campo "Porcentaje de Anticipo por Defecto"
And Hago clic en "Guardar Configuración"
Then Veo un mensaje de error "El valor debe ser un número entre 1 y 100"
```

### Technical Notes (iniciales)
- El frontend debe usar un input de tipo `number` con atributos `min="1"` y `max="100"`.
- El backend debe validar que el valor recibido esté dentro del rango permitido antes de guardarlo en la tabla `clinics`.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
