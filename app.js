// Anerii Luxury Storefront Application Controller

// Global State
const AneriiState = {
  cart: JSON.parse(localStorage.getItem('anerii_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('anerii_wishlist') || '[]'),
  currentFilter: 'all',
  freeShippingThreshold: 999,
  activeReelIndex: 0
};

// Core Functions
function saveCart() {
  localStorage.setItem('anerii_cart', JSON.stringify(AneriiState.cart));
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function openCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) overlay.classList.add('open');
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) overlay.classList.remove('open');
}

function openMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer) drawer.classList.add('open');
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer) drawer.classList.remove('open');
}

function updateCartUI() {
  const totalCount = AneriiState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AneriiState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update Badges
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = totalCount;
  });

  const cartSubtotal = document.getElementById('cartSubtotal');
  if (cartSubtotal) {
    cartSubtotal.textContent = `Rs. ${subtotal.toLocaleString('en-IN')}.00`;
  }

  // Free Shipping Progress Calculation
  const meterText = document.getElementById('meterText');
  const meterBarFill = document.getElementById('meterBarFill');
  if (meterText && meterBarFill) {
    if (subtotal === 0) {
      meterText.innerHTML = `<span>Add <strong>Rs. ${AneriiState.freeShippingThreshold}</strong> for Free Shipping 🎉</span>`;
      meterBarFill.style.width = '0%';
    } else if (subtotal < AneriiState.freeShippingThreshold) {
      const remaining = AneriiState.freeShippingThreshold - subtotal;
      const percent = Math.min(100, Math.round((subtotal / AneriiState.freeShippingThreshold) * 100));
      meterText.innerHTML = `<span>Add <strong>Rs. ${remaining.toLocaleString('en-IN')}</strong> more for <strong>FREE SHIPPING!</strong></span><span>${percent}%</span>`;
      meterBarFill.style.width = `${percent}%`;
    } else {
      meterText.innerHTML = `<span style="color:var(--color-primary); font-weight:700;">🎉 Congratulations! You unlocked FREE Express Shipping!</span>`;
      meterBarFill.style.width = '100%';
    }
  }

  // Render Items
  const cartDrawerBody = document.getElementById('cartDrawerBody');
  if (!cartDrawerBody) return;

  if (AneriiState.cart.length === 0) {
    cartDrawerBody.innerHTML = `
      <div class="cart-empty-state">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <h3 style="font-family:var(--font-heading); color:var(--color-primary); margin-top:8px;">Your Bag is Empty</h3>
        <p style="font-size:0.86rem;">Explore our handcrafted pure cotton collections.</p>
        <button class="btn-primary" onclick="closeCartDrawer()" style="margin-top:12px;">Start Shopping</button>
      </div>
    `;
  } else {
    cartDrawerBody.innerHTML = `
      ${AneriiState.cart.map((item, index) => `
        <div class="cart-item-card">
          <img class="cart-item-img" src="${item.image}" alt="${item.title}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-size">Size: ${item.size}</div>
            <div class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}.00</div>
            
            <div class="cart-qty-row">
              <div class="qty-stepper">
                <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
              </div>
              <button class="cart-item-remove-btn" onclick="removeCartItem(${index})">Remove</button>
            </div>
          </div>
        </div>
      `).join('')}

      <div class="cart-upsell-section">
        <div class="cart-upsell-title">Pair With This ✨</div>
        <div class="cart-upsell-card">
          <img class="cart-upsell-img" src="${PRODUCTS_DATA[3].images[0]}" alt="${PRODUCTS_DATA[3].title}">
          <div class="cart-upsell-info">
            <div class="cart-upsell-name">${PRODUCTS_DATA[3].title}</div>
            <div class="cart-upsell-price">Rs. ${PRODUCTS_DATA[3].price}</div>
          </div>
          <button class="cart-upsell-add-btn" onclick="addToCart('${PRODUCTS_DATA[3].id}', 'M'); openCartDrawer();">+ Add</button>
        </div>
      </div>
    `;
  }
}

function updateWishlistUI() {
  document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
    badge.textContent = AneriiState.wishlist.length;
  });
}

function addToCart(productId, size) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = AneriiState.cart.findIndex(item => item.id === productId && item.size === size);
  if (existingIndex > -1) {
    AneriiState.cart[existingIndex].quantity += 1;
  } else {
    AneriiState.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: size,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.title} (${size})" to Bag ✨`);
}

function removeCartItem(index) {
  AneriiState.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast('Item removed from bag');
}

