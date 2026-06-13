// Injects shared header and footer into every page
// Reads from window.LUNA_CONFIG if available (set by /site-config.js)

function renderHeader(activePage) {
  const s = (window.LUNA_CONFIG && window.LUNA_CONFIG.site) || {};
  const siteName    = s.name        || 'לונה';
  const siteTagline = s.tagline     || 'עולם של אפייה';
  const phone       = s.phone       || '03-1234567';
  const hours       = s.hours       || "א'-ה' 09:00–18:00";
  const shipping    = s.shippingText|| 'משלוח חינם בקנייה מעל ₪250';
  const address     = s.address     || 'רוטשילד 25, תל אביב';
  const email       = s.email       || 'info@luna-baking.co.il';
  const whatsapp    = s.whatsapp    || '9721234567';
  const footerDesc  = s.footerDesc  || 'חומרי גלם, כלים ואריזות לכל רמות האפייה.';

  const header = `
  <div class="top-bar">
    <span><i class="fa fa-truck"></i> ${shipping}</span>
    <span><i class="fa fa-phone"></i> ${phone}</span>
    <span><i class="fa fa-clock"></i> ${hours}</span>
  </div>
  <header class="header">
    <div class="header-inner container">
      <a href="index.html" class="logo">
        <span class="logo-icon">🎂</span>
        <div class="logo-text">
          <span class="logo-main">${siteName}</span>
          <span class="logo-sub">${siteTagline}</span>
        </div>
      </a>
      <nav class="nav" id="nav">
        <ul class="nav-list">
          <li class="nav-item has-dropdown ${activePage==='raw'?'active-nav':''}">
            <a href="raw-materials.html">חומרי גלם <i class="fa fa-chevron-down"></i></a>
            <div class="dropdown">
              <a href="raw-materials.html">כל חומרי הגלם</a>
              <a href="raw-materials.html">שוקולד וציפויים</a>
              <a href="raw-materials.html">קמחים וסולת</a>
              <a href="raw-materials.html">סוכר ומתיקים</a>
              <a href="raw-materials.html">צבעי מאכל</a>
              <a href="raw-materials.html">תמציות וניל</a>
            </div>
          </li>
          <li class="nav-item has-dropdown ${activePage==='tools'?'active-nav':''}">
            <a href="tools.html">כלי עבודה <i class="fa fa-chevron-down"></i></a>
            <div class="dropdown">
              <a href="tools.html">כל הכלים</a>
              <a href="tools.html">תבניות אפייה</a>
              <a href="tools.html">שקיות זילוף</a>
              <a href="tools.html">פיות זילוף</a>
              <a href="tools.html">קוצצים וחותכנים</a>
              <a href="tools.html">מערוכים ומשטחים</a>
            </div>
          </li>
          <li class="nav-item has-dropdown ${activePage==='packaging'?'active-nav':''}">
            <a href="packaging.html">אריזות <i class="fa fa-chevron-down"></i></a>
            <div class="dropdown">
              <a href="packaging.html">כל האריזות</a>
              <a href="packaging.html">קופסאות לעוגות</a>
              <a href="packaging.html">קופסאות לקאפקייקס</a>
              <a href="packaging.html">ניירות ורדיד</a>
              <a href="packaging.html">מגשים ובסיסים</a>
            </div>
          </li>
          <li class="nav-item ${activePage==='recipes'?'active-nav':''}">
            <a href="recipes.html">מתכונים</a>
          </li>
          <li class="nav-item">
            <a href="index.html#sale" class="sale-link">מבצעים 🔥</a>
          </li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="search-toggle" aria-label="חיפוש"><i class="fa fa-search"></i></button>
        <button class="icon-btn" aria-label="מועדפים"><i class="fa fa-heart"></i></button>
        <button class="icon-btn cart-btn" aria-label="סל קניות">
          <i class="fa fa-shopping-cart"></i>
          <span class="cart-count" id="cart-count">0</span>
        </button>
        <button class="hamburger" id="hamburger" aria-label="תפריט">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="search-bar" id="search-bar">
      <div class="container">
        <input type="text" placeholder="חפש מוצרים, מתכונים..." id="search-input"/>
        <button id="search-btn"><i class="fa fa-search"></i></button>
      </div>
    </div>
  </header>`;

  const footer = `
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <a href="index.html" class="logo">
          <span class="logo-icon">🎂</span>
          <div class="logo-text">
            <span class="logo-main" style="color:#fff">${siteName}</span>
            <span class="logo-sub" style="color:#ccc">${siteTagline}</span>
          </div>
        </a>
        <p class="footer-desc">${footerDesc}</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>קטגוריות</h4>
        <ul>
          <li><a href="raw-materials.html">חומרי גלם</a></li>
          <li><a href="tools.html">כלי עבודה</a></li>
          <li><a href="packaging.html">אריזות לעוגות</a></li>
          <li><a href="recipes.html">מתכונים</a></li>
          <li><a href="index.html#sale">מבצעים</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>שירות לקוחות</h4>
        <ul>
          <li><a href="#">אודות</a></li>
          <li><a href="#">צור קשר</a></li>
          <li><a href="#">מדיניות משלוחים</a></li>
          <li><a href="#">מדיניות החזרות</a></li>
          <li><a href="#">שאלות נפוצות</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>צור קשר</h4>
        <ul class="contact-list">
          <li><i class="fa fa-map-marker-alt"></i> ${address}</li>
          <li><i class="fa fa-phone"></i> ${phone}</li>
          <li><i class="fa fa-envelope"></i> ${email}</li>
          <li><i class="fa fa-clock"></i> ${hours}</li>
        </ul>
        <a href="https://wa.me/${whatsapp}" class="whatsapp-btn">
          <i class="fab fa-whatsapp"></i> וואטסאפ
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 LUNA | לונה. כל הזכויות שמורות.</p>
        <div class="footer-links">
          <a href="#">מדיניות פרטיות</a>
          <a href="#">תנאי שימוש</a>
        </div>
      </div>
    </div>
  </footer>
  <div class="toast" id="toast"><i class="fa fa-check-circle"></i> המוצר נוסף לסל!</div>
  <button class="back-to-top" id="back-to-top" aria-label="חזור למעלה"><i class="fa fa-chevron-up"></i></button>`;

  const cartDrawer = `
  <div class="cart-overlay" id="cart-overlay"></div>
  <div class="cart-drawer" id="cart-drawer">
    <div class="cart-drawer-header">
      <h3>סל הקניות</h3>
      <button class="cart-drawer-close" id="cart-drawer-close"><i class="fa fa-xmark"></i></button>
    </div>
    <div class="cart-drawer-items" id="cart-drawer-items"></div>
    <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
  </div>`;

  document.getElementById('page-header').innerHTML = header;
  document.getElementById('page-footer').innerHTML = footer + cartDrawer;

  initSharedUI();
}

