id: STORY-CL-16
jira_id: CL-22
epic_id: EPIC-CL-5
title: Como Dr. David, quiero ver en el dashboard un contador simple del total de ingresos recaudados por anticipos esta semana/mes, para entender el impacto financiero de la herramienta
priority: Low
story_points: 3
assignee: null
status: To Do

---

### Description
Agrega un componente visual simple al dashboard que muestra una métrica de negocio clave: el total de dinero recaudado a través de los anticipos confirmados. Esto ayuda al dueño de la clínica a ver el valor tangible de CitaLink.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Ver el total de ingresos del mes actual**
```gherkin
Given He tenido 3 citas confirmadas este mes, con anticipos de 20€, 30€ y 25€
When Visito el dashboard
Then Veo un widget o contador que muestra "Ingresos este mes: 75.00€"
```

**Scenario 2: Ver el total de ingresos de la semana actual**
```gherkin
Given Puedo cambiar la vista del contador a "semana"
When Selecciono la vista semanal
Then el contador muestra la suma de los anticipos confirmados solo para la semana en curso
```

### Technical Notes (iniciales)
- El backend necesita un endpoint que calcule esta suma. La consulta SQL podría ser algo como: `SELECT SUM(depositAmount) as total FROM appointments WHERE clinic_id = ? AND status = 'confirmed' AND paid_at >= DATE_TRUNC('month', NOW());`
- El frontend llamará a este endpoint para obtener el valor y mostrarlo.
- Añadir botones para cambiar el rango de tiempo (semana/mes).

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
