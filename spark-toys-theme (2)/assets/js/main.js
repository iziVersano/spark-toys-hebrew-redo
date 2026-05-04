/* Spark Toys — main UI interactions */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Mobile nav toggle ── */
    var navToggle    = document.getElementById('nav-toggle');
    var mobileNav    = document.getElementById('mobile-nav');
    var iconOpen     = document.getElementById('nav-icon-open');
    var iconClose    = document.getElementById('nav-icon-close');

    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', function () {
        var isOpen = !mobileNav.classList.contains('hidden');
        if (isOpen) {
          mobileNav.classList.add('hidden');
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        } else {
          mobileNav.classList.remove('hidden');
          iconOpen.classList.add('hidden');
          iconClose.classList.remove('hidden');
        }
      });
    }

    /* ── Mobile accordion items ── */
    document.querySelectorAll('[data-accordion]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key     = btn.dataset.accordion;
        var content = document.getElementById('acc-' + key);
        var chevron = btn.querySelector('.accordion-chevron');
        if (!content) return;
        var hidden = content.classList.contains('hidden');
        content.classList.toggle('hidden', !hidden);
        content.style.display = hidden ? 'flex' : 'none';
        if (chevron) chevron.style.transform = hidden ? 'rotate(180deg)' : '';
      });
    });

    /* ── Sticky header: hide on scroll down, show on scroll up ── */
    var header    = document.querySelector('header.sticky');
    var lastY     = 0;
    if (header) {
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (y > lastY && y > 80) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = '';
        }
        lastY = y;
      }, { passive: true });
      header.style.transition = 'transform 0.3s ease';
    }

    /* ── Contact form ── */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name    = contactForm.querySelector('[name="name"]').value.trim();
        var email   = contactForm.querySelector('[name="email"]').value.trim();
        var phone   = contactForm.querySelector('[name="phone"]').value.trim();
        var consent = contactForm.querySelector('[name="consent"]').checked;
        var valid   = true;

        function showError(field, msg) {
          var el = contactForm.querySelector('[data-error="' + field + '"]');
          if (!el) return;
          el.textContent = msg;
          el.classList.remove('hidden');
          valid = false;
        }
        function clearError(field) {
          var el = contactForm.querySelector('[data-error="' + field + '"]');
          if (el) el.classList.add('hidden');
        }

        clearError('name'); clearError('email'); clearError('phone'); clearError('consent');

        if (!name)  showError('name', 'יש להזין שם');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) showError('email', 'כתובת אימייל לא תקינה');
        if (!phone || !/^[0-9+\-\s()]+$/.test(phone)) showError('phone', 'מספר טלפון לא תקין');
        if (!consent) showError('consent', 'יש לאשר יצירת קשר');

        if (!valid) return;

        var submitBtn = contactForm.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'שולח...';

        var fd = new FormData(contactForm);
        fetch(sparkCart.ajaxUrl, { method: 'POST', body: fd })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            var successEl = document.getElementById('contact-success');
            if (res.success) {
              contactForm.reset();
              if (successEl) {
                successEl.textContent = res.data.message || 'הפנייה נשלחה! נחזור אליכם בהקדם.';
                successEl.classList.remove('hidden');
              }
            } else {
              alert(res.data.message || 'שגיאה בשליחה');
            }
          })
          .catch(function () { alert('שגיאת רשת, נסו שוב'); })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'שליחה';
          });
      });
    }

  });
})();
