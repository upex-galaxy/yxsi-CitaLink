# SRS: CitaLink - Especificaciones No Funcionales

**Producto:** CitaLink
**Tipo:** Software Requirements Specification (SRS) - Non-Functional Requirements
**Fecha:** 31 de Octubre de 2025

---

Este documento define los atributos de calidad y las restricciones operativas del sistema CitaLink, alineados con el stack tecnológico (Next.js, Supabase, Vercel).

### 1. Performance

*   **Page Load Time (LCP):** < 2 segundos para el Largest Contentful Paint en el 75% de las visitas.
*   **API Response Time:** < 500ms en el percentil 95 para todas las operaciones CRUD principales (crear, leer, actualizar CitaLinks).
*   **Time to Interactive (TTI):** < 3 segundos en una conexión 4G promedio.
*   **Concurrent Users:** El sistema debe soportar **50 usuarios concurrentes** para el MVP, con capacidad de escalar a **500 usuarios** en v2.
*   **Database Query Time:** < 100ms para consultas simples a la base de datos de Supabase (ej. leer CitaLinks de una clínica).

### 2. Security

*   **Authentication:** Se utilizará el servicio de Supabase Auth, que gestiona la autenticación mediante JWT (JSON Web Tokens).
*   **Authorization:** La autorización inicial se basará en la propiedad de los datos, implementada mediante **Row Level Security (RLS)** en Supabase. La arquitectura debe prever una futura implementación de RBAC (Role-Based Access Control) con roles como `clinic_admin` y `clinic_member`.
*   **Data Encryption:**
    *   **At Rest:** Todos los datos en la base de datos de PostgreSQL de Supabase están cifrados por defecto.
    *   **In Transit:** Toda la comunicación entre el cliente y el servidor será a través de **HTTPS/TLS 1.3**, gestionado automáticamente por Vercel.
*   **Input Validation:** Se implementará validación tanto en el cliente (formularios de Next.js) para una UX fluida, como en el servidor (Supabase Edge Functions / API Routes) como medida de seguridad principal.
*   **Password Policy:** Mínimo 8 caracteres, conteniendo al menos una mayúscula, una minúscula y un número. Se gestionará a través de la configuración de Supabase Auth.
*   **Session Management:** Los JWT de acceso tendrán una vida corta (ej. 1 hora). Se implementará una estrategia de refresh tokens para mantener la sesión del usuario de forma segura por un período más largo (ej. 7 días).
*   **OWASP Top 10:** Se seguirán las mejores prácticas para mitigar las vulnerabilidades comunes. El uso de Supabase y su cliente de JS ayuda a prevenir inyecciones SQL. RLS será la defensa principal contra Broken Access Control.

### 3. Scalability

*   **Database:** Se utilizará PostgreSQL en Supabase, aprovechando **Row Level Security (RLS)** para garantizar un aislamiento de datos (multi-tenancy) seguro y escalable.
*   **CDN:** Todo el contenido estático y las páginas renderizadas se distribuirán a través de la **Vercel Edge Network** para una entrega global rápida.
*   **Caching Strategy:**
    *   **Páginas:** Se usará **Incremental Static Regeneration (ISR)** de Next.js para páginas semi-estáticas (ej. landing page, blog) y Server-Side Rendering (SSR) o Client-Side Rendering (CSR) para el dashboard principal.
    *   **API:** Se configurarán cabeceras `Cache-Control` apropiadas para las respuestas de la API que no requieran datos en tiempo real.
*   **Horizontal Scaling:** La arquitectura será stateless. Las API routes de Next.js se despliegan como **Serverless Functions en Vercel**, que escalan horizontalmente de forma automática según la demanda.
*   **Database Connection Pooling:** Gestionado automáticamente por Supabase a través de **PgBouncer**, optimizando el uso de conexiones a la base de datos.

### 4. Accessibility

*   **WCAG Compliance:** El objetivo es alcanzar el nivel **AA** de las Web Content Accessibility Guidelines (WCAG 2.1).
*   **Keyboard Navigation:** Todas las funcionalidades interactivas, incluyendo formularios y botones, deben ser completamente accesibles y operables usando solo el teclado.
*   **Screen Reader Support:** Se utilizarán etiquetas **ARIA (Accessible Rich Internet Applications)** en elementos críticos (ej. modales, botones sin texto) para garantizar la compatibilidad con lectores de pantalla.
*   **Color Contrast:** El contraste de color entre el texto y el fondo cumplirá un ratio mínimo de **4.5:1** para texto de tamaño normal.
*   **Focus Indicators:** Los indicadores de foco del navegador serán visibles y claros en todos los elementos interactivos.

### 5. Browser Support

*   **Desktop:**
    *   Chrome (últimas 2 versiones)
    *   Firefox (últimas 2 versiones)
    *   Safari (últimas 2 versiones)
    *   Edge (últimas 2 versiones)
*   **Mobile:**
    *   iOS Safari (últimas 2 versiones)
    *   Android Chrome (últimas 2 versiones)

### 6. Reliability

*   **Uptime:** El objetivo de disponibilidad del servicio es del **99.9%**.
*   **Error Rate:** La tasa de error de las peticiones a la API debe ser **< 1%**.
*   **Recovery Time Objective (RTO):** El tiempo objetivo para recuperarse de un incidente crítico que afecte al servicio es de **< 15 minutos**.

### 7. Maintainability

*   **Code Coverage:** Se exigirá una cobertura de código por tests unitarios y de integración superior al **80%**.
*   **Documentation:** El código debe estar documentado. Se mantendrán un `README.md` actualizado, una documentación de la API (si se expone públicamente) y diagramas de arquitectura.
*   **Linting & Formatting:** Se configurará un pipeline de CI (usando GitHub Actions) que fuerce las reglas de **ESLint** y el formato de **Prettier** en cada commit.
*   **TypeScript:** El proyecto se desarrollará en TypeScript con el modo `strict` habilitado para garantizar la máxima seguridad de tipos.
