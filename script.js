document.addEventListener('DOMContentLoaded', function () {
  const heroButtons = document.querySelectorAll('.hero-buttons a');
  heroButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const label = button.textContent.trim();
      console.log(`${label} clicked`);
    });
  });

  // Remove old contact alert behavior now that forms submit through Formspree

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

  // Scroll reveal effects for content
  const revealElements = document.querySelectorAll('section, .service-card, .photo-card, .testimonial-card, .stat-card, .pricing-card, .contact-card, footer, header');
  revealElements.forEach((el) => el.classList.add('animate-on-scroll'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Counter Animation for Stats
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const counter = entry.target.querySelector('.counter');
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        
        if (counter && target) {
          let current = 0;
          const increment = Math.ceil(target / 100); // Adjust speed
          const duration = 2000; // 2 seconds
          const stepTime = duration / (target / increment);
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              entry.target.classList.add('counted');
            }
            // Format number with commas
            counter.textContent = current.toLocaleString();
          }, stepTime);
        }
        
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Apply counter animation to stat cards
  const statCards = document.querySelectorAll('.stat-card[data-target]');
  statCards.forEach((card) => counterObserver.observe(card));
});

