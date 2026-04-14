/* ========================================
   LP Segundo Cerebro com IA - Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGSAP();
  initFAQ();
  initSmoothScroll();
  initHeaderScroll();
});

/* --- GSAP ScrollTrigger Animations --- */
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Add gs-reveal class to all animatable sections
  const sections = document.querySelectorAll('.section, .hero, .cta-final');
  sections.forEach(el => el.classList.add('gs-reveal'));

  // Animate each section on scroll
  gsap.utils.toArray('.gs-reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Stagger numbered list items
  const listItems = document.querySelectorAll('.numbered-list li');
  if (listItems.length) {
    gsap.fromTo(listItems, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: listItems[0].parentElement,
        start: 'top 80%',
        once: true
      }
    });
  }

  // Stagger step cards
  const stepCards = document.querySelectorAll('.step-card');
  if (stepCards.length) {
    gsap.fromTo(stepCards, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stepCards[0].parentElement,
        start: 'top 80%',
        once: true
      }
    });
  }

  // Stagger FAQ items
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    gsap.fromTo(faqItems, {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: faqItems[0].parentElement,
        start: 'top 80%',
        once: true
      }
    });
  }
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if was closed)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- Header scroll behavior --- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  }, { passive: true });
}
