document.addEventListener('DOMContentLoaded', function () {

  // Hero buttons click tracking
  const heroButtons = document.querySelectorAll('.hero-buttons a');
  heroButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const label = button.textContent.trim();
      console.log(`${label} clicked`);
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      const expanded = mainNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  // Simple hero carousel
  const slides = document.querySelectorAll('.hero-slide');
  if (slides && slides.length > 1) {
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 4500);
  }

  // Scroll reveal — EXCLUDE hero and header so they are always visible
  const revealElements = document.querySelectorAll(
    '.service-card, .photo-card, .testimonial-card, .stat-card, .pricing-card, .contact-card, .why-card, .process-step, .trust-badge, .faq-item, footer'
  );
  revealElements.forEach((el) => el.classList.add('animate-on-scroll'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Also observe elements already marked animate-on-scroll in HTML
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    revealObserver.observe(el);
  });

  // Counter Animation for Stats
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const counter = entry.target.querySelector('.counter');
        const target = parseInt(entry.target.getAttribute('data-target'), 10);

        if (counter && target) {
          let current = 0;
          const increment = Math.ceil(target / 100);
          const duration = 2000;
          const stepTime = Math.max(duration / (target / increment), 10);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              entry.target.classList.add('counted');
            }
            // Format large numbers nicely
            if (target >= 1000000) {
              counter.textContent = '$' + (current / 1000000).toFixed(1) + 'M+';
            } else {
              counter.textContent = current.toLocaleString() + '+';
            }
          }, stepTime);
        }

        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const statCards = document.querySelectorAll('.stat-card[data-target]');
  statCards.forEach((card) => counterObserver.observe(card));
});
