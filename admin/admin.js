// ── TipTap imports via esm.sh CDN ────────────────────────────────────────────
import { Editor }    from 'https://esm.sh/@tiptap/core@2.4.0';
import StarterKit    from 'https://esm.sh/@tiptap/starter-kit@2.4.0';
import Underline     from 'https://esm.sh/@tiptap/extension-underline@2.4.0';

// ── State ─────────────────────────────────────────────────────────────────────
let PASSWORD   = '';
let content    = {};          // site content JSON
let products   = [];          // products array
let tiptap     = null;        // active TipTap instance
let editingIdx = null;        // index into products[] being edited (-1 = new)
let pickerTarget = null;      // data-path or special key for image picker

// ── Boot ──────────────────────────────────────────────────────────────────────
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const pw = document.getElementById('login-pw').value;
  const res = await fetch('/api/auth', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: pw })
  });
  if (res.ok) {
    PASSWORD = pw;
    document.getElementById('login-screen').style.display  = 'none';
    document.getElementById('admin-shell').style.display   = '';
    await loadAll();
    initUI();
  } else {
    document.getElementById('login-error').classList.add('visible');
  }
});

document.getElementById('logout-btn').addEventListener('click', () => location.reload());

// ── Load all data ─────────────────────────────────────────────────────────────
async function loadAll() {
  const [cRes, pRes] = await Promise.all([fetch('/api/content'), fetch('/api/products')]);
  content  = await cRes.json();
  products = await pRes.json();
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const authHeaders = () => ({ 'Content-Type': 'application/json', 'x-admin-password': PASSWORD });

function toast(msg, type = 'success') {
  let t = document.querySelector('.admin-toast');
  if (!t) { t = document.createElement('div'); t.className = 'admin-toast'; document.body.appendChild(t); }
  t.className = `admin-toast ${type}`;
  t.innerHTML = `<i class="fa fa-${type==='success'?'check-circle':'exclamation-circle'}"></i> ${msg}`;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

function setPath(obj, path, val) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = val;
}

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), obj);
}

// ── Init UI ───────────────────────────────────────────────────────────────────
function initUI() {
  // Sidebar navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sec = link.dataset.section;
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      link.classList.add('active');
      $(`section-${sec}`).classList.add('active');
      $('topbar-title').textContent = link.textContent.trim();
      if (sec === 'images') loadGallery();
    });
  });

  // Sidebar toggle (mobile)
  $('sidebar-toggle').addEventListener('click', () =>
    document.querySelector('.sidebar').classList.toggle('open'));

  // Global save
  $('global-save-btn').addEventListener('click', saveContent);

  // Bind fields
  populateFields();
  buildHeroSlides();
  buildProductsTable();

  // Product actions
  $('add-product-btn').addEventListener('click', openNewProduct);
  $('prod-search').addEventListener('input', buildProductsTable);
  $('prod-cat-filter').addEventListener('change', buildProductsTable);

  // Modal
  $('modal-close').addEventListener('click', closeModal);
  $('modal-cancel-btn').addEventListener('click', closeModal);
  $('modal-backdrop').addEventListener('click', e => { if(e.target===$('modal-backdrop')) closeModal(); });
  $('modal-save-btn').addEventListener('click', saveProduct);
  $('modal-delete-btn').addEventListener('click', deleteProduct);
  $('modal-image').addEventListener('input', e => {
    $('modal-img-preview').src = e.target.value;
  });
  $('modal-pick-img').addEventListener('click', () => openPicker('modal-image'));

  // TipTap toolbar
  document.querySelectorAll('#tiptap-toolbar button').forEach(btn => {
    btn.addEventListener('click', () => runTiptapCmd(btn.dataset.cmd));
  });

  // Image picker
  $('picker-close').addEventListener('click', () => $('picker-backdrop').style.display = 'none');
  $('picker-backdrop').addEventListener('click', e => { if(e.target===$('picker-backdrop')) $('picker-backdrop').style.display='none'; });

  // Image upload
  initUpload();

  // Banner image picker buttons
  document.querySelectorAll('.btn-pick-img[data-target]').forEach(btn => {
    btn.addEventListener('click', () => openPicker(btn.dataset.target));
  });
}

