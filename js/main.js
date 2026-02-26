/* ============================================
   BTA Dijital — Main JavaScript
   Modular, vanilla, no dependencies
   ============================================ */
(function () {
  'use strict';

  /* ---------- Cinematic Loader (Logo Only) ---------- */
  function initLoader() {
    var loader = document.getElementById('loader');
    var logo = document.getElementById('loaderLogo');
    if (!loader || !logo) return;

    setTimeout(function () {
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1.05)';

      setTimeout(function () {
        logo.style.transform = 'scale(1)';

        setTimeout(function () {
          loader.classList.add('hide');
          setTimeout(function () {
            loader.remove();
          }, 800);
        }, 1000);
      }, 600);
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }

  /* ---------- Header Scroll ---------- */
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.mobile-toggle');
    var menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isActive = menu.classList.contains('active');
      toggle.classList.toggle('active', !isActive);
      menu.classList.toggle('active', !isActive);
      document.body.style.overflow = isActive ? '' : 'hidden';
    });

    var links = menu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  /* ---------- Smooth Scroll ---------- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  /* ---------- Scroll Reveal ---------- */
  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < elements.length; i++) elements[i].classList.add('visible');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var j = 0; j < elements.length; j++) observer.observe(elements[j]);
  }

  /* ---------- Stagger Index ---------- */
  function initStagger() {
    var parents = document.querySelectorAll('.stagger-children');
    for (var i = 0; i < parents.length; i++) {
      var children = parents[i].querySelectorAll('.reveal');
      for (var j = 0; j < children.length; j++) {
        children[j].style.setProperty('--stagger-index', j);
      }
    }
  }

  /* ---------- Counter Animation ---------- */
  function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var startTime = null;

    function tick(now) {
      if (!startTime) startTime = now;
      var progress = Math.min((now - startTime) / duration, 1);
      var value = Math.floor(easeOutExpo(progress) * target);
      el.textContent = prefix + value.toLocaleString('tr-TR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target.toLocaleString('tr-TR') + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          animateCounter(entries[i].target);
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.5 });

    for (var i = 0; i < counters.length; i++) observer.observe(counters[i]);
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    var list = document.querySelector('.faq-list');
    if (!list) return;

    list.addEventListener('click', function (e) {
      var question = e.target.closest('.faq-question');
      if (!question) return;

      var item = question.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isActive = item.classList.contains('active');

      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
        items[i].querySelector('.faq-answer').style.maxHeight = null;
      }

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }

  /* ---------- Logo Slider (rAF) ---------- */
  function initLogoSlider() {
    var track = document.querySelector('.logo-track');
    if (!track) return;

    var slider = track.parentElement;
    var isPaused = false;
    var position = 0;
    var isMobile = window.innerWidth < 768;
    var speed = isMobile ? 0.3 : 0.5;
    var halfWidth = 0;

    function measure() {
      halfWidth = track.scrollWidth / 2;
      isMobile = window.innerWidth < 768;
      speed = isMobile ? 0.3 : 0.5;
    }

    measure();
    window.addEventListener('resize', measure, { passive: true });

    slider.addEventListener('mouseenter', function () { isPaused = true; });
    slider.addEventListener('mouseleave', function () { isPaused = false; });

    function frame() {
      if (!isPaused) {
        position -= speed;
        if (halfWidth > 0 && Math.abs(position) >= halfWidth) {
          position = 0;
        }
        track.style.transform = 'translateX(' + position + 'px)';
      }
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  /* ---------- Application Form ---------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var wrapper = form.closest('.apply-form-wrapper') || form.closest('.contact-form-wrapper');
    var success = wrapper ? wrapper.querySelector('.form-success') : null;

    var validationMessages = {
      name: 'Lütfen adınızı ve soyadınızı girin.',
      company: 'Lütfen şirket adınızı girin.',
      website: 'Lütfen web sitenizi girin.',
      budget: 'Lütfen bütçe aralığı seçin.',
      goal: 'Lütfen hedefinizi kısaca yazın.',
      contact: 'Lütfen telefon veya e-posta adresinizi girin.',
      email: 'Lütfen e-posta adresinizi girin.',
      message: 'Lütfen mesajınızı yazın.'
    };

    function clearError(group) {
      group.classList.remove('has-error');
    }

    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (el) {
      el.addEventListener('focus', function () {
        clearError(el.closest('.form-group'));
      });
    });

    function validateForm() {
      var valid = true;
      var required = form.querySelectorAll('[data-required]');

      required.forEach(function (el) {
        var group = el.closest('.form-group');
        clearError(group);

        var val = el.value.trim();
        if (!val) {
          group.classList.add('has-error');
          var errEl = group.querySelector('.form-error');
          if (errEl) errEl.textContent = validationMessages[el.name] || 'Bu alan zorunludur.';
          valid = false;
        }
      });

      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      // Normalize website field: allow values like "orneksite.com"
      var websiteInput = form.querySelector('input[name="website"]');
      if (websiteInput) {
        var rawWebsite = websiteInput.value.trim();
        if (rawWebsite && !/^https?:\/\//i.test(rawWebsite)) {
          websiteInput.value = 'https://' + rawWebsite;
        }
      }

      var btn = form.querySelector('.form-submit');
      var origHTML = btn.innerHTML;
      var submitError = wrapper ? wrapper.querySelector('.form-submit-error') : null;

      if (submitError) {
        submitError.textContent = '';
        submitError.style.display = 'none';
      }

      btn.innerHTML = '<span>Gönderiliyor...</span>';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      fetch('https://formspree.io/f/mwprynvz', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Form gönderimi başarısız oldu.');
          }
          // Formspree genellikle boş gövde veya JSON dönebilir; hatayı yutmamak için JSON zorunlu değil
          return response.text().catch(function () { return ''; });
        })
        .then(function () {
          // Başarılı gönderim: mevcut animasyon ve başarı durumunu koru
          form.style.opacity = '0';
          form.style.transform = 'translateY(-10px)';
          form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

          setTimeout(function () {
            form.style.display = 'none';
            if (success) success.classList.add('show');

            // Strategy form: çok adımlı göstergeyi güncelle
            var progress = document.querySelector('.apply-progress');
            if (progress) {
              var steps = progress.querySelectorAll('.apply-progress__step');
              if (steps.length >= 2) {
                steps[0].classList.remove('active');
                steps[1].classList.add('active');
              }
            }

            btn.innerHTML = origHTML;
            btn.disabled = false;
            btn.style.opacity = '';
          }, 400);
        })
        .catch(function () {
          btn.innerHTML = origHTML;
          btn.disabled = false;
          btn.style.opacity = '';

          if (submitError) {
            submitError.textContent = 'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.';
            submitError.style.display = 'block';
          }
        });
    });
  }

  /* ---------- Parallax Hero Orbs ---------- */
  function initParallax() {
    var orbs = document.querySelectorAll('.hero-orb');
    if (!orbs.length) return;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      for (var i = 0; i < orbs.length; i++) {
        var factor = 0.1 + i * 0.04;
        orbs[i].style.transform = 'translateY(' + (y * factor) + 'px)';
      }
    }, { passive: true });
  }

  /* ---------- Initialize Everything ---------- */
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initStagger();
  initReveal();
  initCounters();
  initFAQ();
  initLogoSlider();
  initContactForm();
  initParallax();

})();
