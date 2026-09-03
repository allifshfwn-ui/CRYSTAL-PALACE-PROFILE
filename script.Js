document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Duplicate ticker content for seamless loop ---------- */
  const track = document.getElementById('tickerTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Count-up stat numbers ---------- */
  const counters = document.querySelectorAll('.fact-card__num');
  const formatNumber = n => n.toLocaleString('id-ID');

  const animateCount = el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target);
      }
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Timeline reveal on scroll ---------- */
  const tlItems = document.querySelectorAll('.tl__item');
  const tlObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  tlItems.forEach(item => tlObserver.observe(item));

  /* ---------- Nav background on scroll ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(11,18,32,.9)';
    } else {
      nav.style.background = 'rgba(11,18,32,.55)';
    }
  });

  /* ---------- Subtle parallax on hero eagle ---------- */
  const eagle = document.querySelector('.hero__eagle');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (eagle && y < window.innerHeight) {
      eagle.style.transform = `translateY(${y * 0.15}px)`;
    }
  });

});