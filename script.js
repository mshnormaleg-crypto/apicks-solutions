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
});
