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

    /* ── Hero videos: sequential playback ── */
    var videos = [
      document.getElementById('hero-video'),
      document.getElementById('hero-video-2'),
      document.getElementById('hero-video-3')
    ].filter(Boolean);

    var muteBtn       = document.getElementById('hero-mute-btn');
    var iconMuted     = document.getElementById('hero-icon-muted');
    var iconSound     = document.getElementById('hero-icon-sound');
    var fullscreenBtn = document.getElementById('hero-fullscreen-btn');
    var videoPanel    = document.getElementById('hero-video-panel');

    var userMuted = true;        // start muted (required for autoplay)
    var activeIndex = 0;

    function setIconState() {
      if (!iconMuted || !iconSound) return;
      iconMuted.style.display = userMuted ? 'block' : 'none';
      iconSound.style.display = userMuted ? 'none'  : 'block';
    }

    function showVideo(i) {
      videos.forEach(function (v, idx) {
        if (idx === i) {
          v.style.display = 'block';
          v.muted = true;
          v.currentTime = 0;
          var p = v.play();
          var unmuteIfWanted = function () {
            if (!userMuted) v.muted = false;
          };
          if (p && typeof p.then === 'function') {
            p.then(unmuteIfWanted).catch(function () { unmuteIfWanted(); });
          } else {
            unmuteIfWanted();
          }
        } else {
          v.pause();
          v.muted = true;
          v.style.display = 'none';
        }
      });
      activeIndex = i;
    }

    if (videos.length) {
      videos.forEach(function (v, idx) {
        v.addEventListener('ended', function () {
          if (idx < videos.length - 1) showVideo(idx + 1);
        });
      });
      showVideo(0);
      setIconState();
    }

    if (muteBtn && videos.length) {
      muteBtn.addEventListener('click', function () {
        userMuted = !userMuted;
        videos.forEach(function (v, idx) {
          v.muted = (idx === activeIndex) ? userMuted : true;
        });
        setIconState();
      });
    }

    if (fullscreenBtn && videoPanel) {
      fullscreenBtn.addEventListener('click', function () {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoPanel.requestFullscreen();
        }
      });
    }

    /* ── Page loader ── */
    var loader = document.getElementById('spark-loader');
    if (loader) {
      // Show loader on any internal link click
      document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href');
        if (href === '#' || href === null || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
        if (link.target === '_blank') return;
        loader.classList.add('loader-visible');
      });
      // Hide loader once new page has loaded (back/forward or slow navigations)
      window.addEventListener('pageshow', function () {
        loader.classList.remove('loader-visible');
      });
    }

    /* ── Local test: press L key to preview loader ── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'l' || e.key === 'L') {
        var l = document.getElementById('spark-loader');
        if (!l) return;
        l.classList.toggle('loader-visible');
      }
    });

    /* ── Header dropdowns: portal to <body> + fixed positioning ── */
    var menuItems = document.querySelectorAll('.spark-menu-item');
    menuItems.forEach(function (item) {
      var panel = item.querySelector('.spark-menu-panel');
      if (!panel) return;
      document.body.appendChild(panel);

      function position() {
        var rect = item.getBoundingClientRect();
        panel.style.top = (rect.bottom + 8) + 'px';
        panel.style.right = (window.innerWidth - rect.right) + 'px';
        panel.style.left = 'auto';
      }
      function open() { position(); panel.classList.add('is-open'); }
      function close() { panel.classList.remove('is-open'); }

      item.addEventListener('mouseenter', open);
      panel.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', function () {
        setTimeout(function () {
          if (!panel.matches(':hover') && !item.matches(':hover')) close();
        }, 80);
      });
      panel.addEventListener('mouseleave', function () {
        setTimeout(function () {
          if (!panel.matches(':hover') && !item.matches(':hover')) close();
        }, 80);
      });
      window.addEventListener('resize', function () { if (panel.classList.contains('is-open')) position(); });
      window.addEventListener('scroll', function () { if (panel.classList.contains('is-open')) position(); }, { passive: true });
    });

  });
})();
