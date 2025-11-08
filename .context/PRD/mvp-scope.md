# PRD: CitaLink - Alcance del MVP

**Producto:** CitaLink
**Tipo:** MVP Scope Definition
**Fecha:** 31 de Octubre de 2025

---

## 1. In Scope (Must-Have)

Las siguientes épicas y user stories definen el core funcional del Producto Mínimo Viable (MVP), diseñado para validar nuestras hipótesis de negocio principales con el mínimo esfuerzo de desarrollo.

### **EPIC-CL-001: Gestión de Cuentas y Onboarding**
*   **Epic Title:** Gestión de Cuentas de Clínica
*   **User Stories:**
    *   **US 1.1:** Como Dr. David, quiero poder registrar mi clínica usando un email y contraseña, para crear una cuenta en CitaLink.
    *   **US 1.2:** Como Laura (recepcionista), quiero poder iniciar sesión con las credenciales de la clínica, para acceder a nuestro panel de gestión.
    *   **US 1.3:** Como Dr. David, quiero poder restablecer la contraseña si la olvido, para no perder el acceso a mi cuenta.
    *   **US 1.4:** Como Dr. David, quiero pasar por un onboarding simple la primera vez que inicio sesión, para conectar mi cuenta de Stripe y configurar los datos básicos de mi clínica.

### **EPIC-CL-002: Configuración de la Clínica**
*   **Epic Title:** Configuración de Reglas de Negocio
*   **User Stories:**
    *   **US 2.1:** Como Dr. David, quiero poder establecer un porcentaje de anticipo por defecto (ej. 20%), para no tener que calcularlo cada vez que genero un link.
    *   **US 2.2:** Como Laura, quiero poder definir una plantilla de mensaje para WhatsApp con variables (ej. [nombre_paciente], [link]), para copiar y pegar rápidamente el mensaje de confirmación.
    *   **US 2.3:** Como Dr. David, quiero poder establecer un tiempo de expiración por defecto para los links (ej. 48 horas), para automatizar la liberación de huecos no confirmados.

### **EPIC-CL-003: Gestión de CitaLinks**
*   **Epic Title:** Creación y Visualización de Links de Pago
*   **User Stories:**
    *   **US 3.1:** Como Laura, quiero poder crear un nuevo CitaLink introduciendo manualmente los detalles (nombre del paciente, fecha/hora de la cita, importe total del servicio), para generar el link de pago de anticipo.
    *   **US 3.2:** Como Laura, quiero poder copiar el CitaLink generado con un solo clic, para pegarlo directamente en una conversación de WhatsApp con el paciente.
    *   **US 3.3:** Como Laura, quiero ver una lista simple de todos los links generados con su estado actual (Pendiente, Confirmado, Expirado), para tener una visión rápida de la jornada.

### **EPIC-CL-004: Flujo de Pago del Paciente**
*   **Epic Title:** Experiencia de Pago del Paciente
*   **User Stories:**
    *   **US 4.1:** Como Paciente, quiero poder abrir el link en mi móvil y ver claramente los detalles de mi cita y el importe a pagar, para saber qué estoy confirmando.
    *   **US 4.2:** Como Paciente, quiero poder pagar el anticipo de forma segura usando mi tarjeta de crédito/débito, para confirmar mi cita sin complicaciones.
    *   **US 4.3:** Como Paciente, quiero recibir una confirmación visual inmediata en pantalla después del pago, para saber que el proceso ha sido exitoso.

### **EPIC-CL-005: Dashboard y Automatización de Estados**
*   **Epic Title:** Dashboard Principal y Actualizaciones Automáticas
*   **User Stories:**
    *   **US 5.1:** Como Laura, quiero que el estado de una cita en el dashboard cambie automáticamente de `Pendiente` a `Confirmada` cuando un paciente completa el pago, para no tener que comprobarlo manualmente.
    *   **US 5.2:** Como Laura, quiero que el estado de una cita cambie a `Expirada` si el paciente no ha pagado antes de la fecha límite, para saber que el hueco está disponible de nuevo.
    *   **US 5.3:** Como Dr. David, quiero ver en el dashboard un contador simple del total de ingresos recaudados por anticipos esta semana/mes, para entender el impacto financiero de la herramienta.

---

## 2. Out of Scope (Nice-to-Have for v2+)

Para asegurar un lanzamiento rápido y enfocado, las siguientes funcionalidades quedan explícitamente fuera del alcance del MVP:

*   **Integraciones Avanzadas:**
    *   Sincronización bidireccional con calendarios (Google Calendar, Outlook).
    *   Integración directa con Software de Gestión de Clínicas (PMS).
*   **Gestión de Usuarios y Roles:**
    *   Múltiples cuentas de usuario (recepcionistas, doctores) con diferentes niveles de permiso para una misma clínica.
*   **Comunicaciones Automatizadas:**
    *   Envío automático de links, recordatorios o confirmaciones por SMS/Email desde la plataforma.
*   **Flexibilidad de Pagos y Políticas:**
    *   Gestión de reembolsos o cancelaciones desde el dashboard.
    *   Políticas de cancelación complejas (ej. reembolso del 50% si se cancela con 48h de antelación).
    *   Múltiples métodos de pago (PayPal, Bizum, etc.).
*   **Funcionalidades de Agenda:**
    *   Lista de espera para reasignar automáticamente huecos liberados.
    *   Un calendario completo dentro de CitaLink.
*   **Analítica Avanzada:**
    *   Reportes detallados sobre tasas de conversión, tiempos promedio de pago, etc.

---

## 3. Success Criteria

El MVP se considerará un éxito y estará listo para un lanzamiento más amplio si cumple las siguientes condiciones:

*   **Criterios de Aceptación Funcional:**
    *   El flujo completo (crear link -> enviar -> paciente paga -> estado se actualiza) es funcional y ha sido probado de extremo a extremo sin errores críticos.
    *   La integración con Stripe para procesar pagos es segura y fiable.
    *   La aplicación es usable y responsive en los principales navegadores web de escritorio y móvil.

*   **Métricas Mínimas a Alcanzar (a los 3 meses del lanzamiento):**
    *   **Adopción:** Al menos 20 clínicas activas.
    *   **Engagement:** La tasa de conversión de pago por parte del paciente se mantiene por encima del 60%.
    *   **Feedback Cualitativo:** Al menos el 50% de las clínicas encuestadas reportan una "reducción notable" del tiempo administrativo y de los no-shows.

*   **Condiciones para el Lanzamiento (Go/No-Go):**
    *   El producto ha pasado una auditoría de seguridad básica (especialmente en el flujo de pago).
    *   Existe una página de marketing (landing page) y un canal de soporte (email/chat) funcionales.
    *   La documentación legal (Términos de Servicio, Política de Privacidad) está publicada.