function updateCartQuantity(index, delta) {
  if (!AneriiState.cart[index]) return;
  AneriiState.cart[index].quantity += delta;
  if (AneriiState.cart[index].quantity <= 0) {
    AneriiState.cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function toggleWishlist(productId) {
  const index = AneriiState.wishlist.indexOf(productId);
  if (index > -1) {
    AneriiState.wishlist.splice(index, 1);
    showToast('Removed from Wishlist 🤍');
  } else {
    AneriiState.wishlist.push(productId);
    showToast('Saved to Wishlist ❤️');
  }
  localStorage.setItem('anerii_wishlist', JSON.stringify(AneriiState.wishlist));
  updateWishlistUI();
  renderProducts();
}

function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  const quickViewCard = document.getElementById('quickViewCard');
  const quickViewModal = document.getElementById('quickViewModal');
  if (!product || !quickViewCard) return;

  quickViewCard.innerHTML = `
    <button class="modal-close-btn" onclick="document.getElementById('quickViewModal').classList.remove('open')">✕</button>

    <div class="quickview-gallery">
      <img id="qvMainImg" src="${product.images[0]}" alt="${product.title}" style="width:100%; height:370px; object-fit:cover; border-radius:var(--radius-md);">
      <div style="display:flex; gap:8px; margin-top:10px; overflow-x:auto;">
        ${product.images.map((img, i) => `
          <img src="${img}" style="width:58px; height:72px; object-fit:cover; border-radius:var(--radius-xs); cursor:pointer; border:1px solid ${i === 0 ? 'var(--color-accent-gold)' : 'var(--border-light)'};" 
               onclick="document.getElementById('qvMainImg').src='${img}'">
        `).join('')}
      </div>
    </div>

    <div class="quickview-details" style="display:flex; flex-direction:column; gap:12px;">
      <span style="font-size:0.75rem; font-weight:700; color:var(--color-accent-gold); text-transform:uppercase; letter-spacing:0.08em;">${product.collection} • ${product.fabric}</span>
      <h2 style="font-family:var(--font-heading); font-size:1.5rem; color:var(--color-primary); line-height:1.2;">${product.title}</h2>
      
      <div style="display:flex; align-items:baseline; gap:8px;">
        <span style="font-size:1.35rem; font-weight:700; color:var(--color-primary);">Rs. ${product.price.toLocaleString('en-IN')}.00</span>
        <span style="font-size:0.95rem; color:var(--color-text-muted); text-decoration:line-through;">Rs. ${product.originalPrice.toLocaleString('en-IN')}.00</span>
        <span style="font-size:0.8rem; font-weight:700; color:#c93b3b;">${product.discount}</span>
      </div>

      <p style="font-size:0.86rem; color:var(--color-text-muted); line-height:1.45;">${product.description}</p>

      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.82rem; font-weight:600;">
          <span>Select Size:</span>
          <span style="color:var(--color-accent-gold); cursor:pointer;" onclick="alert('Size Chart (inches):\\nS: Bust 36 | Waist 32\\nM: Bust 38 | Waist 34\\nL: Bust 40 | Waist 36\\nXL: Bust 42 | Waist 38\\nXXL: Bust 44 | Waist 40')">📐 Size Chart</span>
        </div>
        <div id="qvSizeContainer" style="display:flex; gap:8px;">
          ${product.sizes.map((s, idx) => `
            <button class="size-pill-btn ${idx === 0 ? 'selected' : ''}" 
                    style="width:36px; height:36px; font-size:0.84rem; color:${idx === 0 ? 'var(--color-primary-dark)' : 'var(--color-primary)'}; background:${idx === 0 ? 'var(--color-accent-gold)' : 'var(--color-bg-secondary)'};"
                    onclick="
                      document.querySelectorAll('#qvSizeContainer .size-pill-btn').forEach(b => {
                        b.style.background='var(--color-bg-secondary)';
                        b.style.color='var(--color-primary)';
                      });
                      this.style.background='var(--color-accent-gold)';
                      this.style.color='var(--color-primary-dark)';
                      window.qvSelectedSize = '${s}';
                    ">
              ${s}
            </button>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; gap:10px; margin-top:6px;">
        <button class="btn-primary" style="flex:1; padding:12px;" 
                onclick="addToCart('${product.id}', window.qvSelectedSize || '${product.sizes[0]}'); document.getElementById('quickViewModal').classList.remove('open');">
          ADD TO CART
        </button>
        <button class="btn-primary" style="background:#1c231a; color:#fff; flex:1; padding:12px;"
                onclick="addToCart('${product.id}', window.qvSelectedSize || '${product.sizes[0]}'); document.getElementById('quickViewModal').classList.remove('open'); openCartDrawer();">
          BUY IT NOW
        </button>
      </div>

      <div style="border-top:1px solid var(--border-light); padding-top:10px; font-size:0.78rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:4px;">
        <div>✓ 100% Breathable 60×60 Pure Cotton</div>
        <div>✓ Free Express Shipping on orders above Rs. 999</div>
        <div>✓ Hassle-free 7-day doorstep size exchange</div>
      </div>
    </div>
  `;

  window.qvSelectedSize = product.sizes[0];
  if (quickViewModal) quickViewModal.classList.add('open');
}

function filterCategory(cat, shouldScroll = false) {
  AneriiState.currentFilter = cat;
  
  // Sync Category Filter Buttons
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    if (btn.dataset.filter === cat) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Sync Story Circle Pills
  document.querySelectorAll('.story-item').forEach(item => {
    if (item.dataset.story === cat) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  renderProducts();

  // Smooth scroll to collections section if triggered from story pills or nav
  if (shouldScroll) {
    const collSection = document.getElementById('collections');
    if (collSection) {
      const headerOffset = 70;
      const elementPosition = collSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = PRODUCTS_DATA.filter(product => {
    if (AneriiState.currentFilter === 'all') return true;
    if (AneriiState.currentFilter === 'co-ords') return product.category === 'co-ords';
    if (AneriiState.currentFilter === 'kurta-sets') return product.category === 'kurta-sets';
    if (AneriiState.currentFilter === 'kurtis') return product.category === 'kurtis';
    if (AneriiState.currentFilter === 'noor-e-neel') return product.collection === 'noor-e-neel';
    if (AneriiState.currentFilter === 'rangrez') return product.collection === 'rangrez';
    if (AneriiState.currentFilter === 'gulnaaz') return product.collection === 'gulnaaz';
    return true;
  });

  filtered.forEach(product => {
    const isWishlisted = AneriiState.wishlist.includes(product.id);
    const wrap = document.createElement('div');
    wrap.className = 'product-card-wrap';

    wrap.innerHTML = `
      <div class="product-card" onclick="openQuickView('${product.id}')">
        <span class="product-sale-pill">Sale</span>
        
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
                title="Wishlist">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <div class="product-media-wrap">
          <img class="product-img-primary" src="${product.images[0]}" alt="${product.title}" loading="lazy">
          <img class="product-img-hover" src="${product.images[1] || product.images[0]}" alt="${product.title}" loading="lazy">
        </div>

        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          
          <div class="product-pricing">
            <span class="price-original">Rs. ${product.originalPrice.toLocaleString('en-IN')}.00</span>
            <span class="price-current">Rs. ${product.price.toLocaleString('en-IN')}.00</span>
          </div>

          <div class="product-card-btn-row">
            <button class="card-btn-add" onclick="event.stopPropagation(); openQuickView('${product.id}')">
              ADD TO CART
            </button>
            <button class="card-btn-buy" onclick="event.stopPropagation(); addToCart('${product.id}', '${product.sizes[0]}'); openCartDrawer();">
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(wrap);
  });
}

