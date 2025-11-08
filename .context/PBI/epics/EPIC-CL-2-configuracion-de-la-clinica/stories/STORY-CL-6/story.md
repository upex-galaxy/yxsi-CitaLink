id: STORY-CL-6
jira_id: CL-9
epic_id: EPIC-CL-2
title: Como Laura, quiero poder definir una plantilla de mensaje para WhatsApp con variables (ej. [nombre_paciente], [link]), para copiar y pegar rápidamente el mensaje de confirmación
priority: Low
story_points: 3
assignee: null
status: To Do

---

### Description
Esta funcionalidad permite a la clínica crear un mensaje predefinido que se puede copiar fácilmente para enviar a los pacientes. El sistema debe soportar variables que serán reemplazadas dinámicamente.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Guardar una plantilla de mensaje**
```gherkin
Given Estoy en la página de "Configuración"
When Introduzco "Hola [nombre_paciente], por favor confirma tu cita en el siguiente enlace: [link]" en el área de texto "Plantilla de Mensaje"
And Hago clic en "Guardar Configuración"
Then Veo un mensaje de éxito "Plantilla guardada"
```

**Scenario 2: Usar la plantilla al copiar un CitaLink**
```gherkin
Given He configurado una plantilla de mensaje
And He creado un CitaLink para el paciente "Ana García" con el link "https://citalink.com/pay/xyz123"
When Hago clic en el botón "Copiar Mensaje" junto al CitaLink de Ana
Then el texto "Hola Ana García, por favor confirma tu cita en el siguiente enlace: https://citalink.com/pay/xyz123" se copia a mi portapapeles
```

### Technical Notes (iniciales)
- Usar un `textarea` para la entrada de la plantilla.
- La sustitución de variables (`[nombre_paciente]`, `[link]`) se realizará en el frontend en el momento de copiar el mensaje.
- Considerar añadir una pequeña guía de las variables disponibles junto al campo de texto.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