function initSharedUI() {
  // Cart count from localStorage
  updateCartDisplay();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-item.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('dropdown-open');
      }
    });
  });

  // Search toggle
  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) document.getElementById('search-input').focus();
  });
  document.getElementById('search-btn').addEventListener('click', doSearch);
  document.getElementById('search-input').addEventListener('keydown', e => { if(e.key==='Enter') doSearch(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape') searchBar.classList.remove('open'); });

  // Sticky header shadow
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.08)';
    const btn = document.getElementById('back-to-top');
    if(btn) btn.classList.toggle('visible', window.scrollY > 400);
  }, {passive: true});

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Cart drawer
  document.querySelector('.cart-btn').addEventListener('click', openCartDrawer);
  document.getElementById('cart-drawer-close').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-overlay').addEventListener('click', closeCartDrawer);
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const cart = getCart();
  const itemsEl = document.getElementById('cart-drawer-items');
  const footerEl = document.getElementById('cart-drawer-footer');

  if (!cart.length) {
    itemsEl.innerHTML = `<div class="cart-empty"><i class="fa fa-cart-shopping"></i><p>הסל ריק</p></div>`;
    footerEl.innerHTML = '';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const p = (typeof PRODUCTS !== 'undefined') ? PRODUCTS[item.id] : null;
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    total += lineTotal;
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">₪${p.price.toFixed(2)}</div>
          <div class="cart-item-qty">
            <button onclick="changeQty('${p.id}',-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${p.id}',1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${p.id}')"><i class="fa fa-trash"></i></button>
      </div>`;
  }).join('');

  footerEl.innerHTML = `
    <div class="cart-total">
      <span>סה"כ</span>
      <strong>₪${total.toFixed(2)}</strong>
    </div>
    <button class="btn btn-primary cart-checkout-btn">לתשלום</button>
    <button class="btn btn-outline cart-clear-btn" onclick="clearCart()">רוקן סל</button>`;
}

function changeQty(productId, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  renderCartDrawer();
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCartDrawer();
}

function clearCart() {
  saveCart([]);
  renderCartDrawer();
}

function doSearch() {
  const q = document.getElementById('search-input').value.trim();
  if (!q) return;
  // Simple: search in product names
  const results = Object.values(PRODUCTS).filter(p => p.name.includes(q) || p.description.includes(q));
  if (results.length === 1) {
    window.location.href = `product.html?id=${results[0].id}`;
  } else if (results.length > 1) {
    window.location.href = `raw-materials.html?q=${encodeURIComponent(q)}`;
  }
}

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}
function addToCart(productId, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) cart[idx].qty += qty;
  else cart.push({id: productId, qty});
  saveCart(cart);
  showToast();
}
function updateCartDisplay() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count, #cart-count').forEach(el => el.textContent = count);
}
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  if (msg) toast.innerHTML = `<i class="fa fa-check-circle"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== PRODUCT CARD HTML =====
function productCardHTML(p) {
  const stars = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
  const badge = p.badge ? `<div class="product-badge ${p.badge==='מבצע'?'sale':''}">${p.badge}</div>` : '';
  const oldPrice = p.oldPrice ? `<span class="price-old">₪${p.oldPrice.toFixed(2)}</span>` : '';
  return `
    <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'" style="cursor:pointer">
      ${badge}
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        <div class="product-actions" onclick="event.stopPropagation()">
          <button class="pact-btn" title="מועדפים" onclick="toggleWishlist(this)"><i class="fa fa-heart"></i></button>
          <button class="pact-btn" title="הוסף לסל" onclick="addToCart('${p.id}',1);showAddedFeedback(this)"><i class="fa fa-cart-plus"></i></button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h4>${p.name}</h4>
        <div class="stars">${stars} <span>(${p.reviews})</span></div>
        <div class="product-price">
          <span class="price">₪${p.price.toFixed(2)}</span>
          ${oldPrice}
        </div>
      </div>
    </div>`;
}

function showAddedFeedback(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fa fa-check"></i>';
  setTimeout(() => btn.innerHTML = orig, 1200);
}

function toggleWishlist(btn) {
  const icon = btn.querySelector('i');
  const active = btn.dataset.active === '1';
  btn.dataset.active = active ? '0' : '1';
  icon.style.color = active ? '' : '#e74c3c';
}
