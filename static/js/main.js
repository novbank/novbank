// NovBank — main.js

document.addEventListener('DOMContentLoaded', function () {

  // ── HAMBURGER MENU ──────────────────────────
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Close sidebar when a nav link is tapped on mobile
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // ── AUTO-DISMISS ALERTS ──────────────────────
  document.querySelectorAll('.alert').forEach(a => {
    setTimeout(() => {
      a.style.transition = 'opacity 0.4s';
      a.style.opacity = '0';
      setTimeout(() => a.remove(), 400);
    }, 4000);
  });

  // ── ANIMATE BALANCE ──────────────────────────
  const balanceEl = document.querySelector('.balance-amount');
  if (balanceEl) {
    const raw    = balanceEl.textContent.replace(/[$,]/g, '');
    const target = parseFloat(raw);
    if (!isNaN(target)) {
      const duration  = 900;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        balanceEl.textContent = '$' + (eased * target).toLocaleString('en-US', {
          minimumFractionDigits: 2, maximumFractionDigits: 2
        });
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

});
