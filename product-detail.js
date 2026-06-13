document.addEventListener('DOMContentLoaded', () => {
  renderHeader('');

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = id ? getProduct(id) : null;

  const content = document.getElementById('product-content');

  if (!product) {
    document.title = 'מוצר לא נמצא | LUNA לונה';
    content.innerHTML = `
      <div class="product-not-found">
        <h2>המוצר לא נמצא</h2>
        <p>ייתכן שהמוצר הוסר או שהכתובת שגויה.</p>
        <a href="index.html" class="btn btn-primary">חזרה לדף הבית</a>
      </div>`;
    return;
  }

  document.title = `${product.name} | LUNA לונה`;

  // Calculate discount %
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const starsHtml = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);

  // Thumbnails
  const images = product.images || [product.image];
  const thumbsHtml = images.length > 1
    ? `<div class="thumb-list">
        ${images.map((src, i) => `
          <div class="thumb ${i===0?'active':''}" onclick="switchImg('${src}',this)">
            <img src="${src}" alt="${product.name} תמונה ${i+1}" loading="lazy"/>
          </div>`).join('')}
       </div>`
    : '';

  // Ingredients
  const ingredientsHtml = (product.ingredients || [])
    .map(ing => `<li>${ing}</li>`).join('');

  // Specs
  const specsHtml = (product.specs || [])
    .map(s => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('');

  content.innerHTML = `
    <nav class="breadcrumb">
      <a href="index.html">ראשי</a>
      <span class="sep"><i class="fa fa-chevron-left" style="font-size:10px"></i></span>
      <a href="${product.categoryPage}">${product.category}</a>
      <span class="sep"><i class="fa fa-chevron-left" style="font-size:10px"></i></span>
      <span class="current">${product.name}</span>
    </nav>

    <div class="product-detail">

      <!-- LEFT: GALLERY -->
      <div class="product-gallery">
        <div class="main-img-wrap">
          <img src="${images[0]}" alt="${product.name}" id="main-img"/>
        </div>
        ${thumbsHtml}
      </div>

      <!-- RIGHT: INFO -->
      <div class="product-info-panel">
        <span class="product-category-tag">
          <a href="${product.categoryPage}">${product.category}</a>
        </span>

        <h1 class="product-title">${product.name}</h1>

        <div class="product-rating">
          <span class="rating-stars">${starsHtml}</span>
          <span class="rating-count">${product.reviews} ביקורות</span>
        </div>

        <div class="product-price-panel">
          <span class="price">₪${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span class="price-old">₪${product.oldPrice.toFixed(2)}</span><span class="discount-tag">-${discount}%</span>` : ''}
        </div>

        <p class="product-short-desc">${product.description}</p>

        <div class="product-meta-row">
          <span><strong>מק"ט:</strong> ${product.sku}</span>
          <span><strong>משקל/כמות:</strong> ${product.weight}</span>
        </div>

        <div class="purchase-row">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(-1)" aria-label="הפחת">−</button>
            <input type="number" class="qty-input" id="qty" value="1" min="1" max="99" readonly/>
            <button class="qty-btn" onclick="changeQty(1)" aria-label="הוסף">+</button>
          </div>

          <button class="add-to-cart-btn" id="add-btn" onclick="handleAddToCart()">
            <i class="fa fa-shopping-cart"></i>
            הוסף לסל
          </button>

          <button class="wishlist-btn" id="wish-btn" onclick="toggleWishlistDetail()" aria-label="מועדפים">
            <i class="fa fa-heart"></i>
          </button>
        </div>

        <!-- TABS -->
        <div class="tabs">
          <div class="tab-headers">
            <button class="tab-btn active" onclick="switchTab('desc',this)">תיאור</button>
            <button class="tab-btn" onclick="switchTab('ingr',this)">רכיבים</button>
            <button class="tab-btn" onclick="switchTab('specs',this)">מפרט</button>
            <button class="tab-btn" onclick="switchTab('tips',this)">טיפים</button>
          </div>

          <div class="tab-panel active" id="tab-desc">
            <p>${product.description}</p>
          </div>

          <div class="tab-panel" id="tab-ingr">
            <ul class="ingredients-list">${ingredientsHtml}</ul>
          </div>

          <div class="tab-panel" id="tab-specs">
            <table class="specs-table"><tbody>${specsHtml}</tbody></table>
          </div>

          <div class="tab-panel" id="tab-tips">
            ${product.tips
              ? `<div class="tip-box"><strong>💡 טיפ מקצועי:</strong><br/>${product.tips}</div>`
              : '<p>אין טיפים נוספים למוצר זה.</p>'}
          </div>
        </div>
      </div>
    </div>

    <!-- RELATED PRODUCTS -->
    <div class="related-section">
      <div class="section-header">
        <h2>מוצרים נוספים מהקטגוריה</h2>
        <a href="${product.categoryPage}" class="see-all">לכל המוצרים <i class="fa fa-arrow-left"></i></a>
      </div>
      <div class="products-grid" id="related-grid"></div>
    </div>`;

  // Load related products
  const related = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  document.getElementById('related-grid').innerHTML = related.map(productCardHTML).join('');

  // Animate cards
  animateOnScroll();
});

function switchImg(src, thumb) {
  document.getElementById('main-img').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

let qty = 1;
function changeQty(delta) {
  qty = Math.max(1, Math.min(99, qty + delta));
  document.getElementById('qty').value = qty;
}

function handleAddToCart() {
  const id = new URLSearchParams(window.location.search).get('id');
  addToCart(id, qty);
  const btn = document.getElementById('add-btn');
  btn.classList.add('added');
  btn.innerHTML = '<i class="fa fa-check"></i> נוסף לסל!';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = '<i class="fa fa-shopping-cart"></i> הוסף לסל';
  }, 2000);
}

function toggleWishlistDetail() {
  const btn = document.getElementById('wish-btn');
  btn.classList.toggle('active');
}

function switchTab(name, el) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  el.classList.add('active');
}

function animateOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target); }
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.product-card').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(24px)';
    el.style.transition='opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}
