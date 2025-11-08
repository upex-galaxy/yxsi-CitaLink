# PRD: CitaLink - User Journeys

**Producto:** CitaLink
**Tipo:** User Journey Mapping
**Fecha:** 31 de Octubre de 2025

---

## Journey 1: Registro y Creación del Primer CitaLink (Happy Path)

*   **Journey Title:** Onboarding de una nueva clínica y envío de la primera confirmación.
*   **Persona:** Dr. David, el Dueño de la Clínica.
*   **Scenario:** El Dr. David ha oído hablar de CitaLink a través de un colega y decide probarlo para ver si puede reducir los no-shows en su centro de fisioterapia. Quiere registrarse y enviar un primer link de prueba.
*   **Expected Outcome:** El Dr. David ha creado una cuenta, configurado los ajustes básicos, y ha generado y copiado su primer CitaLink, listo para ser enviado a un paciente por WhatsApp.

### Steps:

| Step | User Action | System Response | Potential Pain Point |
| :--- | :--- | :--- | :--- |
| 1 | Dr. David visita la landing page de CitaLink y hace clic en "Registrarse Gratis". | Muestra un formulario simple: Nombre de la Clínica, Email, Contraseña. | El formulario pide demasiados datos o no es claro en su propuesta de valor. |
| 2 | Completa el formulario y hace clic en "Crear Cuenta". | Valida los datos. Crea la cuenta en Supabase. Redirige al Dr. David a un flujo de onboarding. | La validación de la contraseña es demasiado estricta o poco clara. El email ya está en uso y el mensaje de error es genérico. |
| 3 | En el primer paso del onboarding, el sistema le pide conectar su cuenta de Stripe. Hace clic en "Conectar con Stripe". | Redirige a la página de conexión segura de Stripe. | El usuario no tiene una cuenta de Stripe o no entiende por qué es necesario, generando desconfianza. |
| 4 | Inicia sesión en Stripe y autoriza la conexión con CitaLink. | Stripe lo redirige de vuelta a CitaLink. El sistema confirma que la conexión fue exitosa. | El proceso de redirección falla o tarda demasiado, dejando al usuario en una página en blanco. |
| 5 | En el segundo paso del onboarding, configura sus ajustes iniciales: % de anticipo (ej. 25%) y moneda (ej. EUR). | Guarda la configuración en la base de datos. Muestra un mensaje de "¡Todo listo!" y lo redirige al Dashboard principal. | Los campos no son claros o no hay valores por defecto que lo guíen. |
| 6 | En el Dashboard, ve un botón grande que dice "Crear Nuevo CitaLink". Hace clic en él. | Abre un modal o formulario para introducir los datos de la cita: Nombre del paciente, Fecha/Hora, Importe total del servicio. | El formulario es confuso o requiere calcular manualmente el anticipo (debería ser automático). |
| 7 | Rellena los datos de una cita de prueba. El sistema calcula automáticamente el anticipo a pagar. Hace clic en "Generar Link". | Cierra el modal y muestra el nuevo link en la lista del dashboard con el estado "Pendiente". Aparece un botón de "Copiar Link". | La creación del link es lenta. No queda claro qué hacer a continuación. |
| 8 | Hace clic en "Copiar Link". | El link se copia al portapapeles. Muestra una notificación sutil: "¡Link copiado!". | La notificación es molesta o no es evidente que el link se ha copiado, llevando al usuario a hacer clic varias veces. |

### Alternative Paths / Edge Cases:

*   **¿Qué pasa si el email ya está registrado?** El sistema debe mostrar un error claro "Este email ya está en uso. ¿Quieres <a href='/login'>iniciar sesión</a>?".
*   **¿Qué pasa si la conexión con Stripe falla?** El sistema debe mostrar un mensaje de error amigable y permitirle reintentar la conexión sin perder el progreso del registro.
*   **¿Qué pasa si el usuario cierra la ventana durante el onboarding?** La próxima vez que inicie sesión, el sistema debe detectar que el onboarding no se completó y redirigirlo al paso en el que se quedó.

---

## Journey 2: Gestión de un Pago de Paciente (Happy Path & Edge Case)

*   **Journey Title:** Flujo de pago del paciente y actualización del estado.
*   **Persona:** Laura (Recepcionista) y un Paciente.
*   **Scenario:** Laura acaba de agendar una cita para un paciente nuevo por teléfono. Ahora, le envía el CitaLink por WhatsApp para confirmar la reserva.
*   **Expected Outcome:** El paciente paga exitosamente y Laura ve la cita actualizada a "Confirmada" en su dashboard sin intervención manual.

### Steps:

| Step | User Action | System Response | Potential Pain Point |
| :--- | :--- | :--- | :--- |
| 1 | **(Laura)** Pega el CitaLink en el chat de WhatsApp del paciente y envía el mensaje. | (WhatsApp) Muestra una vista previa del link con el título de la página de CitaLink. | La vista previa del link es genérica y no inspira confianza (ej. solo la URL). |
| 2 | **(Paciente)** Recibe el mensaje y hace clic en el link. | Se abre una página de pago simple y responsive, mostrando los detalles de la cita (servicio, fecha, hora) y el importe a pagar. | La página tarda en cargar. Los detalles de la cita son incorrectos. El diseño parece poco profesional. |
| 3 | **(Paciente)** Introduce los datos de su tarjeta de crédito y hace clic en "Pagar y Confirmar". | **(Happy Path)** El sistema procesa el pago vía Stripe. Muestra una pantalla de "¡Pago exitoso! Tu cita está confirmada". | **(Edge Case)** La tarjeta es rechazada. El sistema muestra un error claro: "El pago fue rechazado por tu banco. Por favor, intenta con otra tarjeta o contacta a la clínica". |
| 4 | **(Paciente)** Cierra la página, satisfecho. | **(Happy Path)** El sistema envía un webhook desde Stripe a Supabase. Una Edge Function procesa el evento. | **(Edge Case)** El webhook de Stripe se retrasa o falla. |
| 5 | **(Laura)** Está viendo el dashboard de CitaLink. | **(Happy Path)** La fila correspondiente a la cita del paciente se actualiza en tiempo real (o casi), cambiando su estado de `Pendiente` a `Confirmada` con un indicador visual verde. | **(Edge Case)** Debido al fallo del webhook, el estado no se actualiza. Laura cree que el paciente no ha pagado, pudiendo generar una llamada innecesaria. |

### Alternative Paths / Edge Cases:

*   **¿Qué pasa si el paciente intenta pagar un link expirado?** La página de pago debe mostrar un mensaje claro: "Este link de pago ha expirado. Por favor, contacta a la clínica para solicitar uno nuevo".
*   **¿Qué pasa si el paciente abre el link pero no paga?** El estado en el dashboard de Laura permanece como `Pendiente`. Si el tiempo límite se cumple, pasará a `Expirado`.
*   **¿Qué pasa si el webhook de Stripe falla?** Debe existir un mecanismo de reintento. Como fallback, se podría tener un job nocturno que reconcilie los pagos de Stripe con los estados en la base de datos para corregir discrepancias.
