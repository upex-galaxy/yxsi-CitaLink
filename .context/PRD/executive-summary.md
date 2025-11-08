# PRD: CitaLink - Resumen Ejecutivo (MVP)

**Producto:** CitaLink
**Tipo:** Product Requirements Document (PRD) - Executive Summary
**Fecha:** 31 de Octubre de 2025

---

## 1. Problem Statement

Las clínicas y centros de estética que gestionan su agenda por citas pierden ingresos significativos y eficiencia operativa debido a **inasistencias (no-shows) y cancelaciones tardías**. El proceso actual de confirmación es manual, principalmente a través de WhatsApp o llamadas, consumiendo horas de trabajo administrativo que es propenso a errores, difícil de trazar y genera fricción con el paciente al no existir una política de cancelación formalizada y fácil de aplicar. 

Este desorden operativo no solo impacta directamente el flujo de caja, sino que también sobrecarga al personal y priva a los dueños de las clínicas de datos fiables para optimizar la ocupación de su agenda y tomar decisiones de negocio.

## 2. Solution Overview

Construiremos **CitaLink**, una aplicación web (SaaS) minimalista que permite a las clínicas asegurar el compromiso de sus pacientes mediante la creación de **enlaces de pago de anticipo únicos y con tiempo de expiración**. La solución se integra en el flujo de trabajo existente del personal de la clínica (agendar y comunicar por WhatsApp/SMS) en lugar de reemplazarlo.

**Features Core del MVP:**

*   **Generador de Links de Pago:** Desde un panel simple, el personal crea un link para una cita específica, definiendo el monto del anticipo y la fecha/hora de expiración.
*   **Página de Pago para el Paciente:** Una página de pago responsive y segura donde el paciente introduce sus datos y paga el anticipo con tarjeta, sin necesidad de registrarse o descargar una app.
*   **Dashboard de Estado de Citas:** Un panel centralizado para que la clínica visualice en tiempo real el estado de cada cita enviada: `Pendiente`, `Confirmada` (pagada) o `Expirada`.
*   **Automatización vía Webhooks:** Integración con la pasarela de pago (vía Supabase Edge Functions) para actualizar automáticamente el estado de la cita cuando el pago se completa o falla.
*   **Configuración Simple:** Panel de ajustes para que la clínica configure el porcentaje de anticipo por defecto, las plantillas de mensajes y las horas de expiración.

CitaLink resuelve el problema al formalizar el compromiso de la cita de una manera profesional y automatizada, reduciendo los no-shows, mejorando el cash-flow y liberando al personal administrativo.

---

## 3. Success Metrics (KPIs)

Para medir el éxito del MVP, nos centraremos en las siguientes métricas durante los primeros 3 meses post-lanzamiento:

*   **Métricas de Adopción:**
    *   **Clinic Activation Rate:** > 40% de las clínicas que se registran deben configurar su cuenta y enviar su primer CitaLink en la primera semana.
    *   **Número de Clínicas Activas:** Alcanzar 50 clínicas activas (def. como >5 links enviados/semana).

*   **Métricas de Engagement:**
    *   **Patient Payment Conversion Rate:** > 70% de los links de pago enviados deben ser completados exitosamente por los pacientes.
    *   **Links Creados por Clínica Activa:** Un promedio de > 15 links/semana por clínica activa, demostrando que la herramienta se integra en su operativa diaria.

*   **Métricas de Negocio:**
    *   **Reducción de No-Show (Cualitativa):** Encuestas a clínicas activas para validar que perciben una reducción de al menos el 50% en las inasistencias.
    *   **Monthly Recurring Revenue (MRR):** Alcanzar un MRR de €1,000 al final del tercer mes.

---

## 4. Target Users (User Personas)

Los perfiles de usuario detallados que guían el diseño y desarrollo de CitaLink son **"Laura, la Recepcionista Desbordada"** y **"Dr. David, el Dueño de la Clínica"**.

El documento completo con la descripción de sus objetivos, frustraciones y características se encuentra en: `user-personas.md`.
