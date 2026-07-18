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

  navBurger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    navBurger.innerHTML = isOpen
      ? '<svg class="icon"><use href="#i-close"/></svg>'
      : '<svg class="icon"><use href="#i-menu"/></svg>';
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      navBurger.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
    });
  });

  /* ============================================
     NAV SCROLL STATE + ACTIVE LINK + BACK TO TOP
     ============================================ */
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 30);

    let currentId = '';
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });
    navLinkEls.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });

    backToTop.classList.toggle('visible', window.scrollY > 600);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

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
     GITHUB STATS WIDGET
     ============================================ */
  const statsCard = document.getElementById('statsCard');
  const streakCard = document.getElementById('streakCard');

  if (GITHUB_USERNAME) {
    statsCard.src = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&title_color=7C3AED&text_color=6B7280&icon_color=7C3AED`;
    streakCard.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&bg_color=ffffff&title_color=7C3AED&text_color=6B7280`;

    // If an individual card fails to load, just hide that one image.
    // The section itself always stays visible.
    statsCard.addEventListener('error', () => { statsCard.style.display = 'none'; });
    streakCard.addEventListener('error', () => { streakCard.style.display = 'none'; });
  }
})();
