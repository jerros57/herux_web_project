/**
 * herUX - Lógica JavaScript Modular
 * - Menú Móvil
 * - Validación de Formato de Correo
 * - Feedback Visual
 * - Manejo Asíncrono de FormSubmit (Requisito estricto)
 */
document.addEventListener('DOMContentLoaded', () => {
  iniciarNavegacionMovil();
  configurarFormularioContacto();
  iniciarModoOscuro();
});

document.addEventListener('DOMContentLoaded', () => {
  iniciarNavegacionMovil();
  configurarFormularioContacto();
});

// Menú Móvil responsivo
function iniciarNavegacionMovil() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Función auxiliar para validar correo
function validarFormatoCorreo(correo) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(correo);
}

// Función auxiliar para mostrar retroalimentación accesible en UI
function mostrarFeedback(mensaje, tipo) {
  const feedbackBox = document.getElementById('form-feedback');
  if (!feedbackBox) return;
  feedbackBox.textContent = mensaje;
  feedbackBox.className = `form-feedback ${tipo}`;
}

// Requisito: Eventos submit/input y consumo asíncrono con FormSubmit
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

    submitBtn.disabled = true;
    mostrarFeedback('Enviando mensaje...', 'info');

    try {
      // Petición asíncrona a FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/dependecia37@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nombre,
          email: correo,
          message: mensaje,
          _subject: `Nuevo mensaje de ${nombre} desde herUX Comunidad`
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
      submitBtn.disabled = false;
    }
  });

  // Limpieza reactiva del contenedor de alertas
  contactForm.addEventListener('input', () => {
    const feedbackBox = document.getElementById('form-feedback');
    if (feedbackBox && feedbackBox.textContent !== '') {
      feedbackBox.textContent = '';
      feedbackBox.className = 'form-feedback';
    }
  });
}

// Manejo de Modo Oscuro con persistencia en LocalStorage
function iniciarModoOscuro() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const icon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('herux-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Comprobar preferencia guardada o del sistema operativo
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.setAttribute('data-theme', 'dark');
    if (icon) icon.className = 'fa-solid fa-sun';
  } else {
    document.body.removeAttribute('data-theme');
    if (icon) icon.className = 'fa-solid fa-moon';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';

    if (isDark) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('herux-theme', 'light');
      if (icon) icon.className = 'fa-solid fa-moon';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('herux-theme', 'dark');
      if (icon) icon.className = 'fa-solid fa-sun';
    }
  });
}