function renderReels() {
  const track = document.getElementById('reelsTrack');
  if (!track) return;
  track.innerHTML = '';

  REELS_DATA.forEach((reel, index) => {
    const product = PRODUCTS_DATA.find(p => p.id === reel.productId) || PRODUCTS_DATA[0];
    const reelCard = document.createElement('div');
    reelCard.className = 'reel-card';
    reelCard.onclick = () => openReelPlayer(index);

    reelCard.innerHTML = `
      <video class="reel-video" src="${reel.video}" loop muted autoplay playsinline preload="auto"></video>
      <div class="reel-overlay">
        <div class="reel-top-bar">
          <span class="reel-sound-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            </svg>
          </span>
          <span style="font-size: 0.74rem; color: #fff; font-weight:600;">
            ♥ ${reel.likes}
          </span>
        </div>

        <div class="reel-bottom-info">
          <div class="reel-title">${reel.title}</div>
          <div class="reel-collection">${reel.collectionName}</div>
          <button class="reel-shop-btn" onclick="event.stopPropagation(); openQuickView('${product.id}')">
            <span>Shop Look • Rs. ${product.price}</span>
          </button>
        </div>
      </div>
    `;

    track.appendChild(reelCard);
  });
}

function openReelPlayer(index) {
  AneriiState.activeReelIndex = index;
  const reel = REELS_DATA[index];
  const product = PRODUCTS_DATA.find(p => p.id === reel.productId) || PRODUCTS_DATA[0];
  const reelModalVideo = document.getElementById('reelModalVideo');
  const reelModalSideProduct = document.getElementById('reelModalSideProduct');
  const reelModal = document.getElementById('reelModal');

  if (reelModalVideo) {
    reelModalVideo.src = reel.video;
    reelModalVideo.play();
  }

  if (reelModalSideProduct) {
    reelModalSideProduct.innerHTML = `
      <div>
        <span style="font-size: 0.74rem; font-weight:700; color:var(--color-accent-gold); letter-spacing:0.08em; text-transform:uppercase;">As Seen in Reel</span>
        <h3 style="font-family:var(--font-heading); font-size:1.3rem; margin:6px 0; color:var(--color-primary);">${product.title}</h3>
        <img src="${product.images[0]}" alt="${product.title}" style="width:100%; height:190px; object-fit:cover; border-radius:var(--radius-sm); margin:10px 0;">
        <p style="font-size:0.82rem; color:var(--color-text-muted); line-height:1.4;">${product.description.slice(0, 100)}...</p>
      </div>
      <div>
        <div style="font-size:1.15rem; font-weight:700; color:var(--color-primary); margin-bottom:12px;">Rs. ${product.price.toLocaleString('en-IN')}.00</div>
        <button class="btn-primary" style="width:100%;" onclick="openQuickView('${product.id}'); document.getElementById('reelModal').classList.remove('open');">
          View & Select Size
        </button>
      </div>
    `;
  }

  if (reelModal) reelModal.classList.add('open');
}

