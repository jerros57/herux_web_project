# herUX — Comunidad de Mujeres en UX

Sitio web oficial, minimalista y responsivo para la comunidad **herUX**, enfocado en la difusión del diseño centrado en el usuario, la investigación UX, la formación continua y la visibilidad del talento femenino en la industria digital.

---

## 📌 Tabla de Contenidos
- [Sobre la Comunidad](#-sobre-la-comunidad)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Paleta de Colores y Guía de Estilos](#-paleta-de-colores-y-guía-de-estilos)
- [Secciones del Sitio](#-secciones-del-sitio)
- [Funcionalidad del Formulario de Contacto](#-funcionalidad-del-formulario-de-contacto)
- [Puesta en Marcha](#-puesta-en-marcha)
- [Créditos](#-créditos)

---

## 💜 Sobre la Comunidad

**herUX** es una red creada para conectar, inspirar y abrir oportunidades a las mujeres en el campo de la Experiencia de Usuario.

- **Visión:** Empoderar a las mujeres en la Experiencia del Usuario para formar una red de profesionales con oportunidades laborales.
- **Misión:** Promover una cultura de desarrollo profesional y personal para construir una red de apoyo en el descubrimiento y cumplimiento de nuestro propósito de vida.
- **Propósito:** Aprender y enseñar a otras mujeres desde la experiencia personal y profesional para empoderarnos mutuamente.

---

## 📁 Estructura del Proyecto

El repositorio está organizado de forma modular, separando la estructura, los estilos y el comportamiento:

```text
herux_web_project/
│
├── index.html              # Estructura semántica principal
│
├── css/
│   └── styles.css          # Estilos CSS responsivos (Mobile-First)
│
├── js/
│   └── main.js             # Lógica del menú y envío asíncrono del formulario
│
├── assets/
│   ├── img/                # Fotografías, vectores e iconos
│   │   ├── logo-herux.svg
│   │   └── olga-tohabanda.jpg
│   └── icons/              # Recursos adicionales de interfaz
│
└── README.md               # Documentación general del proyecto
```

---

## 🎨 Paleta de Colores y Guía de Estilos

Los colores fueron extraídos directamente de la identidad visual de herUX:

| Elemento | Nombre / Uso | Código HEX |
| :--- | :--- | :--- |
| **Primario** | Violeta/Púrpura Insignia | `#8C247B` |
| **Primario Oscuro** | Contraste de encabezados y footer | `#511446` |
| **Primario Claro** | Acentos y estados hover | `#A9449E` |
| **Fondo Suave** | Fondo de contenedores y cards | `#FAF4F9` |
| **Bordes** | Separadores y líneas de apoyo | `#F0DEED` |
| **Texto Principal** | Alto contraste y legibilidad | `#201724` |
| **Texto Secundario** | Descripciones y subtítulos | `#64566A` |

- **Tipografía:** `Plus Jakarta Sans` o `Inter` (Sans-Serif moderna con excelente jerarquía visual).
- **Enfoque de Diseño:** Minimalista, limpio, accesible (cumplimiento de contraste WCAG AA) y 100% adaptable a dispositivos móviles.

---

## 📄 Secciones del Sitio

1. **Header / Navbar:** Logo vectorial `herUX`, enlaces de navegación y botón de acción directa.
2. **Hero:** Propuesta de valor clara, botones CTA (*Únete a la comunidad* / *Conócenos*) y métricas de impacto.
3. **¿Quiénes Somos? (Pilares):** Tarjetas interactivas con la **Visión**, **Misión** y **Propósito**.
4. **Cultura, Beneficios y Proyectos:**
   - **Cultura:** Honesta, Proactiva, Amigable, Respetuosa, Empática, Comprometida.
   - **Beneficios:** Desarrollo profesional, desarrollo personal, oportunidad laboral y visibilidad.
   - **Proyectos:** Comunicación & RRSS, eventos externos, eventos internos y voluntariado.
5. **Fundadora:** Reseña destacada de **Olga Tohabanda Duchi** (UX Researcher y facilitadora de talleres como *"UX Aplicado a distintos perfiles profesionales"*).
6. **Contacto y Redes Sociales:**
   - Enlaces directos a canales comunitarios (LinkedIn, Instagram, TikTok, WhatsApp).
   - Formulario con validación en tiempo real y consumo de API asíncrona.
7. **Footer:** Información legal, créditos y enlaces de acceso rápido.

---

## ⚙️ Funcionalidad del Formulario de Contacto

El formulario se procesa de forma asíncrona mediante la API de **FormSubmit**:

- **Endpoint:** `https://formsubmit.co/ajax/dependecia37@gmail.com`
- **Método:** `POST` con encabezados `'Content-Type': 'application/json'` y `'Accept': 'application/json'`.
- **Validaciones incluidas:**
  - Comprobación de campos obligatorios vacíos (`nombre`, `correo`, `mensaje`).
  - Validación de expresión regular para formato correcto de correo electrónico.
  - Bloqueo preventivo del botón de envío (`submitBtn.disabled = true`) durante el proceso de petición.
  - Limpieza reactiva del contenedor de alertas mediante el evento `input`.

---

## 🚀 Puesta en Marcha

1. Descarga o clona la carpeta del proyecto:
   ```bash
   git clone <url-del-repositorio>
   cd herux_web_project
   ```
2. Abre el archivo `index.html` en tu navegador o levanta un servidor local:
   - Con la extensión **Live Server** de Visual Studio Code.
   - O mediante terminal con Python:
     ```bash
     python -m http.server 8000
     ```
3. Accede a `http://localhost:8000` en tu navegador.

---

## 👩‍💻 Créditos

- **Comunidad:** herUX
- **Fundadora:** Olga Tohabanda Duchi
- **Creador Web:** Jeremy Molina Sánchez
- **Especialidad:** UX Research, Diseño de Experiencia de Usuario y Mentoría