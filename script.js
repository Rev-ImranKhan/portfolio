(() => {
  'use strict';

  const GITHUB_USERNAME = 'Rev-ImranKhan';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== MOBILE NAV =====
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

  // ===== NAV SCROLL =====
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

  // ===== SCROLL REVEAL =====
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

  // ===== GITHUB STATS =====
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

// ============================================================
// DARK GALAXY THEME — toggle logic + star field generation
// (body.dark-theme is applied instantly by a tiny inline
// <script> at the very top of <body>, so there's no flash
// of the wrong theme on page load)
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('themeToggle');
  const label = document.getElementById('toggleLabel');
  const starsContainer = document.getElementById('starsContainer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let sceneBuilt = false;

  function setLabel(isDark) {
    if (label) label.textContent = isDark ? 'Dark' : 'Light';
    if (toggleBtn) toggleBtn.setAttribute('aria-checked', String(isDark));
  }

  function buildSpaceScene() {
    if (sceneBuilt || !starsContainer) return;
    sceneBuilt = true;

    const frag = document.createDocumentFragment();

    // 180 twinkling stars (spec asked for 150+)
    const STAR_COUNT = 180;
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = (Math.random() * 2.6 + 0.6).toFixed(2);
      const peak = (Math.random() * 0.5 + 0.5).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);
      const top = (Math.random() * 100).toFixed(2);
      const dur = (Math.random() * 3.5 + 2).toFixed(2);
      const delay = (Math.random() * 6).toFixed(2);
      star.style.cssText =
        `width:${size}px;height:${size}px;left:${left}%;top:${top}%;` +
        `--peak:${peak};animation-duration:${reduceMotion ? '0.001ms' : dur + 's'};animation-delay:${delay}s;`;
      frag.appendChild(star);
    }

    // shooting stars
    if (!reduceMotion) {
      const SHOOT_COUNT = 5;
      for (let i = 0; i < SHOOT_COUNT; i++) {
        const shoot = document.createElement('div');
        shoot.className = 'shooting-star';
        const top = (Math.random() * 40).toFixed(2);
        const left = (Math.random() * 50 + 35).toFixed(2);
        const angle = (Math.random() * 20 + 24).toFixed(1);
        const dur = (Math.random() * 3 + 5).toFixed(2);
        const delay = (Math.random() * 10).toFixed(2);
        shoot.style.cssText =
          `top:${top}%;left:${left}%;--angle:${angle}deg;` +
          `animation-duration:${dur}s;animation-delay:${delay}s;`;
        frag.appendChild(shoot);
      }
    }

    starsContainer.appendChild(frag);
  }

  const startedDark = document.body.classList.contains('dark-theme');
  if (startedDark) buildSpaceScene();
  setLabel(startedDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setLabel(isDark);
      if (isDark) buildSpaceScene();
    });
  }
});

// ============================================================
// AI CHAT WIDGET
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('aiChatToggle');
  const panel = document.getElementById('aiChatPanel');
  const closeBtn = document.getElementById('aiChatClose');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiChatInput');
  const messages = document.getElementById('aiChatMessages');

  if (!toggle || !panel || !form) return;

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `ai-chat-msg ai-chat-msg-${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  toggle.addEventListener('click', () => panel.classList.toggle('open'));

  // Auto-hint bubble (shows once, 3s after load, hides after 6s)
  const hint = document.getElementById('aiChatHint');
  if (hint && !localStorage.getItem('aiChatHintShown')) {
    setTimeout(() => {
      hint.classList.add('show');
      setTimeout(() => hint.classList.remove('show'), 6000);
    }, 3000);
    localStorage.setItem('aiChatHintShown', 'true');
  }
  toggle.addEventListener('click', () => hint && hint.classList.remove('show'));

  closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    input.disabled = true;

    const typingMsg = addMessage('Thinking...', 'typing');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      typingMsg.remove();

      if (!res.ok || data.error) {
        addMessage(data.error || "Something went wrong. Please email imrankhanedu601@gmail.com.", 'bot');
      } else {
        addMessage(data.reply, 'bot');
      }
    } catch (err) {
      typingMsg.remove();
      addMessage("Couldn't connect right now. Please email imrankhanedu601@gmail.com directly.", 'bot');
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
});