# SRS: CitaLink - Especificaciones Funcionales

**Producto:** CitaLink
**Tipo:** Software Requirements Specification (SRS) - Functional Specifications
**Fecha:** 31 de Octubre de 2025

---

Este documento traduce las User Stories del PRD en requisitos funcionales específicos que guiarán el desarrollo técnico del MVP.

### EPIC-CL-001: Gestión de Cuentas y Onboarding

**FR-001: El sistema debe permitir el registro de una nueva cuenta de clínica.**
*   **Relacionado a:** EPIC-CL-001, US 1.1
*   **Input:** `clinicName` (string), `email` (string), `password` (string).
*   **Processing:**
    1.  Validar los datos de entrada según las reglas.
    2.  Verificar que el `email` no exista en la tabla `users` de Supabase.
    3.  Hashear la `password` usando un algoritmo seguro (ej. bcrypt).
    4.  Crear un nuevo registro en la tabla `users` y un registro asociado en la tabla `clinics`.
*   **Output:**
    *   **Success:** Objeto `user` con `id`, `email`, `created_at` y un token de sesión (JWT).
    *   **Error:** Mensaje de error descriptivo (ej. "El email ya está en uso", "La contraseña no cumple los requisitos").
*   **Validations:**
    *   `clinicName` no puede estar vacío.
    *   `email` debe tener un formato válido (RFC 5322).
    *   `password` debe tener mínimo 8 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.
    *   El `email` debe ser único en la base de datos.

**FR-002: El sistema debe permitir la autenticación de un usuario existente.**
*   **Relacionado a:** EPIC-CL-001, US 1.2
*   **Input:** `email` (string), `password` (string).
*   **Processing:**
    1.  Buscar al usuario en la tabla `users` por su `email`.
    2.  Si el usuario existe, comparar el `password` proporcionado con el hash almacenado.
    3.  Si la contraseña es correcta, generar un token de sesión (JWT) con el `user_id` y `clinic_id`.
*   **Output:**
    *   **Success:** Token de sesión (JWT).
    *   **Error:** Mensaje de error genérico "Credenciales inválidas".
*   **Validations:**
    *   El usuario debe existir en la base de datos.
    *   La cuenta del usuario no debe estar deshabilitada.

**FR-003: El sistema debe permitir la recuperación de contraseña.**
*   **Relacionado a:** EPIC-CL-001, US 1.3
*   **Input:** `email` (string).
*   **Processing:**
    1.  Buscar al usuario por `email`.
    2.  Si el usuario existe, generar un token de reseteo único y con expiración corta (ej. 1 hora).
    3.  Almacenar el token hasheado en la base de datos asociado al usuario.
    4.  Enviar un email al usuario (usando un servicio como Supabase Auth) con un enlace a la página de reseteo de contraseña, incluyendo el token.
*   **Output:**
    *   **Success:** Mensaje genérico "Si tu email está en nuestro sistema, recibirás un enlace para restablecer tu contraseña". (Para evitar enumeración de usuarios).
*   **Validations:**
    *   El formato del `email` debe ser válido.

**FR-004: El sistema debe gestionar la conexión con la cuenta de Stripe del usuario.**
*   **Relacionado a:** EPIC-CL-001, US 1.4
*   **Input:** Sesión del usuario autenticado.
*   **Processing:**
    1.  El backend genera y redirige al usuario a una URL de Stripe Connect Onboarding.
    2.  Tras completar el flujo en Stripe, el usuario es redirigido de vuelta a CitaLink con un código de autorización.
    3.  El backend intercambia el código por el `stripe_account_id` del usuario.
    4.  Almacena el `stripe_account_id` en el registro de la `clinics` del usuario.
*   **Output:**
    *   **Success:** Redirección al siguiente paso del onboarding o al dashboard.
    *   **Error:** Mensaje de error "No se pudo conectar con Stripe. Por favor, inténtalo de nuevo".
*   **Validations:**
    *   El usuario debe estar autenticado para iniciar el proceso.