// Info / Customer Care Policy Modal
function openInfoModal(tabName = 'shipping') {
  const modal = document.getElementById('infoModal');
  if (!modal) return;
  switchInfoTab(tabName);
  modal.classList.add('open');
}

function closeInfoModal() {
  const modal = document.getElementById('infoModal');
  if (modal) modal.classList.remove('open');
}

function switchInfoTab(tabName) {
  // Update Buttons
  document.querySelectorAll('.info-tab-btn').forEach(btn => {
    if (btn.dataset.info === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Hide all tabs
  document.querySelectorAll('.info-tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected tab
  if (tabName === 'shipping') {
    document.getElementById('tabShipping')?.classList.add('active');
  } else if (tabName === 'exchange') {
    document.getElementById('tabExchange')?.classList.add('active');
  } else if (tabName === 'size-guide') {
    document.getElementById('tabSizeGuide')?.classList.add('active');
  } else if (tabName === 'contact') {
    document.getElementById('tabContact')?.classList.add('active');
  }
}

// Global Exports
window.Anerii = {
  openQuickView,
  addToCart,
  quickAddToCart: (id, size) => { addToCart(id, size); openCartDrawer(); },
  removeFromCart: removeCartItem,
  updateQuantity: updateCartQuantity,
  toggleWishlist,
  openCart: openCartDrawer,
  closeCart: closeCartDrawer,
  filterCategory,
  openMobileNav,
  closeMobileNav,
  openInfoModal,
  closeInfoModal,
  switchInfoTab
};

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderReels();
  updateCartUI();
  updateWishlistUI();

  // Scroll effect for header
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // Mobile menu drawer
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileNav);
  document.getElementById('closeMobileNavBtn')?.addEventListener('click', closeMobileNav);
  document.getElementById('mobileNavDrawer')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('mobileNavDrawer')) closeMobileNav();
  });

  // Hero sound toggle
  const heroVideo = document.getElementById('heroVideo');
  const heroSoundToggle = document.getElementById('heroSoundToggle');
  heroSoundToggle?.addEventListener('click', () => {
    if (heroVideo && heroVideo.muted) {
      heroVideo.muted = false;
      heroSoundToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      showToast('Sound Unmuted 🔊');
    } else if (heroVideo) {
      heroVideo.muted = true;
      heroSoundToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      showToast('Sound Muted 🔇');
    }
  });

  // Cart buttons
  document.querySelectorAll('.open-cart-btn').forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });
  document.getElementById('closeCartBtn')?.addEventListener('click', closeCartDrawer);

  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  cartDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) closeCartDrawer();
  });

  // Quick View Modal
  const quickViewModal = document.getElementById('quickViewModal');
  quickViewModal?.addEventListener('click', (e) => {
    if (e.target === quickViewModal) quickViewModal.classList.remove('open');
  });

  // Reel Modal
  const reelModal = document.getElementById('reelModal');
  const closeReelBtn = document.getElementById('closeReelBtn');
  const reelModalVideo = document.getElementById('reelModalVideo');

  closeReelBtn?.addEventListener('click', () => {
    reelModal?.classList.remove('open');
    if (reelModalVideo) reelModalVideo.pause();
  });

  reelModal?.addEventListener('click', (e) => {
    if (e.target === reelModal) {
      reelModal.classList.remove('open');
      if (reelModalVideo) reelModalVideo.pause();
    }
  });

  // Customer Care Info Modal
  const infoModal = document.getElementById('infoModal');
  infoModal?.addEventListener('click', (e) => {
    if (e.target === infoModal) closeInfoModal();
  });

  // Filter Buttons
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterCategory(btn.dataset.filter);
    });
  });

  // Search Drawer
  const searchDrawer = document.getElementById('searchDrawer');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const closeSearchBtn = document.getElementById('closeSearchBtn');

  document.querySelectorAll('.open-search-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      searchDrawer?.classList.add('open');
      setTimeout(() => searchInput?.focus(), 100);
    });
  });

  closeSearchBtn?.addEventListener('click', () => {
    searchDrawer?.classList.remove('open');
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!searchResults) return;
    if (!q) {
      searchResults.innerHTML = '';
      return;
    }
    const matches = PRODUCTS_DATA.filter(p => p.title.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.category.includes(q));
    searchResults.innerHTML = `
      <div style="font-size:0.78rem; font-weight:700; text-transform:uppercase; color:var(--color-accent-gold); margin-bottom:8px;">
        ${matches.length} Results Found:
      </div>
      ${matches.map(p => `
        <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid var(--border-light); cursor:pointer;"
             onclick="openQuickView('${p.id}'); document.getElementById('searchDrawer').classList.remove('open');">
          <img src="${p.images[0]}" style="width:40px; height:50px; object-fit:cover; border-radius:var(--radius-xs);">
          <div>
            <div style="font-weight:600; font-size:0.88rem; color:var(--color-primary);">${p.title}</div>
            <div style="font-size:0.8rem; color:var(--color-accent-gold); font-weight:700;">Rs. ${p.price}.00</div>
          </div>
        </div>
      `).join('')}
    `;
  });

  // Desktop Mouse Wheel & Drag-To-Scroll for Reels Track
  const reelsTrack = document.getElementById('reelsTrack');
  if (reelsTrack) {
    reelsTrack.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        reelsTrack.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    reelsTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      reelsTrack.style.cursor = 'grabbing';
      startX = e.pageX - reelsTrack.offsetLeft;
      scrollLeft = reelsTrack.scrollLeft;
    });

    reelsTrack.addEventListener('mouseleave', () => {
      isDown = false;
      reelsTrack.style.cursor = 'grab';
    });

    reelsTrack.addEventListener('mouseup', () => {
      isDown = false;
      reelsTrack.style.cursor = 'grab';
    });

    reelsTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - reelsTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) isDragging = true;
      reelsTrack.scrollLeft = scrollLeft - walk;
    });

    reelsTrack.querySelectorAll('.reel-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (isDragging) {
          e.stopPropagation();
          e.preventDefault();
        }
      }, true);
    });
  }

  // IntersectionObserver: Auto-Pause Video & Mute Audio When Scrolled Away
  if ('IntersectionObserver' in window) {
    // 1. Hero Video Observer
    const heroSection = document.querySelector('.hero-section');
    const heroVideo = document.getElementById('heroVideo');
    const heroSoundToggle = document.getElementById('heroSoundToggle');

    if (heroSection && heroVideo) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
            heroVideo.muted = true;
            if (heroSoundToggle) {
              heroSoundToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              `;
            }
          }
        });
      }, { threshold: [0, 0.2, 0.6] });

      heroObserver.observe(heroSection);
    }

    // 2. Lookbook Reels Section Observer
    const lookbookSection = document.getElementById('lookbook');
    if (lookbookSection) {
      const lookbookObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            lookbookSection.querySelectorAll('video').forEach(v => {
              v.pause();
              v.muted = true;
            });
          }
        });
      }, { threshold: 0.1 });

      lookbookObserver.observe(lookbookSection);
    }
  }
});
