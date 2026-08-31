// Anerii Luxury Storefront - Shopify Theme Controller

document.addEventListener('DOMContentLoaded', () => {
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
