// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll to messages function
function scrollToMessages() {
  document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.msg-card, .gallery-item, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Floating hearts animation
function createFloatingHearts() {
  const heartsContainer = document.querySelector('.floating-hearts');
  if (!heartsContainer) return;

  const hearts = ['❤️', '💖', '💝', '💕', '💗', '💘', '💞'];
  
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.className = 'heart-float';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (5 + Math.random() * 8) + 's';
      heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 13000);
    }, i * 500);
  }
}

// Start floating hearts animation on page load
window.addEventListener('load', () => {
  createFloatingHearts();
  setInterval(createFloatingHearts, 15000);
});

// Add ripple effect to buttons
function addRipple(e) {
  const button = e.target;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

const ctaButton = document.querySelector('.cta-btn');
if (ctaButton) {
  ctaButton.addEventListener('click', addRipple);
}

// Parallax effect on hero section
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const scrollPosition = window.pageYOffset;
    heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});