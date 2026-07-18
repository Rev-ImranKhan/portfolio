(() => {
  'use strict';

  // ============================================
  // EDIT THIS: your GitHub username activates the
  // live stats cards in the "GitHub Activity" section.
  // ============================================
  const GITHUB_USERNAME = 'Rev-ImranKhan';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================
     MOBILE NAV
     ============================================ */
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (navBurger) {
    navBurger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      navBurger.innerHTML = isOpen
        ? '<svg class="icon"><use href="#i-close"/></svg>'
        : '<svg class="icon"><use href="#i-menu"/></svg>';
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        if (navBurger) {
          navBurger.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
        }
      });
    });
  }

  /* ============================================
     NAV SCROLL STATE + ACTIVE LINK + BACK TO TOP
     ============================================ */
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);

    let currentId = '';
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });
    navLinkEls.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });

    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 600);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ============================================
     GITHUB STATS WIDGET (FIXED: Null checks)
     ============================================ */
  const statsCard = document.getElementById('statsCard');
  const streakCard = document.getElementById('streakCard');

  if (GITHUB_USERNAME) {
    if (statsCard) {
      statsCard.src = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&title_color=7C3AED&text_color=6B7280&icon_color=7C3AED`;
      statsCard.addEventListener('error', () => { statsCard.style.display = 'none'; });
    }
    if (streakCard) {
      streakCard.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&bg_color=ffffff&title_color=7C3AED&text_color=6B7280`;
      streakCard.addEventListener('error', () => { streakCard.style.display = 'none'; });
    }
  }
})();

/* ============================================
   DARK THEME TOGGLE + STARS
   ============================================ */
(function() {
  console.log('🔥 Dark theme toggle script loaded!');

  const toggleBtn = document.getElementById('themeToggle');
  console.log('Toggle button found:', toggleBtn);

  if (!toggleBtn) {
    console.error('❌ Button with id "themeToggle" not found!');
    return;
  }

  const label = document.getElementById('toggleLabel');
  const starsContainer = document.getElementById('starsContainer');
  let starsGenerated = false;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (label) label.textContent = 'Light';
    generateStars();
  }

  // Toggle theme
  toggleBtn.addEventListener('click', function() {
    console.log('🔘 Button clicked!');
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark && !starsGenerated) {
      generateStars();
    }
  });

  // Generate twinkling stars
  function generateStars() {
    if (starsGenerated || !starsContainer) return;
    const count = 120;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
      star.style.animationDelay = (Math.random() * 5) + 's';
      star.style.opacity = Math.random() * 0.7 + 0.3;
      starsContainer.appendChild(star);
    }
    starsGenerated = true;
  }
})();