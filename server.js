const express = require('express');
const multer  = require('multer');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'luna2026';
const ROOT = __dirname;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));

// ── Auth ──────────────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const pw = req.headers['x-admin-password'] || (req.body && req.body._password);
  if (pw !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── Image upload (multer) ─────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = path.join(ROOT, 'images');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename(req, file, cb) {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    cb(null, file.mimetype.startsWith('image/'));
  }
});

// ── Helper: read JSON safely ──────────────────────────────────────────────────
function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return null; }
}

// ── Dynamic JS: /products-data.js served from JSON ───────────────────────────
// This lets the existing static site keep working — no other files change.
app.get('/products-data.js', (req, res) => {
  const file = path.join(ROOT, 'content', 'products.json');
  const arr  = readJSON(file);
  if (!arr) return res.sendFile(path.join(ROOT, 'products-data.js'));

  // Build PRODUCTS object and CATEGORIES from the array
  const obj = {};
  arr.forEach(p => { obj[p.id] = p; });

  const cats = {
    raw:       { id:'raw',       name:'חומרי גלם',    page:'raw-materials.html', image:'https://images.unsplash.com/photo-1606312619070-d48b8c7c9da5?w=600&q=80', description:'שוקולד, קמחים, סוכר, צבעים ועוד', subcats:['הכל','שוקולד','קמחים','סוכר','תמציות','צבעים'] },
    tools:     { id:'tools',     name:'כלי עבודה',    page:'tools.html',         image:'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=600&q=80', description:'תבניות, שקיות זילוף, פיות ועוד',    subcats:['הכל','תבניות','זילוף','כלי עבודה','קוצצנים','מכשירים'] },
    packaging: { id:'packaging', name:'אריזות לעוגות', page:'packaging.html',    image:'https://images.unsplash.com/photo-1559181567-c3190bba5ae0?w=600&q=80', description:'קופסאות, מגשים, סלופן וסרטים',     subcats:['הכל','קופסאות','קאפקייקס','מגשים','סרטים','ניירות'] }
  };

  res.type('application/javascript').send(`
const PRODUCTS = ${JSON.stringify(obj, null, 2)};
const CATEGORIES = ${JSON.stringify(cats, null, 2)};
function getProductsByCategory(categoryId){return Object.values(PRODUCTS).filter(p=>p.categoryId===categoryId);}
function getProduct(id){return PRODUCTS[id]||null;}
`);
});

// ── Dynamic JS: /site-config.js served from JSON ─────────────────────────────
app.get('/site-config.js', (req, res) => {
  const file = path.join(ROOT, 'content', 'content.json');
  const data = readJSON(file) || {};
  res.type('application/javascript').send(
    `window.LUNA_CONFIG = ${JSON.stringify(data)};`
  );
});

// ── Auth check ────────────────────────────────────────────────────────────────
app.post('/api/auth', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) res.json({ ok: true });
  else res.status(401).json({ error: 'Wrong password' });
});

// ── Content API ───────────────────────────────────────────────────────────────
app.get('/api/content', (req, res) => {
  const data = readJSON(path.join(ROOT, 'content', 'content.json'));
  res.json(data || {});
});

app.post('/api/content', requireAuth, (req, res) => {
  const { _password, ...body } = req.body;
  fs.mkdirSync(path.join(ROOT, 'content'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'content', 'content.json'), JSON.stringify(body, null, 2));
  res.json({ ok: true });
});

// ── Products API ──────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const data = readJSON(path.join(ROOT, 'content', 'products.json'));
  res.json(data || []);
});

app.post('/api/products', requireAuth, (req, res) => {
  const payload = Array.isArray(req.body) ? req.body : req.body.products || [];
  fs.mkdirSync(path.join(ROOT, 'content'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'content', 'products.json'), JSON.stringify(payload, null, 2));
  res.json({ ok: true });
});

// ── Image upload ──────────────────────────────────────────────────────────────
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' });
  res.json({ url: `/images/${req.file.filename}`, filename: req.file.filename });
});

app.get('/api/images', requireAuth, (req, res) => {
  const dir = path.join(ROOT, 'images');
  if (!fs.existsSync(dir)) return res.json([]);
  const imgs = fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|gif|webp|svg)$/i.test(f))
    .map(f => ({ url: `/images/${f}`, filename: f }));
  res.json(imgs);
});

// ── Image delete ─────────────────────────────────────────────────────────────
app.delete('/api/images/:filename', requireAuth, (req, res) => {
  const file = path.join(ROOT, 'images', path.basename(req.params.filename));
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Not found' });
  fs.unlinkSync(file);
  res.json({ ok: true });
});

// ── Admin ─────────────────────────────────────────────────────────────────────
app.get(['/admin', '/admin/'], (req, res) => res.sendFile(path.join(ROOT, 'admin', 'index.html')));

// ── Static files (must come AFTER dynamic routes) ────────────────────────────
app.use(express.static(ROOT));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎂  LUNA website  →  http://localhost:${PORT}`);
  console.log(`🔧  Admin panel   →  http://localhost:${PORT}/admin/`);
  console.log(`🔑  Password      →  ${ADMIN_PASSWORD}\n`);
});
