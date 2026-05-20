/* Spark Toys — WooCommerce Store API v1 cart */
(function () {
  'use strict';

  if (typeof sparkCart === 'undefined') return;

  var CART_BASE = sparkCart.restUrl + '/cart';
  var wcNonce   = sparkCart.nonce;
  var isLoading = false;

  /* ── Utilities ── */
  function formatPrice(minorUnits) {
    return '₪' + Math.round(parseInt(minorUnits, 10) / 100).toLocaleString('he-IL');
  }

  function setLoading(val, targetBtn) {
    isLoading = val;
    document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
      btn.disabled = val;
      btn.classList.toggle('is-loading', val && btn === targetBtn);
    });
  }

  /* ── Badge ── */
  function updateBadge(count) {
    var badge = document.getElementById('cart-count');
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  /* ── Drawer ── */
  function openDrawer() {
    var drawer   = document.getElementById('cart-drawer');
    var backdrop = document.getElementById('cart-backdrop');
    var panel    = document.getElementById('cart-panel');
    if (!drawer) return;
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.remove('pointer-events-none');
    backdrop.classList.remove('pointer-events-none');
    backdrop.style.opacity = '1';
    panel.style.transform  = 'translateX(0)';
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var drawer   = document.getElementById('cart-drawer');
    var backdrop = document.getElementById('cart-backdrop');
    var panel    = document.getElementById('cart-panel');
    if (!drawer) return;
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.style.opacity = '0';
    panel.style.transform  = 'translateX(100%)';
    document.body.style.overflow = '';
    setTimeout(function () {
      drawer.classList.add('pointer-events-none');
      backdrop.classList.add('pointer-events-none');
    }, 300);
  }

  /* ── Render items ── */
  function renderCart(cart) {
    var container = document.getElementById('cart-items');
    var empty     = document.getElementById('cart-empty');
    var footer    = document.getElementById('cart-footer');
    var totalEl   = document.getElementById('cart-total');
    var countLabel= document.getElementById('cart-items-count-label');
    if (!container) return;

    var items = (cart && cart.items) ? cart.items : [];
    var total = (cart && cart.totals && cart.totals.total_price) ? cart.totals.total_price : '0';
    var count = (cart && cart.items_count) ? cart.items_count : 0;

    updateBadge(count);

    if (countLabel) {
      if (count > 0) {
        countLabel.textContent = count + ' פריטים';
        countLabel.classList.remove('hidden');
      } else {
        countLabel.classList.add('hidden');
      }
    }

    if (items.length === 0) {
      empty.classList.remove('hidden');
      if (footer) footer.classList.add('hidden');
      return;
    }

    empty.classList.add('hidden');
    if (footer) footer.classList.remove('hidden');
    if (totalEl) totalEl.textContent = formatPrice(total);

    /* Remove old item cards (not the empty state) */
    container.querySelectorAll('.cart-item-row').forEach(function (el) { el.remove(); });

    items.forEach(function (item) {
      var imgSrc = (item.images && item.images[0]) ? item.images[0].src : '';
      var price  = item.prices && item.prices.price ? formatPrice(item.prices.price) : '';

      var div = document.createElement('div');
      div.className = 'cart-item-row flex gap-4 p-4 bg-cream rounded-2xl';
      div.innerHTML =
        '<div class="relative h-20 w-20 rounded-xl overflow-hidden bg-white shrink-0">' +
          (imgSrc ? '<img src="' + escAttr(imgSrc) + '" alt="' + escAttr(item.name) + '" class="object-contain p-1 w-full h-full">' :
                    '<div class="w-full h-full bg-cream flex items-center justify-center text-2xl">🧸</div>') +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-sm font-bold text-navy line-clamp-2 leading-snug">' + escHtml(item.name) + '</p>' +
          '<p class="text-base font-extrabold text-coral mt-1">' + price + '</p>' +
          '<div class="flex items-center gap-2 mt-2">' +
            '<button data-action="decrease" data-key="' + escAttr(item.key) + '" data-qty="' + (item.quantity - 1) + '"' +
              (item.quantity <= 1 ? ' disabled' : '') +
              ' class="h-7 w-7 rounded-full border border-border flex items-center justify-center text-navy hover:bg-muted disabled:opacity-40">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            '</button>' +
            '<span class="text-sm font-bold text-navy w-6 text-center">' + item.quantity + '</span>' +
            '<button data-action="increase" data-key="' + escAttr(item.key) + '" data-qty="' + (item.quantity + 1) + '"' +
              ' class="h-7 w-7 rounded-full border border-border flex items-center justify-center text-navy hover:bg-muted disabled:opacity-40">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            '</button>' +
            '<button data-action="remove" data-key="' + escAttr(item.key) + '"' +
              ' class="mr-auto h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-coral hover:bg-coral/10 transition-colors">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>';
      container.appendChild(div);
    });
  }

  function escHtml(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }
  function escAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ── API calls ── */
  function apiFetch(url, options) {
    var headers = Object.assign({
      'Content-Type': 'application/json',
      'Nonce': wcNonce,
      'X-WC-Store-API-Nonce': wcNonce
    }, options.headers || {});
    return fetch(url, Object.assign({}, options, { headers: headers }))
      .then(function (res) {
        var newNonce = res.headers.get('X-WC-Store-API-Nonce') || res.headers.get('Nonce');
        if (newNonce) wcNonce = newNonce;
        return res.text().then(function (text) {
          var data = null;
          if (text) {
            try { data = JSON.parse(text); } catch (e) { /* ignore non-JSON */ }
          }
          if (!res.ok) {
            var msg = (data && data.message) ? data.message : ('HTTP ' + res.status);
            throw new Error(msg);
          }
          return data || {};
        });
      });
  }

  function fetchCart() {
    return apiFetch(CART_BASE, { method: 'GET', credentials: 'include' })
      .then(function (cart) { renderCart(cart); return cart; })
      .catch(function (err) { console.warn('Cart fetch failed:', err); });
  }

  function addItem(productId, btn) {
    if (isLoading) return;
    setLoading(true, btn);
    var qty = 1;
    if (btn && btn.dataset.qtySource) {
      var qtyEl = document.querySelector(btn.dataset.qtySource);
      if (qtyEl) qty = Math.max(1, parseInt(qtyEl.value, 10) || 1);
    }
    var productName = (btn && btn.dataset.productName) ? btn.dataset.productName : '';
    return apiFetch(CART_BASE + '/add-item', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id: productId, quantity: qty }),
    })
      .then(function () {
        try {
          sessionStorage.setItem('sparkCartNotice', JSON.stringify({ name: productName, t: Date.now() }));
        } catch (e) { /* sessionStorage may be unavailable */ }
        window.location.reload();
      })
      .catch(function (err) {
        console.error('Add to cart failed:', err);
        alert('שגיאה: ' + err.message);
        setLoading(false);
      });
  }

  /* ── Success banner (after page reload from add-to-cart) ── */
  function showSuccessBanner() {
    var raw;
    try { raw = sessionStorage.getItem('sparkCartNotice'); } catch (e) { return; }
    if (!raw) return;
    try { sessionStorage.removeItem('sparkCartNotice'); } catch (e) {}

    var data;
    try { data = JSON.parse(raw); } catch (e) { return; }
    if (!data || (Date.now() - data.t) > 30000) return; // ignore stale (>30s)

    var cartUrl = (window.sparkCart && sparkCart.siteUrl) ? sparkCart.siteUrl + '/cart/' : '/cart/';
    var name = data.name || 'המוצר';
    var msg  = '"' + name + '" נוסף לסל הקניות.';

    var wrap = document.createElement('div');
    wrap.className = 'spark-cart-notice';
    wrap.setAttribute('role', 'status');
    wrap.innerHTML =
      '<a href="' + cartUrl + '" class="spark-cart-notice-btn">מעבר לסל הקניות</a>' +
      '<span class="spark-cart-notice-msg">' + escHtml(msg) + '</span>' +
      '<button type="button" class="spark-cart-notice-close" aria-label="סגור">×</button>';

    // Insert at top of <main> if present, otherwise top of body
    var target = document.querySelector('main') || document.body;
    target.insertBefore(wrap, target.firstChild);

    wrap.querySelector('.spark-cart-notice-close').addEventListener('click', function () {
      wrap.remove();
    });
  }

  function removeItem(key) {
    if (isLoading) return;
    setLoading(true);
    return apiFetch(CART_BASE + '/remove-item', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ key: key }),
    })
      .then(function () { return fetchCart(); })
      .catch(function (err) { alert('שגיאה: ' + err.message); })
      .finally(function () { setLoading(false); });
  }

  function updateQty(key, qty) {
    if (isLoading) return;
    if (qty < 1) { removeItem(key); return; }
    setLoading(true);
    return apiFetch(CART_BASE + '/update-item', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ key: key, quantity: qty }),
    })
      .then(function () { return fetchCart(); })
      .catch(function (err) { alert('שגיאה: ' + err.message); })
      .finally(function () { setLoading(false); });
  }

  /* ── Wire up DOM ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Cart open/close */
    var openBtn = document.getElementById('cart-open-btn');
    if (openBtn) openBtn.addEventListener('click', openDrawer);

    ['cart-close', 'cart-close-empty', 'cart-close-footer'].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', closeDrawer);
    });

    var backdrop = document.getElementById('cart-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    /* Cart item interactions (delegated) */
    var cartItems = document.getElementById('cart-items');
    if (cartItems) {
      cartItems.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var action = btn.dataset.action;
        var key    = btn.dataset.key;
        if (action === 'remove')   removeItem(key);
        if (action === 'decrease') updateQty(key, parseInt(btn.dataset.qty, 10));
        if (action === 'increase') updateQty(key, parseInt(btn.dataset.qty, 10));
      });
    }

    /* Add-to-cart buttons — capture phase + preventDefault so nothing else can hijack */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.add-to-cart-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var id = parseInt(btn.dataset.productId, 10);
      if (id) addItem(id, btn);
    }, true);

    /* Show success banner if user just added an item */
    showSuccessBanner();

    /* Initial fetch */
    fetchCart();
  });

  /* Expose for external use */
  window.sparkCartAPI = { addItem: addItem, removeItem: removeItem, updateQty: updateQty, openDrawer: openDrawer, closeDrawer: closeDrawer };
})();
