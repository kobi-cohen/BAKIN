// ===== HAMBURGER & MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

hamburger.addEventListener('click', toggleNav);
overlay.addEventListener('click', closeNav);

function toggleNav() {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  overlay.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeNav() {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

// Mobile: toggle dropdowns on tap
document.querySelectorAll('.nav-item.has-dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('dropdown-open');
    }
  });
});

// Close nav on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeNav();
});

// ===== SEARCH TOGGLE =====
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');

searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) {
    searchBar.querySelector('input').focus();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchBar.classList.remove('open');
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSlider() {
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.slide));
    resetSlider();
  });
});

document.querySelector('.hero-prev').addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  resetSlider();
});

document.querySelector('.hero-next').addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  resetSlider();
});

startSlider();

// Touch/swipe support for hero
let touchStartX = 0;
const heroEl = document.querySelector('.hero');
heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
heroEl.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
    resetSlider();
  }
});

// ===== CART =====
let cartCount = 3;

function addToCart(btn) {
  cartCount++;
  document.querySelector('.cart-count').textContent = cartCount;

  // Animate button
  btn.classList.add('added');
  btn.innerHTML = '<i class="fa fa-check"></i>';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa fa-cart-plus"></i>';
  }, 1200);

  showToast();
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== STICKY HEADER SHADOW =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,0.12)'
    : '0 2px 12px rgba(0,0,0,0.08)';
}, { passive: true });

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  const email = input.value.trim();
  if (!email) return;

  btn.textContent = '✓ נרשמת בהצלחה!';
  btn.style.background = '#27ae60';
  input.value = '';
  input.placeholder = 'תודה! נשלח לך עדכונים בקרוב';
  input.disabled = true;
  btn.disabled = true;
}

// ===== SMOOTH ANCHOR SCROLL WITH HEADER OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const headerH = document.querySelector('.header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
    if (window.innerWidth <= 768) closeNav();
  });
});

// ===== WISHLIST TOGGLE =====
document.querySelectorAll('.pact-btn:first-child').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('i');
    const active = icon.style.color === 'var(--primary)' || icon.classList.contains('fa-solid');
    if (active) {
      icon.style.color = '';
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    } else {
      icon.style.color = '#e74c3c';
      icon.classList.add('fa-solid');
      icon.classList.remove('fa-regular');
    }
  });
});

// ===== INTERSECTION OBSERVER — animate cards on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .recipe-card, .cat-card, .trust-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
