document.addEventListener("DOMContentLoaded", function() {
  // ======================
  // TOGGLE DEL MENÚ MÓVIL
  // ======================
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.querySelector('.menu');
  
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mainMenu.classList.toggle('active');
      
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  // ======================
  // SCROLL SUAVE + MANEJO DE CLIC (SOLO CLICK ACTIVA EL MENÚ)
  // ======================
  document.querySelectorAll('.menubar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Cierra el menú móvil si está abierto
        if (mainMenu && mainMenu.classList.contains('active')) {
          menuToggle.click();
        }

        // Remueve 'active' de todos los enlaces
        document.querySelectorAll('.menubar a').forEach(item => {
          item.classList.remove('active');
        });
        
        // Agrega 'active' solo al enlace clickeado
        this.classList.add('active');

        // Scroll suave
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ======================
  // ANIMACIONES AL SCROLL (PARA IMÁGENES Y ELEMENTOS)
  // ======================
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.service-card, .about-content, .about-image, .detail-content, .branch-card'
    );
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.75) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Inicializar animaciones
  const animatedElements = document.querySelectorAll(
    '.service-card, .about-content, .about-image, .detail-content, .branch-card'
  );
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Ejecutar al cargar y al hacer scroll (solo para animaciones)
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // ======================
  // BOTONES FLOTANTES DE REDES
  // ======================
  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
});