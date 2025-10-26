//  1. Scroll Reveal 
const revealElements = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let el = entry.target;
      el.style.opacity = 0;
      let start = null;
      function animate(ts) {
        if (!start) start = ts;
        let progress = (ts - start) / 600;
        el.style.opacity = Math.min(progress, 1);
        el.style.transform = `translateY(${30 * (1 - progress)}px)`;
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));


// 2. Parallax Hero Background 
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!hero) return;
  const offset = window.scrollY * 0.3;
  hero.style.backgroundPositionY = `-${offset}px`;
});


//  3. Ripple Button Effect 
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = '20px';
    ripple.style.background = 'rgba(255,255,255,0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 1s ease-out';
    btn.appendChild(ripple);
    setTimeout(() => {
      ripple.style.transform = 'scale(20)';
      ripple.style.opacity = '0';
    }, 10);
    setTimeout(() => ripple.remove(), 1000);
  });
});


//  4. 3D Tilt Cards 
const cards = document.querySelectorAll('.card-scale');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    setTimeout(() => card.style.transition = '', 300);
  });
});


//  5. Hover Glow Cards 
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 10px 30px rgba(44,120,255,0.2)';
    card.style.transform = 'scale(1.03)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
    card.style.transform = 'scale(1)';
  });
});


//  6. Typed Text Effect 
const text = "Мы создаем красивые и функциональные сайты";
const h1 = document.querySelector('.hero-text h1');
if (h1) {
  h1.textContent = '';
  let i = 0;
  function typeEffect() {
    if (i < text.length) {
      h1.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 60);
    }
  }
  window.addEventListener('load', typeEffect);
}


//  7. SVG Line Draw 
const svgs = document.querySelectorAll('svg path');
svgs.forEach(path => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.stroke = '#2c78ff';
  path.style.strokeWidth = '2';
  path.style.fill = 'transparent';
  let start = null;
  function animate(ts) {
    if (!start) start = ts;
    const progress = (ts - start) / 2000;
    path.style.strokeDashoffset = length * (1 - progress);
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});


//  8. Team Member Bounce 
const team = document.querySelectorAll('.hover-bounce');
team.forEach(member => {
  member.addEventListener('mouseenter', () => {
    let start = null;
    const duration = 500;
    const amplitude = 8;
    function bounce(ts) {
      if (!start) start = ts;
      const progress = (ts - start) / duration;
      const y = Math.sin(progress * Math.PI) * -amplitude;
      member.style.transform = `translateY(${y}px)`;
      if (progress < 1) requestAnimationFrame(bounce);
      else member.style.transform = 'translateY(0)';
    }
    requestAnimationFrame(bounce);
  });
});

// === 9. Smooth Scroll to Sections ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const startY = window.pageYOffset;
    const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - 60; // немного отступа от шапки
    const distance = targetY - startY;
    const duration = 800;
    let startTime = null;

    function smoothScroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress; // easeInOut
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) requestAnimationFrame(smoothScroll);
    }

    requestAnimationFrame(smoothScroll);
  });
});


//  (9): Dynamic Year 
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