// ── Populate all [data-path] fields ──────────────────────────────────────────
function populateFields() {
  document.querySelectorAll('[data-path]').forEach(el => {
    el.value = getPath(content, el.dataset.path) || '';
    el.addEventListener('input', () => setPath(content, el.dataset.path, el.value));
  });
}

// ── Save content to server ────────────────────────────────────────────────────
async function saveContent() {
  $('save-indicator').textContent = 'שומר...';
  try {
    const res = await fetch('/api/content', {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(content)
    });
    if (!res.ok) throw new Error();
    $('save-indicator').textContent = '✓ נשמר';
    setTimeout(() => $('save-indicator').textContent = '', 2500);
    toast('הגדרות נשמרו בהצלחה!');
    buildHeroSlides(); // refresh previews
  } catch {
    toast('שגיאה בשמירה', 'error');
    $('save-indicator').textContent = '';
  }
}

// ── Hero Slides ───────────────────────────────────────────────────────────────
function buildHeroSlides() {
  const hero = content.hero || [];
  const container = $('hero-slides-container');
  container.innerHTML = '';
  hero.forEach((slide, i) => {
    const card = document.createElement('div');
    card.className = 'hero-slide-card';
    card.innerHTML = `
      <div class="hero-slide-header" onclick="toggleSlide(${i})">
        <div class="hero-slide-num">${i+1}</div>
        <h4>שקופית ${i+1} — ${slide.badge || ''}</h4>
        <i class="fa fa-chevron-down hero-slide-toggle" id="slide-toggle-${i}"></i>
      </div>
      <div class="hero-slide-body" id="slide-body-${i}">
        <div>
          <div class="slide-preview" id="slide-preview-${i}">
            <div class="slide-preview-overlay">
              <div class="slide-preview-title">${slide.title||''}</div>
              <div class="slide-preview-sub">${slide.subtitle||''}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="field-row">
            <label>תגית</label>
            <input type="text" class="slide-field" data-slide="${i}" data-key="badge" value="${slide.badge||''}"/>
          </div>
          <div class="field-row">
            <label>כותרת (שורות ב-Enter)</label>
            <textarea class="slide-field" data-slide="${i}" data-key="title" rows="2">${slide.title||''}</textarea>
          </div>
          <div class="field-row">
            <label>תת-כותרת</label>
            <input type="text" class="slide-field" data-slide="${i}" data-key="subtitle" value="${slide.subtitle||''}"/>
          </div>
          <div class="field-row two-col">
            <div>
              <label>כפתור 1 — טקסט</label>
              <input type="text" class="slide-field" data-slide="${i}" data-key="btn1Text" value="${slide.btn1Text||''}"/>
            </div>
            <div>
              <label>כפתור 1 — קישור</label>
              <input type="text" class="slide-field" data-slide="${i}" data-key="btn1Url" value="${slide.btn1Url||''}"/>
            </div>
          </div>
          <div class="field-row two-col">
            <div>
              <label>כפתור 2 — טקסט</label>
              <input type="text" class="slide-field" data-slide="${i}" data-key="btn2Text" value="${slide.btn2Text||''}"/>
            </div>
            <div>
              <label>כפתור 2 — קישור</label>
              <input type="text" class="slide-field" data-slide="${i}" data-key="btn2Url" value="${slide.btn2Url||''}"/>
            </div>
          </div>
          <div class="field-row">
            <label>תמונת רקע</label>
            <div class="img-url-row">
              <input type="text" class="slide-field img-url-input" data-slide="${i}" data-key="image" value="${slide.image||''}"/>
              <button class="btn-pick-img" onclick="openPickerForSlide(${i})">
                <i class="fa fa-image"></i> בחר
              </button>
            </div>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
    // Set preview BG
    updateSlidePreview(i);
  });

  // Bind slide fields
  document.querySelectorAll('.slide-field').forEach(el => {
    el.addEventListener('input', () => {
      const idx = +el.dataset.slide;
      const key = el.dataset.key;
      if (!content.hero[idx]) content.hero[idx] = {};
      content.hero[idx][key] = el.value;
      updateSlidePreview(idx);
    });
  });
}

function updateSlidePreview(i) {
  const slide = content.hero[i] || {};
  const prev = $(`slide-preview-${i}`);
  if (!prev) return;
  if (slide.image) prev.style.backgroundImage = `url('${slide.image}')`;
  const overlay = prev.querySelector('.slide-preview-overlay');
  overlay.querySelector('.slide-preview-title').textContent = slide.title || '';
  overlay.querySelector('.slide-preview-sub').textContent = slide.subtitle || '';
}

window.toggleSlide = function(i) {
  const body = $(`slide-body-${i}`);
  const icon = $(`slide-toggle-${i}`);
  const open = body.classList.toggle('open');
  icon.style.transform = open ? 'rotate(180deg)' : '';
};

window.openPickerForSlide = function(i) {
  openPicker(`__slide__${i}`);
};

// ── Products table ────────────────────────────────────────────────────────────
function buildProductsTable() {
  const search = $('prod-search').value.toLowerCase();
  const cat    = $('prod-cat-filter').value;
  const tbody  = $('products-tbody');
  tbody.innerHTML = '';

  const filtered = products.filter(p => {
    const matchCat    = !cat || p.categoryId === cat;
    const matchSearch = !search || p.name.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text-light)">לא נמצאו מוצרים</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const idx = products.indexOf(p);
    const badgeCls = p.badge ? `badge-pill badge-${p.badge}` : '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img class="prod-thumb" src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/48'"/></td>
      <td class="prod-name-cell">${p.name}</td>
      <td>${p.category || ''}</td>
      <td>₪${(p.price||0).toFixed(2)}</td>
      <td>${p.badge ? `<span class="${badgeCls}">${p.badge}</span>` : '—'}</td>
      <td class="prod-actions-cell">
        <button class="btn-edit" onclick="openEditProduct(${idx})"><i class="fa fa-pen"></i> עריכה</button>
        <button class="btn-del" onclick="confirmDeleteProduct(${idx})"><i class="fa fa-trash"></i></button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// ── Product modal ─────────────────────────────────────────────────────────────
window.openEditProduct = function(idx) {
  editingIdx = idx;
  const p = products[idx];
  $('modal-title').textContent = 'עריכת מוצר';
  $('modal-delete-btn').style.display = '';
  populateModal(p);
  showModal();
};

function openNewProduct() {
  editingIdx = -1;
  $('modal-title').textContent = 'מוצר חדש';
  $('modal-delete-btn').style.display = 'none';
  populateModal({ price:0, stars:5, categoryId:'raw', category:'חומרי גלם', categoryPage:'raw-materials.html' });
  showModal();
}

function populateModal(p) {
  $('modal-name').value       = p.name        || '';
  $('modal-price').value      = p.price       || '';
  $('modal-old-price').value  = p.oldPrice    || '';
  $('modal-badge').value      = p.badge       || '';
  $('modal-stars').value      = p.stars       || 5;
  $('modal-sku').value        = p.sku         || '';
  $('modal-weight').value     = p.weight      || '';
  $('modal-image').value      = p.image       || '';
  $('modal-img-preview').src  = p.image       || '';
  $('modal-ingredients').value = (p.ingredients || []).join('\n');
  $('modal-tips').value       = p.tips        || '';
  $('modal-categoryId').value = p.categoryId  || 'raw';

  // TipTap
  if (tiptap) { tiptap.destroy(); tiptap = null; }
  tiptap = new Editor({
    element: $('tiptap-editor'),
    extensions: [StarterKit, Underline],
    content: p.description || '',
    onSelectionUpdate: updateToolbarState,
    onTransaction:     updateToolbarState,
  });
}

function updateToolbarState() {
  if (!tiptap) return;
  document.querySelectorAll('#tiptap-toolbar button[data-cmd]').forEach(btn => {
    const cmd = btn.dataset.cmd;
    let active = false;
    if (cmd === 'bold')        active = tiptap.isActive('bold');
    if (cmd === 'italic')      active = tiptap.isActive('italic');
    if (cmd === 'underline')   active = tiptap.isActive('underline');
    if (cmd === 'bulletList')  active = tiptap.isActive('bulletList');
    if (cmd === 'orderedList') active = tiptap.isActive('orderedList');
    if (cmd === 'h2')          active = tiptap.isActive('heading', { level: 2 });
    if (cmd === 'h3')          active = tiptap.isActive('heading', { level: 3 });
    btn.classList.toggle('is-active', active);
  });
}

function runTiptapCmd(cmd) {
  if (!tiptap) return;
  const ch = tiptap.chain().focus();
  if (cmd === 'bold')        ch.toggleBold().run();
  if (cmd === 'italic')      ch.toggleItalic().run();
  if (cmd === 'underline')   ch.toggleUnderline().run();
  if (cmd === 'h2')          ch.toggleHeading({ level: 2 }).run();
  if (cmd === 'h3')          ch.toggleHeading({ level: 3 }).run();
  if (cmd === 'bulletList')  ch.toggleBulletList().run();
  if (cmd === 'orderedList') ch.toggleOrderedList().run();
  if (cmd === 'clearFormat') ch.clearNodes().unsetAllMarks().run();
  updateToolbarState();
}

function showModal() {
  $('modal-backdrop').style.display = 'flex';
  setTimeout(() => $('modal-name').focus(), 50);
}

function closeModal() {
  $('modal-backdrop').style.display = 'none';
  if (tiptap) { tiptap.destroy(); tiptap = null; }
  editingIdx = null;
}

function getCatInfo(catId) {
  const map = {
    raw:       { category:'חומרי גלם', categoryPage:'raw-materials.html' },
    tools:     { category:'כלי עבודה', categoryPage:'tools.html' },
    packaging: { category:'אריזות',    categoryPage:'packaging.html' },
  };
  return map[catId] || map.raw;
}

async function saveProduct() {
  const catId = $('modal-categoryId').value;
  const catInfo = getCatInfo(catId);
  const p = {
    id:           editingIdx >= 0 ? products[editingIdx].id : `prod-${Date.now()}`,
    name:         $('modal-name').value.trim(),
    price:        parseFloat($('modal-price').value) || 0,
    oldPrice:     parseFloat($('modal-old-price').value) || null,
    badge:        $('modal-badge').value || null,
    stars:        parseInt($('modal-stars').value) || 5,
    reviews:      editingIdx >= 0 ? (products[editingIdx].reviews || 0) : 0,
    sku:          $('modal-sku').value.trim(),
    weight:       $('modal-weight').value.trim(),
    image:        $('modal-image').value.trim(),
    images:       [$('modal-image').value.trim()],
    description:  tiptap ? tiptap.getHTML() : '',
    ingredients:  $('modal-ingredients').value.split('\n').map(s=>s.trim()).filter(Boolean),
    tips:         $('modal-tips').value.trim(),
    categoryId:   catId,
    ...catInfo,
  };

  if (editingIdx >= 0) products[editingIdx] = p;
  else products.push(p);

  await saveProducts();
  closeModal();
  buildProductsTable();
}

window.confirmDeleteProduct = function(idx) {
  editingIdx = idx;
  openEditProduct(idx);
};

async function deleteProduct() {
  if (editingIdx < 0) return;
  if (!confirm(`מחק את "${products[editingIdx].name}"?`)) return;
  products.splice(editingIdx, 1);
  await saveProducts();
  closeModal();
  buildProductsTable();
  toast('המוצר נמחק');
}

async function saveProducts() {
  const res = await fetch('/api/products', {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(products)
  });
  if (res.ok) toast('המוצרים נשמרו!');
  else toast('שגיאה בשמירה', 'error');
}

// ── Image upload ──────────────────────────────────────────────────────────────
function initUpload() {
  const zone = $('upload-zone');
  const input = $('file-input');

  $('browse-btn').addEventListener('click', () => input.click());
  zone.addEventListener('click', () => input.click());
  input.addEventListener('change', () => uploadFiles(input.files));

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    uploadFiles(e.dataTransfer.files);
  });
}

async function uploadFiles(files) {
  if (!files.length) return;
  const prog = $('upload-progress');
  const fill = $('progress-fill');
  const text = $('progress-text');
  prog.style.display = '';
  let done = 0;
  for (const file of files) {
    text.textContent = `מעלה: ${file.name}`;
    const form = new FormData();
    form.append('image', file);
    const res = await fetch('/api/upload', {
      method: 'POST', headers: { 'x-admin-password': PASSWORD }, body: form
    });
    if (res.ok) done++;
    fill.style.width = `${(done/files.length)*100}%`;
  }
  prog.style.display = 'none';
  fill.style.width = '0';
  toast(`${done} תמונות הועלו בהצלחה!`);
  loadGallery();
}

async function loadGallery() {
  const res = await fetch('/api/images', { headers: { 'x-admin-password': PASSWORD } });
  const imgs = await res.json();
  const grid = $('gallery-grid');
  grid.innerHTML = imgs.length ? '' : '<p style="color:var(--text-light)">אין תמונות עדיין.</p>';
  imgs.forEach(img => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${img.url}" alt="${img.filename}" loading="lazy"/>
      <div class="gallery-item-actions">
        <button class="gallery-btn" title="העתק URL" onclick="copyImgUrl('${img.url}')"><i class="fa fa-copy"></i></button>
        <button class="gallery-btn del" title="מחק" onclick="deleteImg('${img.filename}', this)"><i class="fa fa-trash"></i></button>
      </div>`;
    grid.appendChild(div);
  });
}

