/**
 * herUX - Lógica JavaScript Modular
 * - Menú Móvil responsivo (con control de eventos táctiles/click)
 * - Modo Oscuro con cambio dinámico de logos y persistencia en LocalStorage
 * - Envío Asíncrono de FormSubmit con validaciones y feedback reactivo
 */

document.addEventListener('DOMContentLoaded', () => {
  iniciarNavegacionMovil();
  iniciarModoOscuro();
  configurarFormularioContacto();
});

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA)
   ========================================================================== */
function iniciarNavegacionMovil() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn-link');

  if (!toggleBtn || !navMenu) return;

  // Alternar apertura/cierre del menú
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Cerrar el menú al pulsar cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar el menú si se hace click fuera de él
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   2. MODO OSCURO (DARK MODE) + CAMBIO DE LOGOS
   ========================================================================== */
function iniciarModoOscuro() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const icon = themeToggle.querySelector('i');

  // Función para alternar el archivo de imagen de todos los logos
  const actualizarLogos = (esOscuro) => {
    const rutaLogo = esOscuro ? 'img/logo-herux-white.png' : 'img/logo-herux.png';
    const logos = document.querySelectorAll('.logo-img, .hero-logo-img, .footer-logo-img');
    logos.forEach(img => {
      img.src = rutaLogo;
    });
  };

  // Aplicar tema en el elemento body
  const aplicarTema = (tema) => {
    if (tema === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      if (icon) icon.className = 'fa-solid fa-sun';
      actualizarLogos(true);
    } else {
      document.body.removeAttribute('data-theme');
      if (icon) icon.className = 'fa-solid fa-moon';
      actualizarLogos(false);
    }
  };

  // Leer preferencia guardada o preferencia del navegador
  const savedTheme = localStorage.getItem('herux-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const temaInicial = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

  aplicarTema(temaInicial);

  // Evento click para alternar entre claro y oscuro
  themeToggle.addEventListener('click', () => {
    const esOscuro = document.body.getAttribute('data-theme') === 'dark';
    const nuevoTema = esOscuro ? 'light' : 'dark';
    localStorage.setItem('herux-theme', nuevoTema);
    aplicarTema(nuevoTema);
  });
}

/* ==========================================================================
   3. FORMULARIO ASÍNCRONO (FORMSUBMIT)
   ========================================================================== */
function validarFormatoCorreo(correo) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

function mostrarFeedback(mensaje, tipo) {
  const feedbackBox = document.getElementById('form-feedback');
  if (!feedbackBox) return;
  feedbackBox.textContent = mensaje;
  feedbackBox.className = `form-feedback ${tipo}`;
}

function configurarFormularioContacto() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('btn-submit');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validaciones condicionales (if / else)
    if (nombre === '' || correo === '' || mensaje === '') {
      mostrarFeedback('Por favor, completa todos los campos obligatorios.', 'error');
      alert('⚠️ Por favor, completa todos los campos del formulario.');
      return;
    }

    if (!validarFormatoCorreo(correo)) {
      mostrarFeedback('Por favor, ingresa un correo electrónico válido.', 'error');
      alert('⚠️ El correo electrónico ingresado no tiene un formato válido.');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    mostrarFeedback('Enviando mensaje...', 'info');

    try {
      // Petición asíncrona a FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/info@heruxec.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nombre,
          email: correo,
          message: mensaje,
          _subject: `Nuevo mensaje de ${nombre} desde la web herUX`
        })
      });

      if (response.ok) {
        mostrarFeedback(`¡Gracias por tu mensaje, ${nombre}! Ha sido enviado con éxito.`, 'success');
        alert(`✅ ¡Mensaje enviado con éxito!\n\nGracias ${nombre}, revisaremos tu mensaje a la brevedad.`);
        contactForm.reset();
      } else {
        mostrarFeedback('Hubo un problema al procesar el mensaje.', 'error');
        alert('❌ Ocurrió un error en el servidor al despachar el correo.');
      }
    } catch (error) {
      console.error('Error de red al conectar con FormSubmit:', error);
      mostrarFeedback('Error de conexión al enviar el formulario.', 'error');
      alert('❌ Error de conexión al procesar el envío.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // Limpieza reactiva del contenedor de alertas al escribir
  contactForm.addEventListener('input', () => {
    const feedbackBox = document.getElementById('form-feedback');
    if (feedbackBox && feedbackBox.textContent !== '') {
      feedbackBox.textContent = '';
      feedbackBox.className = 'form-feedback';
    }
  });
}