# Business Model Canvas: CitaLink (MVP)

**Project:** CitaLink - Confirmación de citas con pago de anticipo.
**Vision:** Convertir cada cita agendada en un compromiso real, eliminando la incertidumbre y el desorden operativo para las clínicas.

---

## 1. Problem Statement

Las clínicas y centros de salud/estética que operan con agenda por cita enfrentan una fricción operativa y financiera constante. La principal fuente de pérdidas son los "no-shows" (pacientes que no asisten) y las cancelaciones de última hora, que dejan huecos en la agenda imposibles de rellenar. Esta inasistencia no solo representa una pérdida directa de ingresos, sino que también genera un coste administrativo elevado, ya que el personal invierte horas en confirmaciones manuales a través de llamadas o WhatsApp, un proceso poco trazable, propenso a errores y difícil de auditar.

Adicionalmente, la ausencia de una política de cancelación clara y fácil de aplicar crea una tensión en la relación con el paciente. Las clínicas temen exigir un compromiso más firme por miedo a parecer demasiado estrictas o a generar fricción. No existe un mecanismo estándar que actúe como una señal de intención de compra, como un pequeño anticipo o una preautorización, que permita priorizar a los pacientes verdaderamente comprometidos. El resultado es un ciclo de agendas desordenadas, ingresos perdidos, personal administrativo sobrecargado y una falta de datos fiables para optimizar la gestión de la capacidad.

## 2. MVP Hypothesis

Para validar el modelo de negocio, el MVP se centrará en probar las siguientes hipótesis clave:

1.  **Hipótesis de Adopción (Clínica):** Las micro y pequeñas clínicas **adoptarán activamente** una solución de pago de anticipo si esta se integra de forma nativa en su flujo de comunicación actual (WhatsApp/SMS), no requiere software complejo y demuestra una **reducción de tiempo administrativo de al menos un 30%** en la primera semana de uso.
2.  **Hipótesis de Conversión (Paciente):** Más del **70% de los pacientes** a los que se les envíe un CitaLink **completarán el pago del anticipo** antes de la fecha de expiración, validando que la conveniencia y la simplicidad del proceso superan la barrera de realizar un pago por adelantado.
3.  **Hipótesis de Impacto (Negocio):** El uso de CitaLink durante un mes permitirá a las clínicas **reducir su tasa de "no-shows" en al menos un 50%** y mejorar su flujo de caja, demostrando un ROI claro y justificando una suscripción de pago.

---

## 3. Business Model Canvas

| **Sección** | **Contenido del MVP** |
| :--- | :--- |
| **Customer Segments** | **Segmento Principal (Early Adopters):**<br>• **Micro-clínicas y centros (1-5 profesionales)** de odontología, fisioterapia, medicina estética, psicología.<br>• **Estudios de alto valor por cita:** Tatuajes, micropigmentación, wellness.<br><br>**Características Clave:**<br>• Gestionan su agenda con herramientas simples (Google Calendar, agenda de papel, Excel).<br>• La comunicación y confirmación con el paciente es **casi exclusivamente vía WhatsApp**.<br>• Sufren una tasa de no-show >15% y no tienen políticas de cancelación formalizadas. |
| **Value Propositions** | **Para la Clínica:**<br>1.  **Reducción drástica de "no-shows":** Asegura el compromiso del paciente con un anticipo, liberando huecos con tiempo si no se confirma.<br>2.  **Automatización 100% trazable:** Elimina las llamadas y mensajes manuales de confirmación. Cada estado (pagado, expirado, cancelado) se actualiza solo.<br>3.  **Mejora del flujo de caja:** Recibe un porcentaje del servicio por adelantado.<br>4.  **Profesionalización de políticas:** Aplica reglas de cancelación de forma automática y sin confrontación.<br><br>**Para el Paciente:**<br>• **Experiencia sin fricción:** Confirma en un clic desde su móvil, sin apps ni registros.<br>• **Claridad y confianza:** Las reglas son claras desde el inicio. Recibe un comprobante instantáneo. |
| **Channels** | 1.  **Marketing Digital Dirigido:** Campañas en Instagram/Facebook y Google Ads segmentadas por profesión ("odontólogo", "fisioterapeuta") y geolocalización, usando como gancho "reduce los plantones en tu clínica".<br>2.  **Contenido Educativo:** Blog y posts en redes sociales sobre gestión de clínicas, optimización de agendas y cómo calcular el coste de un "no-show".<br>3.  **Programa de Referidos (Simple):** Descuento en la suscripción para clínicas que traigan a otras. |
| **Customer Relationships** | • **Self-Service y Automatizada:** Onboarding 100% digital. El usuario puede registrarse, configurar sus reglas y empezar a usarlo en minutos.<br>• **Soporte por Chat/Email:** Canal de soporte reactivo para dudas y problemas técnicos, gestionado por un equipo pequeño.<br>• **Base de Conocimiento (FAQ):** Una sección de ayuda con las preguntas más comunes sobre configuración y uso. |
| **Revenue Streams** | **Modelo Híbrido (bajo riesgo para el cliente):**<br>1.  **Suscripción Mensual (SaaS):** Una tarifa fija y asequible por clínica/centro, con un tier inicial para el MVP (p. ej., **€29/mes** para hasta 5 profesionales).<br>2.  **Comisión por Transacción Exitosa:** Un pequeño porcentaje (p. ej., **0.5% - 1%**) sobre el monto del anticipo procesado. Esto alinea los incentivos: solo ganamos si la clínica confirma citas.<br><br>*No se cobra por la comisión de la pasarela de pago (Stripe, etc.), que es aparte.* |
| **Key Resources** | • **Plataforma CitaLink (Software):** El código fuente, la arquitectura cloud y la base de datos.<br>• **Integración con Pasarela de Pagos:** Una integración robusta y segura con un proveedor líder (p. ej., Stripe) para procesar los pagos y gestionar los webhooks.<br>• **Equipo Técnico (MVP):** 1-2 desarrolladores full-stack para construir y mantener la plataforma.<br>• **Dominio y Marca:** `CitaLink.com` (o similar) y la identidad visual. |
| **Key Activities** | • **Desarrollo de Producto:** Construcción y mantenimiento de la plataforma web, el generador de links y el dashboard de la clínica.<br>• **Gestión de la Infraestructura Cloud:** Asegurar la disponibilidad, seguridad y escalabilidad del servicio.<br>• **Marketing y Adquisición de Usuarios:** Ejecución de las campañas definidas en "Channels".<br>• **Soporte al Cliente:** Responder a las consultas y resolver incidencias. |
| **Key Partners** | • **Pasarelas de Pago:** **Stripe** es el partner tecnológico fundamental para el MVP por su facilidad de integración, manejo de webhooks y seguridad.<br>• **Proveedores de Cloud:** (p. ej., Vercel, AWS, Google Cloud) para alojar la aplicación.<br>• **(Futuro, no MVP) Software de Gestión de Clínicas (PMS):** Identificar 1-2 PMS populares entre el target para una futura integración vía API. |
| **Cost Structure** | • **Costes de Personal:** Salarios del equipo de desarrollo (principal coste fijo).<br>• **Costes de Infraestructura:** Hosting de la aplicación, base de datos, dominio (coste variable bajo).<br>• **Costes de Marketing y Ventas:** Inversión en campañas de anuncios digitales (coste variable).<br>• **Comisiones de Plataformas:** Cuotas de la pasarela de pago (aunque se repercuten) y otros servicios SaaS (monitorización, etc.). |
