// Shared logic for all category pages
// Each page calls: initCategoryPage(categoryId, pageActiveName)

function initCategoryPage(categoryId, pageActiveName) {
  renderHeader(pageActiveName);

  const cat = CATEGORIES[categoryId];
  const allProducts = getProductsByCategory(categoryId);

  // Hero
  document.getElementById('cat-hero').style.backgroundImage = `url('${cat.image}')`;
  document.getElementById('cat-title').textContent = cat.name;
  document.getElementById('cat-desc').textContent = cat.description;
  document.getElementById('page-title').textContent = `${cat.name} | LUNA לונה`;

  // Subcategory pills
  const pillsEl = document.getElementById('subcat-pills');
  cat.subcats.forEach(sc => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (sc === 'הכל' ? ' active' : '');
    btn.textContent = sc;
    btn.onclick = () => filterBySubcat(sc, btn, allProducts);
    pillsEl.appendChild(btn);
  });

  // Count
  updateCount(allProducts.length);

  // Render all
  renderProducts(allProducts);

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    const sorted = sortProducts([...currentProducts], e.target.value);
    renderProducts(sorted);
  });

  // Price slider
  const slider = document.getElementById('price-slider');
  const maxPrice = Math.ceil(Math.max(...allProducts.map(p => p.price)));
  slider.max = maxPrice;
  slider.value = maxPrice;
  document.getElementById('price-max').textContent = `₪${maxPrice}`;
  slider.addEventListener('input', () => {
    document.getElementById('price-max').textContent = `₪${slider.value}`;
    const filtered = currentProducts.filter(p => p.price <= slider.value);
    renderProducts(filtered, false);
  });
}

let currentProducts = [];

function filterBySubcat(subcat, btn, allProducts) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  currentProducts = subcat === 'הכל'
    ? [...allProducts]
    : allProducts.filter(p => p.category === subcat || matchSubcat(p, subcat));
  updateCount(currentProducts.length);
  renderProducts(currentProducts);
}

function matchSubcat(p, sc) {
  const map = {
    'שוקולד': ['שוקולד', 'קקאו'],
    'קמחים': ['קמח'],
    'סוכר': ['סוכר'],
    'תמציות': ['וניל', 'תמצית'],
    'צבעים': ['צבע', 'צבעי'],
    'תבניות': ['תבנית'],
    'זילוף': ['זילוף', 'שקית', 'פייה', 'פיות'],
    'כלי עבודה': ['מערוך', 'מרית'],
    'קוצצנים': ['חותכני', 'קוצצ'],
    'מכשירים': ['מרית', 'מכשיר'],
    'קופסאות': ['קופסת', 'קופסה'],
    'קאפקייקס': ['קאפקייקס'],
    'מגשים': ['מגש'],
    'סרטים': ['סרט'],
    'ניירות': ['נייר', 'סלופן']
  };
  const keywords = map[sc] || [];
  return keywords.some(kw => p.name.includes(kw) || p.description.includes(kw));
}

function sortProducts(prods, method) {
  if (method === 'price-asc') return prods.sort((a,b) => a.price - b.price);
  if (method === 'price-desc') return prods.sort((a,b) => b.price - a.price);
  if (method === 'rating') return prods.sort((a,b) => b.stars - a.stars);
  if (method === 'popular') return prods.sort((a,b) => b.reviews - a.reviews);
  return prods;
}

function updateCount(n) {
  document.getElementById('prod-count').innerHTML = `מציג <strong>${n}</strong> מוצרים`;
}

function renderProducts(prods, updateCurrent = true) {
  if (updateCurrent) currentProducts = [...prods];
  const grid = document.getElementById('products-grid');
  if (prods.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-light);font-size:16px;">לא נמצאו מוצרים מתאימים</div>';
    return;
  }
  grid.innerHTML = prods.map(productCardHTML).join('');
  // animate
  grid.querySelectorAll('.product-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
}
