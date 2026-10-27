// Anerii Luxury Storefront - Shopify Theme Controller

// Category and Collection Filtering
function filterCategory(cat, shouldScroll = false) {
  // Sync Category Filter Buttons
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    if (btn.dataset.filter === cat) {
      btn.classList.add('active');
      if (btn.scrollIntoView) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    } else {
      btn.classList.remove('active');
    }
  });

  // Sync Story Circle Pills
  document.querySelectorAll('.story-item').forEach(item => {
    const story = item.getAttribute('data-story') || (item.getAttribute('onclick') || '').match(/filterCategory\('([^']+)'/)?.[1];
    if (story === cat) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Filter Product Cards in the grid
  const cards = document.querySelectorAll('#collections .product-card-wrap');
  cards.forEach(card => {
    const cardCat = card.dataset.category || '';
    const cardColl = card.dataset.collection || '';
    const cardTitle = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
    
    let match = false;
    if (cat === 'all') {
      match = true;
    } else if (cat === 'co-ords') {
      match = cardCat === 'co-ords' || cardTitle.includes('cord') || cardTitle.includes('co-ord');
    } else if (cat === 'kurta-sets') {
      match = cardCat === 'kurta-sets' || (cardTitle.includes('kurta') && !cardTitle.includes('short'));
    } else if (cat === 'kurtis') {
      match = cardCat === 'kurtis' || cardTitle.includes('short') || cardTitle.includes('top');
    } else if (cat === 'noor-e-neel') {
      match = cardColl === 'noor-e-neel' || cardTitle.includes('noor');
    } else if (cat === 'rangrez') {
      match = cardColl === 'rangrez' || cardTitle.includes('rangrez') || cardTitle.includes('rani') || cardTitle.includes('coral');
    } else if (cat === 'gulnaaz') {
      match = cardColl === 'gulnaaz' || cardTitle.includes('gulnaaz');
    }
    
    card.style.display = match ? '' : 'none';
  });

  // Smooth scroll to collections
  if (shouldScroll) {
    const collSection = document.getElementById('collections');
    if (collSection) {
      const headerOffset = 70;
      const elementPosition = collSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  }
}
window.filterCategory = filterCategory;

document.addEventListener('DOMContentLoaded', () => {
  // Story circles click listeners
  document.querySelectorAll('.story-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const story = item.getAttribute('data-story') || (item.getAttribute('onclick') || '').match(/filterCategory\('([^']+)'/)?.[1];
      if (story) {
        filterCategory(story, true);
      }
    });
  });

  // Filter tab buttons click listeners
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter) {
        filterCategory(filter);
      }
    });
  });

  // Mobile Nav Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');

  mobileMenuBtn?.addEventListener('click', () => {
    mobileNavDrawer?.classList.add('open');
  });

  closeMobileNavBtn?.addEventListener('click', () => {
    mobileNavDrawer?.classList.remove('open');
  });

  // Cart Drawer Toggle
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');

  document.querySelectorAll('.open-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartDrawerOverlay?.classList.add('open');
    });
  });

  closeCartBtn?.addEventListener('click', () => {
    cartDrawerOverlay?.classList.remove('open');
  });

  cartDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) cartDrawerOverlay.classList.remove('open');
  });

  // Promotional Offer Modal Listeners
  const offerModal = document.getElementById('offerModal');
  document.getElementById('closeOfferBtn')?.addEventListener('click', () => closeOfferModal(true));
  offerModal?.addEventListener('click', (e) => {
    if (e.target === offerModal) closeOfferModal(true);
  });

  // Native App Experience: Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOfferModal();
      cartDrawerOverlay?.classList.remove('open');
      mobileNavDrawer?.classList.remove('open');
      document.getElementById('quickViewModal')?.classList.remove('open');
    }
  });

  // Initialize Shopify Promotional Offer Popup
  initShopifyOfferPopup();
});

// ============================================================
// 🎁 PROMOTIONAL OFFER & APP CONTROLLERS
// ============================================================
let offerCountdownInterval = null;

