id: STORY-CL-3
jira_id: CL-5
epic_id: EPIC-CL-1
title: Como Dr. David, quiero poder restablecer la contraseña si la olvido, para no perder el acceso a mi cuenta
priority: Medium
story_points: 5
assignee: null
status: To Do

---

### Description
Implementa el flujo estándar de "contraseña olvidada". El usuario introduce su email, recibe un enlace para restablecerla, y puede definir una nueva contraseña.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Solicitud de reseteo de contraseña exitosa**
```gherkin
Given Existe una cuenta con el email "david.sonrisas@test.com"
When Visito la página de "Contraseña Olvidada"
And Introduzco "david.sonrisas@test.com" en el campo de email
And Hago clic en "Enviar enlace de recuperación"
Then Veo un mensaje de confirmación diciendo "Si tu email está en nuestro sistema, recibirás un enlace para restablecer tu contraseña"
```

**Scenario 2: Restablecimiento de contraseña exitoso**
```gherkin
Given He recibido un enlace de restablecimiento de contraseña válido
When Hago clic en el enlace
Then Soy llevado a una página para introducir una nueva contraseña
When Introduzco "NuevaPassword123" en ambos campos de contraseña
And Hago clic en "Restablecer Contraseña"
Then Soy redirigido a la página de login
And Veo un mensaje que dice "Tu contraseña ha sido actualizada con éxito"
```

### Technical Notes (iniciales)
- Usar la funcionalidad de Supabase Auth para enviar el email de reseteo (`supabase.auth.resetPasswordForEmail`).
- El frontend debe tener una ruta específica que capture el token de la URL y muestre el formulario para la nueva contraseña.
- La actualización de la contraseña se gestiona con `supabase.auth.updateUser`.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
