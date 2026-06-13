document.addEventListener('DOMContentLoaded', () => {
  renderHeader('recipes');

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const recipe = RECIPES_DATA.find(r => r.id === id);
  const content = document.getElementById('recipe-content');

  if (!recipe) {
    document.title = 'מתכון לא נמצא | LUNA לונה';
    content.innerHTML = `
      <div class="container">
        <div class="recipe-not-found">
          <h2>המתכון לא נמצא</h2>
          <p>ייתכן שהמתכון הוסר או שהכתובת שגויה.</p>
          <a href="recipes.html" class="btn btn-primary">לכל המתכונים</a>
        </div>
      </div>`;
    return;
  }

  document.title = `${recipe.title} | LUNA לונה`;

  const levelClass = `level-${recipe.level}`;

  const stepsHtml = recipe.steps.map((step, i) => `
    <li class="step-item">
      <div class="step-num">${i + 1}</div>
      <div class="step-content">
        <strong>${step.title}</strong>
        <p>${step.desc}</p>
      </div>
    </li>`).join('');

  const ingredientsHtml = recipe.ingredients.map(ing => {
    const isHeader = ing.endsWith(':');
    return isHeader
      ? `<li class="section-header">${ing}</li>`
      : `<li>${ing}</li>`;
  }).join('');

  const related = RECIPES_DATA
    .filter(r => r.id !== recipe.id)
    .filter(r => r.cat === recipe.cat || r.tags.some(t => recipe.tags.includes(t)))
    .slice(0, 3);

  const relatedFallback = related.length
    ? related
    : RECIPES_DATA.filter(r => r.id !== recipe.id).slice(0, 3);

  const relatedHtml = relatedFallback.map(r => `
    <a href="recipe.html?id=${r.id}" class="related-recipe-card">
      <img src="${r.image}" alt="${r.title}" loading="lazy"/>
      <div class="related-card-body">
        <h4>${r.title}</h4>
        <div class="related-card-meta">
          <span><i class="fa fa-clock"></i> ${r.time}</span>
          <span><i class="fa fa-signal"></i> ${r.level}</span>
        </div>
      </div>
    </a>`).join('');

  content.innerHTML = `
    <!-- HERO -->
    <div class="recipe-hero">
      <img src="${recipe.image}" alt="${recipe.title}"/>
      <div class="recipe-hero-overlay"></div>
      <div class="recipe-hero-content">
        <nav class="breadcrumb">
          <a href="index.html">ראשי</a>
          <span class="sep"><i class="fa fa-chevron-left" style="font-size:10px"></i></span>
          <a href="recipes.html">מתכונים</a>
          <span class="sep"><i class="fa fa-chevron-left" style="font-size:10px"></i></span>
          <span class="current">${recipe.title}</span>
        </nav>
        <h1>${recipe.title}</h1>
        <div class="recipe-hero-meta">
          <span><i class="fa fa-clock"></i> ${recipe.time}</span>
          <span><i class="fa fa-fire"></i> ${recipe.prepTime} הכנה</span>
          <span><i class="fa fa-users"></i> ${recipe.servings} מנות</span>
          <span><i class="fa fa-signal"></i> ${recipe.level}</span>
        </div>
      </div>
    </div>

    <!-- MAIN LAYOUT -->
    <div class="container">
      <div class="recipe-layout">

        <!-- MAIN CONTENT -->
        <div class="recipe-main">
          <p class="recipe-desc">${recipe.desc}</p>

          <h2 class="recipe-section-title">
            <i class="fa fa-list-ol"></i>
            אופן הכנה
          </h2>

          <ol class="steps-list">
            ${stepsHtml}
          </ol>

          ${recipe.tips ? `
          <div class="tips-box">
            <div class="tips-title"><i class="fa fa-lightbulb"></i> טיפ מקצועי</div>
            <p>${recipe.tips}</p>
          </div>` : ''}
        </div>

        <!-- SIDEBAR -->
        <aside class="recipe-sidebar">
          <div class="recipe-card">
            <div class="recipe-card-header">
              <i class="fa fa-utensils"></i>
              פרטי המתכון
            </div>

            <div class="recipe-stats">
              <div class="stat-item">
                <span class="stat-val">${recipe.prepTime}</span>
                <div class="stat-label">זמן הכנה</div>
              </div>
              <div class="stat-item">
                <span class="stat-val">${recipe.cookTime}</span>
                <div class="stat-label">זמן אפייה</div>
              </div>
              <div class="stat-item">
                <span class="stat-val">${recipe.servings}</span>
                <div class="stat-label">מנות</div>
              </div>
              <div class="stat-item">
                <span class="stat-val"><span class="level-badge ${levelClass}">${recipe.level}</span></span>
                <div class="stat-label">רמת קושי</div>
              </div>
            </div>

            <div class="ingredients-section">
              <h4><i class="fa fa-shopping-basket" style="margin-left:6px;color:var(--primary)"></i>רכיבים</h4>
              <ul class="ingredients-list">
                ${ingredientsHtml}
              </ul>
            </div>

            <div class="recipe-actions">
              <button class="btn-print" onclick="window.print()">
                <i class="fa fa-print"></i>
                הדפסת המתכון
              </button>
              <a href="recipes.html" class="btn btn-primary" style="justify-content:center;font-size:14px">
                <i class="fa fa-arrow-right"></i>
                לכל המתכונים
              </a>
            </div>
          </div>
        </aside>

      </div>
    </div>

    <!-- RELATED -->
    <div class="related-recipes">
      <div class="container">
        <div class="section-header">
          <h2>מתכונים נוספים</h2>
          <a href="recipes.html" class="see-all">לכל המתכונים <i class="fa fa-arrow-left"></i></a>
        </div>
        <div class="related-grid">
          ${relatedHtml}
        </div>
      </div>
    </div>`;
});
