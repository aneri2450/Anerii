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
    const cardCat = (card.dataset.category || '').toLowerCase();
    const cardColl = (card.dataset.collection || '').toLowerCase();
    const cardHandle = (card.dataset.handle || '').toLowerCase();
    const cardTags = (card.dataset.tags || '').toLowerCase();
    const cardTitle = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
    const combined = `${cardCat} ${cardColl} ${cardHandle} ${cardTags} ${cardTitle}`.toLowerCase();
    
    let match = false;
    if (cat === 'all') {
      match = true;
    } else if (cat === 'co-ords') {
      match = cardCat === 'co-ords' || combined.includes('cord') || combined.includes('co-ord');
    } else if (cat === 'kurta-sets') {
      match = cardCat === 'kurta-sets' || (combined.includes('kurta') && !combined.includes('short'));
    } else if (cat === 'kurtis') {
      match = cardCat === 'kurtis' || combined.includes('kurti') || combined.includes('top') || combined.includes('short') || combined.includes('coral');
    } else if (cat === 'noor-e-neel') {
      match = cardColl === 'noor-e-neel' || combined.includes('noor');
    } else if (cat === 'rangrez') {
      match = cardColl === 'rangrez' || combined.includes('rangrez') || combined.includes('rani') || combined.includes('coral');
    } else if (cat === 'gulnaaz') {
      match = cardColl === 'gulnaaz' || combined.includes('gulnaaz');
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


// ==========================================================================
// STORIES FULL-SCREEN SLIDER & CONTINUOUS FLOW CONTROLLER
// ==========================================================================
window.scrollStoriesTrack = function(direction) {
  const container = document.getElementById('storiesContainer') || document.querySelector('.stories-container');
  if (container) {
    const step = 380;
    container.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
};

function initStoriesSlider() {
  const container = document.getElementById('storiesContainer') || document.querySelector('.stories-container');
  if (!container) return;

  const originalItems = Array.from(container.querySelectorAll('.story-item:not([data-clone])'));
  if (originalItems.length === 0) return;

  function populateClones() {
    if (window.innerWidth > 768) {
      container.querySelectorAll('.story-item[data-clone]').forEach(el => el.remove());
      
      const singleSetWidth = originalItems.reduce((acc, el) => acc + (el.offsetWidth || 90) + 28, 0);
      const neededSets = Math.max(2, Math.ceil((window.innerWidth * 2.5) / (singleSetWidth || 700)));
      
      for (let s = 1; s <= neededSets; s++) {
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.setAttribute('data-clone', 'true');
          container.appendChild(clone);
        });
      }
    }
  }

  populateClones();

  // Handle clicks dynamically on any story item (delegated on container)
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.story-item');
    if (!item) return;
    const story = item.getAttribute('data-story') || (item.getAttribute('onclick') || '').match(/filterCategory\('([^']+)'/)?.[1];
    if (story && typeof window.filterCategory === 'function') {
      window.filterCategory(story, true);
    }
  });

  // Continuous auto-glide on desktop
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let scrollLeftStart = 0;

  container.addEventListener('mouseenter', () => { isHovered = true; });
  container.addEventListener('mouseleave', () => { isHovered = false; });
  container.addEventListener('touchstart', () => { isHovered = true; }, { passive: true });
  container.addEventListener('touchend', () => { isHovered = false; }, { passive: true });

  // Mouse drag support on desktop
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    isHovered = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeftStart = container.scrollLeft;
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    isHovered = false;
  });
  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeftStart - walk;
  });

  // Animation frame loop for continuous auto-glide across full screen
  function glide() {
    if (!isHovered && !isDragging && window.innerWidth > 768) {
      container.scrollLeft += 0.8;
      if (container.scrollLeft >= (container.scrollWidth / 2)) {
        container.scrollLeft = 0;
      }
    }
    requestAnimationFrame(glide);
  }
  requestAnimationFrame(glide);

  window.addEventListener('resize', () => {
    populateClones();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStoriesSlider();
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

