id: STORY-CL-2
jira_id: CL-4
epic_id: EPIC-CL-1
title: Como Laura (recepcionista), quiero poder iniciar sesión con las credenciales de la clínica, para acceder a nuestro panel de gestión
priority: High
story_points: 3
assignee: null
status: To Do

---

### Description
Esta historia permite a un usuario autenticarse en la plataforma usando su email y contraseña para acceder a las herramientas de gestión de su clínica.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Inicio de sesión exitoso**
```gherkin
Given Existe una cuenta de clínica con el email "laura.recepcion@test.com" y contraseña "Password123"
And No estoy autenticado
When Visito la página de login
And Relleno el campo "Email" con "laura.recepcion@test.com"
And Relleno el campo "Contraseña" con "Password123"
And Hago clic en el botón "Iniciar Sesión"
Then Soy redirigido al dashboard de la clínica
```

**Scenario 2: Inicio de sesión con credenciales incorrectas**
```gherkin
Given Existe una cuenta de clínica con el email "laura.recepcion@test.com"
When Visito la página de login
And Relleno el campo "Email" con "laura.recepcion@test.com"
And Relleno el campo "Contraseña" con "contraseñaincorrecta"
And Hago clic en el botón "Iniciar Sesión"
Then Permanezco en la página de login
And Veo un mensaje de error que dice "Credenciales inválidas"
```

### Technical Notes (iniciales)
- Usar Supabase Auth para la autenticación (`supabase.auth.signInWithPassword`).
- Implementar la gestión de sesiones mediante JWT, almacenando el token de forma segura en el cliente (ej. en una cookie httpOnly).
- La redirección al dashboard debe ocurrir solo después de una autenticación exitosa.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
