id: STORY-CL-4
jira_id: CL-6
epic_id: EPIC-CL-1
title: Como Dr. David, quiero pasar por un onboarding simple la primera vez que inicio sesión, para conectar mi cuenta de Stripe y configurar los datos básicos de mi clínica
priority: High
story_points: 5
assignee: null
status: To Do

---

### Description
Tras el primer inicio de sesión, el usuario debe ser guiado a través de un proceso de configuración inicial indispensable: conectar su cuenta de Stripe para poder recibir pagos. Este flujo es crucial para la activación del usuario.

### Acceptance Criteria (Gherkin format)

**Scenario 1: Completar el onboarding de Stripe exitosamente**
```gherkin
Given Es mi primer inicio de sesión y no he conectado mi cuenta de Stripe
When Soy redirigido a la página de onboarding
And Hago clic en el botón "Conectar con Stripe"
Then Soy redirigido al portal de Stripe Connect
When Completo el formulario de Stripe y soy redirigido de vuelta a CitaLink
Then Veo un mensaje en mi dashboard que dice "¡Tu cuenta de Stripe ha sido conectada con éxito!"
And Mi `stripe_account_id` está guardado en la base de datos
```

**Scenario 2: Omitir el onboarding de Stripe temporalmente**
```gherkin
Given Es mi primer inicio de sesión
When Soy redirigido a la página de onboarding
And Hago clic en "Lo haré más tarde"
Then Soy redirigido al dashboard principal
And Veo un banner persistente que me recuerda "Conecta tu cuenta de Stripe para empezar a recibir pagos"
```

### Technical Notes (iniciales)
- El backend debe generar una URL de onboarding de Stripe Connect (`stripe.accountLinks.create`).
- Se necesita un endpoint en el backend para recibir la redirección de Stripe, intercambiar el código de autorización y guardar el `stripe_account_id`.
- Se debe añadir un campo booleano `onboarding_completed` a la tabla `clinics` para controlar este flujo.

### Definition of Done
- [x] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Deployed to staging
