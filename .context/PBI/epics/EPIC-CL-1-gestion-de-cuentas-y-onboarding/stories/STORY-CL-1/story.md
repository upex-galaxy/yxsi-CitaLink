id: STORY-CL-1
jira_id: CL-3
epic_id: EPIC-CL-1
title: Como Dr. David, quiero poder registrar mi clínica usando un email y contraseña, para crear una cuenta en CitaLink
priority: High
story_points: 5
assignee: null
status: To Do

---

### Description
Esta historia cubre la funcionalidad de registro para un nuevo usuario que representa a una clínica. El proceso debe ser simple, requiriendo solo un nombre para la clínica, un email válido y una contraseña segura.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Registro exitoso con datos válidos**
```gherkin
Given No estoy autenticado en el sistema
When Visito la página de registro
And Relleno el campo "Nombre de la Clínica" con "Clínica Dental Sonrisas"
And Relleno el campo "Email" con "david.sonrisas@test.com"
And Relleno el campo "Contraseña" con "Password123"
And Hago clic en el botón "Registrar"
Then Soy redirigido al dashboard de la clínica
And Veo un mensaje de bienvenida
```

**Scenario 2: Intento de registro con un email ya existente**
```gherkin
Given Existe una cuenta con el email "david.sonrisas@test.com"
When Visito la página de registro
And Relleno el campo "Email" con "david.sonrisas@test.com"
And Relleno los demás campos válidamente
And Hago clic en el botón "Registrar"
Then Permanezco en la página de registro
And Veo un mensaje de error que dice "El email ya está en uso"
```

**Scenario 3: Intento de registro con una contraseña insegura**
```gherkin
Given No estoy autenticado en el sistema
When Visito la página de registro
And Relleno el campo "Contraseña" con "1234"
And Relleno los demás campos válidamente
And Hago clic en el botón "Registrar"
Then Permanezco en la página de registro
And Veo un mensaje de error que dice "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
```

### Technical Notes (iniciales)
- Usar Supabase Auth para la gestión de usuarios (`supabase.auth.signUp`).
- La validación de la contraseña debe hacerse tanto en el frontend (para feedback inmediato) como en el backend (por seguridad).
- Al crear el usuario, se debe crear una entrada correspondiente en la tabla `clinics`.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