function initShopifyOfferPopup() {
  const cfg = window.AneriiShopifyOffer;
  const floatingBtn = document.getElementById('floatingOfferBtn');
  const mobNavOffer = document.getElementById('mobNavOffer');

  if (!cfg || !cfg.enabled) {
    if (floatingBtn) floatingBtn.style.display = 'none';
    if (mobNavOffer) mobNavOffer.style.display = 'none';
    return;
  }

  if (floatingBtn) floatingBtn.style.display = 'inline-flex';
  if (mobNavOffer) mobNavOffer.style.display = 'flex';

  // Start live countdown timer
  startOfferCountdown(cfg.expiryHours || 48);

  // Auto trigger after delay if not already dismissed in session
  const dismissed = sessionStorage.getItem('anerii_offer_dismissed');
  if (!dismissed) {
    const delay = (cfg.delaySeconds || 2.5) * 1000;
    setTimeout(() => {
      openOfferModal();
    }, delay);
  }
}

function startOfferCountdown(hours = 48) {
  if (offerCountdownInterval) clearInterval(offerCountdownInterval);

  let targetTime = null;
  try {
    const stored = localStorage.getItem('anerii_offer_target_time');
    if (stored) targetTime = parseInt(stored, 10);
  } catch(e) {}

  if (!targetTime || targetTime < Date.now()) {
    targetTime = Date.now() + (hours * 60 * 60 * 1000);
    try {
      localStorage.setItem('anerii_offer_target_time', targetTime.toString());
    } catch(e) {}
  }

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, targetTime - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const h = Math.floor(diff / (1000 * 60 * 60));
    diff -= h * (1000 * 60 * 60);
    const m = Math.floor(diff / (1000 * 60));
    diff -= m * (1000 * 60);
    const s = Math.floor(diff / 1000);

    const dEl = document.getElementById('timerDays');
    const hEl = document.getElementById('timerHours');
    const mEl = document.getElementById('timerMins');
    const sEl = document.getElementById('timerSecs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }

  tick();
  offerCountdownInterval = setInterval(tick, 1000);
}

function openOfferModal() {
  const modal = document.getElementById('offerModal');
  if (!modal) return;
  modal.style.display = 'flex';
  // Small tick for CSS opacity transition
  setTimeout(() => {
    modal.classList.add('open');
  }, 10);
  document.body.classList.add('modal-open');
}
window.openOfferModal = openOfferModal;

function closeOfferModal(remember = false) {
  const modal = document.getElementById('offerModal');
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  document.body.classList.remove('modal-open');

  if (remember) {
    try {
      sessionStorage.setItem('anerii_offer_dismissed', 'true');
    } catch(e) {}
  }
}
window.closeOfferModal = closeOfferModal;

function copyOfferCoupon() {
  const code = (window.AneriiShopifyOffer && window.AneriiShopifyOffer.couponCode) || 'ANERII20';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      const btnText = document.getElementById('copyBtnText');
      if (btnText) {
        btnText.textContent = 'COPIED! 🎉';
        setTimeout(() => {
          btnText.textContent = 'COPY CODE';
        }, 2500);
      }
      showShopifyToast(`Coupon "${code}" copied! Discount applied at checkout 🎁`);
    }).catch(() => {
      showShopifyToast(`Coupon: ${code}`);
    });
  } else {
    showShopifyToast(`Coupon: ${code}`);
  }
}
window.copyOfferCoupon = copyOfferCoupon;

function applyAndShopOffer() {
  const code = (window.AneriiShopifyOffer && window.AneriiShopifyOffer.couponCode) || 'ANERII20';
  closeOfferModal(true);
  showShopifyToast(`Offer Activated! "${code}" ready for checkout 🛍️`);

  const collections = document.getElementById('collections') || document.querySelector('.collection, .main-collection, #MainContent');
  if (collections) {
    collections.scrollIntoView({ behavior: 'smooth' });
  }
}
window.applyAndShopOffer = applyAndShopOffer;

function handleMobNavClick(event, tabName) {
  document.querySelectorAll('.mob-nav-item').forEach(item => {
    item.classList.remove('active');
  });

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  if (tabName === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tabName === 'shop') {
    const col = document.getElementById('collections') || document.querySelector('.collection, .main-collection');
    if (col) col.scrollIntoView({ behavior: 'smooth' });
  } else if (tabName === 'lookbook') {
    const lb = document.getElementById('lookbook') || document.querySelector('.lookbook-section, [data-section-type="lookbook"]');
    if (lb) lb.scrollIntoView({ behavior: 'smooth' });
  }
}
window.handleMobNavClick = handleMobNavClick;

function showShopifyToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
window.showShopifyToast = showShopifyToast;

