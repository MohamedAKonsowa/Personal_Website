/* src/main.js – Interactive features for the personal blog */

/* Smooth scrolling for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Scroll‑spy – highlight navigation items based on scroll position */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.4,
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const navLink = document.querySelector(`nav a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* Fade‑in animations on scroll using IntersectionObserver */
const faders = document.querySelectorAll('.section-fade');

const fadeObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

faders.forEach(el => fadeObserver.observe(el));

/* Optional dark‑mode toggle (auto‑detect system preference) */
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode', prefersDark.matches);
};
toggleDarkMode();
prefersDark.addEventListener('change', toggleDarkMode);