### EPIC-CL-002: Configuración de la Clínica

**FR-005: El sistema debe permitir guardar un porcentaje de anticipo por defecto.**
*   **Relacionado a:** EPIC-CL-002, US 2.1
*   **Input:** `defaultDepositPercentage` (number), `clinic_id` (de la sesión).
*   **Processing:** Actualizar el campo `default_deposit_percentage` en la tabla `clinics` para el `clinic_id` correspondiente.
*   **Output:** Mensaje de éxito "Configuración guardada".
*   **Validations:** El valor debe ser un número entre 1 y 100.

**FR-006: El sistema debe permitir guardar una plantilla de mensaje por defecto.**
*   **Relacionado a:** EPIC-CL-002, US 2.2
*   **Input:** `messageTemplate` (string), `clinic_id` (de la sesión).
*   **Processing:** Actualizar el campo `message_template` en la tabla `clinics`.
*   **Output:** Mensaje de éxito "Plantilla guardada".
*   **Validations:** El string no puede estar vacío y debe tener un límite de caracteres (ej. 500).

**FR-007: El sistema debe permitir guardar un tiempo de expiración por defecto.**
*   **Relacionado a:** EPIC-CL-002, US 2.3
*   **Input:** `defaultExpirationHours` (integer), `clinic_id` (de la sesión).
*   **Processing:** Actualizar el campo `default_expiration_hours` en la tabla `clinics`.
*   **Output:** Mensaje de éxito "Configuración guardada".
*   **Validations:** El valor debe ser un número entero positivo.

### EPIC-CL-003: Gestión de CitaLinks

**FR-008: El sistema debe permitir la creación de un nuevo CitaLink.**
*   **Relacionado a:** EPIC-CL-003, US 3.1
*   **Input:** `patientName` (string), `appointmentDateTime` (ISO 8601 datetime), `totalAmount` (number), `clinic_id` (de la sesión).
*   **Processing:**
    1.  Leer la configuración de la clínica (`defaultDepositPercentage`, `defaultExpirationHours`).
    2.  Calcular `depositAmount` = `totalAmount` * (`defaultDepositPercentage` / 100).
    3.  Calcular `expiresAt` = `now()` + `defaultExpirationHours`.
    4.  Generar un `id` único y no secuencial para el CitaLink.
    5.  Crear un nuevo registro en la tabla `appointments` con todos los datos y `status: 'pending'`.
*   **Output:** Objeto `appointment` recién creado.
*   **Validations:** `patientName` no puede estar vacío. `appointmentDateTime` debe ser una fecha futura. `totalAmount` debe ser un número positivo.

**FR-009: La interfaz debe facilitar la copia del CitaLink generado.**
*   **Relacionado a:** EPIC-CL-003, US 3.2
*   **Input:** Evento de clic del usuario en un botón "Copiar".
*   **Processing:** (Frontend) El cliente web utiliza la API del navegador `navigator.clipboard.writeText()` para copiar la URL completa del CitaLink (ej. `https://citalink.com/pay/{appointment_id}`).
*   **Output:** Notificación visual (ej. "¡Copiado!") en la interfaz.
*   **Validations:** N/A (es una acción de cliente).

**FR-010: El sistema debe devolver la lista de CitaLinks de una clínica.**
*   **Relacionado a:** EPIC-CL-003, US 3.3
*   **Input:** `clinic_id` (de la sesión).
*   **Processing:** Consultar la tabla `appointments` filtrando por `clinic_id`. Ordenar los resultados por `appointmentDateTime` descendente.
*   **Output:** Array de objetos `appointment`.
*   **Validations:** El usuario debe estar autenticado y pertenecer a la clínica solicitada.

### EPIC-CL-004: Flujo de Pago del Paciente

