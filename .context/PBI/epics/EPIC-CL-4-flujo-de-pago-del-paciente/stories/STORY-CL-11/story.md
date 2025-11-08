id: STORY-CL-11
jira_id: CL-16
epic_id: EPIC-CL-4
title: Como Paciente, quiero poder abrir el link en mi móvil y ver claramente los detalles de mi cita y el importe a pagar, para saber qué estoy confirmando
priority: High
story_points: 5
assignee: null
status: To Do

---

### Description
Crea la página de aterrizaje pública a la que llega el paciente. Esta página debe mostrar de forma clara y concisa la información relevante de la cita (nombre de la clínica, paciente, fecha, hora, importe a pagar) y el formulario de pago.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Ver detalles de una cita pendiente**
```gherkin
Given existe un CitaLink pendiente con ID "xyz123"
When Abro la URL "https://citalink.com/pay/xyz123" en mi navegador móvil
Then Veo una página que muestra:
  | Detalle         | Valor                               |
  | Clínica         | Clínica Dental Sonrisas             |
  | Paciente        | Ana García                          |
  | Fecha y Hora    | 15 de Noviembre de 2025, 16:00      |
  | Importe a Pagar | 20.00€                              |
And Veo un formulario para introducir los datos de mi tarjeta
```

**Scenario 2: Abrir un link ya confirmado o expirado**
```gherkin
Given existe un CitaLink con ID "abc456" que ya ha sido pagado (estado 'Confirmado')
When Abro la URL "https://citalink.com/pay/abc456"
Then Veo una página que dice "Esta cita ya ha sido confirmada."
And No veo un formulario de pago
```

### Technical Notes (iniciales)
- Esta página será pública y no requerirá autenticación.
- El backend necesita un endpoint público `GET /api/appointments/{id}` que devuelva los datos necesarios para renderizar la página.
- La página debe ser responsive (mobile-first).
- Por seguridad, el endpoint no debe exponer datos sensibles de la clínica o el paciente.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
