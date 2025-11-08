id: STORY-CL-9
jira_id: CL-13
epic_id: EPIC-CL-3
title: Como Laura, quiero poder copiar el CitaLink generado con un solo clic, para pegarlo directamente en una conversación de WhatsApp con el paciente
priority: High
story_points: 3
assignee: null
status: To Do

---

### Description
Proporciona una acción rápida en la interfaz para copiar la URL del CitaLink o el mensaje de la plantilla al portapapeles, optimizando el flujo de trabajo de la recepcionista.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Copiar solo el link**
```gherkin
Given Hay un CitaLink en la lista con la URL "https://citalink.com/pay/xyz123"
When Hago clic en el botón "Copiar Link" asociado a ese CitaLink
Then la URL "https://citalink.com/pay/xyz123" se copia a mi portapapeles
And Veo una notificación visual "¡Link copiado!"
```

**Scenario 2: Copiar el mensaje completo (si la plantilla está configurada)**
```gherkin
Given La plantilla de mensaje es "Confirma tu cita aquí: [link]"
And Hay un CitaLink para "Juan Pérez" con la URL "https://citalink.com/pay/abc456"
When Hago clic en el botón "Copiar Mensaje" asociado a ese CitaLink
Then el texto "Confirma tu cita aquí: https://citalink.com/pay/abc456" se copia a mi portapapeles
And Veo una notificación visual "¡Mensaje copiado!"
```

### Technical Notes (iniciales)
- La funcionalidad se implementará en el frontend usando la API `navigator.clipboard`.
- La interfaz debe distinguir claramente entre copiar solo el link y copiar el mensaje completo.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