**FR-011: El sistema debe mostrar una página de pago pública para un CitaLink.**
*   **Relacionado a:** EPIC-CL-004, US 4.1
*   **Input:** `appointment_id` (desde la URL).
*   **Processing:**
    1.  Buscar el registro en la tabla `appointments` por `appointment_id`.
    2.  Verificar el estado del link. Si `status` es 'confirmed' o 'expired', mostrar una página de estado informativa en lugar del formulario de pago.
    3.  Renderizar una página con los detalles de la cita (`patientName`, `appointmentDateTime`, `depositAmount`) y un formulario para introducir los datos de la tarjeta (usando Stripe Elements).
*   **Output:** Página HTML.
*   **Validations:** Si el `appointment_id` no existe, mostrar un error 404.

**FR-012: El sistema debe procesar el pago de un anticipo a través de Stripe.**
*   **Relacionado a:** EPIC-CL-004, US 4.2
*   **Input:** `appointment_id`, `payment_method_id` (generado por Stripe Elements).
*   **Processing:**
    1.  El backend obtiene los detalles del `appointment` (incluyendo `depositAmount`) y el `stripe_account_id` de la clínica asociada.
    2.  Crea un `PaymentIntent` en Stripe con el importe, la moneda, y el `stripe_account_id` de la clínica como destino de los fondos.
    3.  Confirma el `PaymentIntent`.
*   **Output:**
    *   **Success:** Objeto de confirmación del pago.
    *   **Error:** Mensaje de error de Stripe (ej. "Tarjeta rechazada").
*   **Validations:** El `appointment` debe tener el estado `pending`.

**FR-013: El sistema debe mostrar una página de confirmación de pago exitoso.**
*   **Relacionado a:** EPIC-CL-004, US 4.3
*   **Input:** Evento de pago exitoso en el flujo del cliente.
*   **Processing:** Renderizar una página estática o dinámica que confirme el éxito de la operación.
*   **Output:** Página HTML con mensaje "¡Pago realizado! Tu cita está confirmada".
*   **Validations:** N/A.

### EPIC-CL-005: Dashboard y Automatización de Estados

**FR-014: El sistema debe actualizar el estado de la cita a 'Confirmada' automáticamente.**
*   **Relacionado a:** EPIC-CL-005, US 5.1
*   **Input:** Webhook de Stripe con el evento `payment_intent.succeeded`.
*   **Processing:**
    1.  Una Supabase Edge Function recibe el evento de Stripe.
    2.  Verifica la firma del webhook para asegurar que proviene de Stripe.
    3.  Extrae el `appointment_id` de los metadatos del `PaymentIntent`.
    4.  Actualiza el `status` del registro correspondiente en la tabla `appointments` a `'confirmed'`.
*   **Output:** Respuesta `200 OK` a Stripe para confirmar la recepción del webhook.
*   **Validations:** La firma del webhook debe ser válida. El `appointment` debe existir.

**FR-015: El sistema debe marcar las citas como 'Expiradas'.**
*   **Relacionado a:** EPIC-CL-005, US 5.2
*   **Input:** N/A (proceso interno del sistema).
*   **Processing:**
    1.  Un `cron job` (Supabase Scheduled Function) se ejecuta periódicamente (ej. cada hora).
    2.  Busca en la tabla `appointments` todos los registros con `status: 'pending'` donde `expiresAt` sea anterior a la hora actual.
    3.  Para cada registro encontrado, actualiza su `status` a `'expired'`.
*   **Output:** Registros actualizados en la base de datos.
*   **Validations:** Solo se deben modificar los registros que cumplan ambas condiciones (`pending` y `expiresAt` en el pasado).

**FR-016: El sistema debe calcular y mostrar el total de ingresos por anticipos.**
*   **Relacionado a:** EPIC-CL-005, US 5.3
*   **Input:** `clinic_id` (de la sesión), `time_range` (ej. 'week', 'month').
*   **Processing:**
    1.  Realizar una consulta a la base de datos (SQL) que sume el campo `depositAmount`.
    2.  Filtrar por `clinic_id`, `status: 'confirmed'`, y un rango de fechas (`created_at` o `paid_at`).
*   **Output:** Un objeto JSON con el total: `{ "totalRevenue": 1250.50 }`.
*   **Validations:** El usuario debe estar autenticado.
