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
});
