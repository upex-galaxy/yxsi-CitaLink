# CitaLink - Epic & Story Tree (MVP)

`PROYECTO: CitaLink (CL)`

---

### EPIC-CL-1: Gestión de Cuentas y Onboarding
├── **STORY-CL-1:** Como Dr. David, quiero poder registrar mi clínica usando un email y contraseña, para crear una cuenta en CitaLink.
├── **STORY-CL-2:** Como Laura (recepcionista), quiero poder iniciar sesión con las credenciales de la clínica, para acceder a nuestro panel de gestión.
├── **STORY-CL-3:** Como Dr. David, quiero poder restablecer la contraseña si la olvido, para no perder el acceso a mi cuenta.
└── **STORY-CL-4:** Como Dr. David, quiero pasar por un onboarding simple la primera vez que inicio sesión, para conectar mi cuenta de Stripe y configurar los datos básicos de mi clínica.

---

### EPIC-CL-2: Configuración de la Clínica
├── **STORY-CL-5:** Como Dr. David, quiero poder establecer un porcentaje de anticipo por defecto (ej. 20%), para no tener que calcularlo cada vez que genero un link.
├── **STORY-CL-6:** Como Laura, quiero poder definir una plantilla de mensaje para WhatsApp con variables (ej. [nombre_paciente], [link]), para copiar y pegar rápidamente el mensaje de confirmación.
└── **STORY-CL-7:** Como Dr. David, quiero poder establecer un tiempo de expiración por defecto para los links (ej. 48 horas), para automatizar la liberación de huecos no confirmados.

---

### EPIC-CL-3: Gestión de CitaLinks
├── **STORY-CL-8:** Como Laura, quiero poder crear un nuevo CitaLink introduciendo manualmente los detalles (nombre del paciente, fecha/hora de la cita, importe total del servicio), para generar el link de pago de anticipo.
├── **STORY-CL-9:** Como Laura, quiero poder copiar el CitaLink generado con un solo clic, para pegarlo directamente en una conversación de WhatsApp con el paciente.
└── **STORY-CL-10:** Como Laura, quiero ver una lista simple de todos los links generados con su estado actual (Pendiente, Confirmado, Expirado), para tener una visión rápida de la jornada.

---

### EPIC-CL-4: Flujo de Pago del Paciente
├── **STORY-CL-11:** Como Paciente, quiero poder abrir el link en mi móvil y ver claramente los detalles de mi cita y el importe a pagar, para saber qué estoy confirmando.
├── **STORY-CL-12:** Como Paciente, quiero poder pagar el anticipo de forma segura usando mi tarjeta de crédito/débito, para confirmar mi cita sin complicaciones.
└── **STORY-CL-13:** Como Paciente, quiero recibir una confirmación visual inmediata en pantalla después del pago, para saber que el proceso ha sido exitoso.

---

### EPIC-CL-5: Dashboard y Automatización de Estados
├── **STORY-CL-14:** Como Laura, quiero que el estado de una cita en el dashboard cambie automáticamente de `Pendiente` a `Confirmada` cuando un paciente completa el pago, para no tener que comprobarlo manualmente.
├── **STORY-CL-15:** Como Laura, quiero que el estado de una cita cambie a `Expirada` si el paciente no ha pagado antes de la fecha límite, para saber que el hueco está disponible de nuevo.
└── **STORY-CL-16:** Como Dr. David, quiero ver en el dashboard un contador simple del total de ingresos recaudados por anticipos esta semana/mes, para entender el impacto financiero de la herramienta.
