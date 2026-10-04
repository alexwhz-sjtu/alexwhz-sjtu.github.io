const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a')];

toggle?.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  });
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !toggle?.contains(event.target)) {
    toggle?.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
});

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveLink(visible.target.id);
  }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.1, 0.5] });
  sections.forEach((section) => observer.observe(section));
}

document.querySelector('#year').textContent = new Date().getFullYear();