window.copyImgUrl = function(url) {
  navigator.clipboard.writeText(location.origin + url).then(() => toast('URL הועתק!'));
};

window.deleteImg = async function(filename, btn) {
  if (!confirm('מחק תמונה זו?')) return;
  const res = await fetch(`/api/images/${filename}`, {
    method: 'DELETE', headers: { 'x-admin-password': PASSWORD }
  });
  if (res.ok) { btn.closest('.gallery-item').remove(); toast('תמונה נמחקה'); }
  else toast('שגיאה במחיקה', 'error');
};

// ── Image Picker ──────────────────────────────────────────────────────────────
async function openPicker(target) {
  pickerTarget = target;
  $('picker-backdrop').style.display = 'flex';
  const res  = await fetch('/api/images', { headers: { 'x-admin-password': PASSWORD } });
  const imgs = await res.json();
  const grid = $('picker-grid');
  grid.innerHTML = '';
  imgs.forEach(img => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${img.url}" alt="${img.filename}" loading="lazy"/><div class="gallery-item-actions"></div>`;
    div.addEventListener('click', () => applyPickedImage(img.url));
    grid.appendChild(div);
  });
  if (!imgs.length) grid.innerHTML = '<p style="padding:20px;color:var(--text-light)">אין תמונות בספרייה. העלו תמונות תחילה.</p>';
}

function applyPickedImage(url) {
  $('picker-backdrop').style.display = 'none';
  if (!pickerTarget) return;

  if (pickerTarget === 'modal-image') {
    $('modal-image').value = url;
    $('modal-img-preview').src = url;
  } else if (pickerTarget.startsWith('__slide__')) {
    const i = parseInt(pickerTarget.split('__slide__')[1]);
    const input = document.querySelector(`.slide-field[data-slide="${i}"][data-key="image"]`);
    if (input) { input.value = url; input.dispatchEvent(new Event('input')); }
  } else {
    // data-path field
    const el = document.querySelector(`[data-path="${pickerTarget}"]`);
    if (el) { el.value = url; el.dispatchEvent(new Event('input')); }
  }
}

window.openPicker = openPicker;
