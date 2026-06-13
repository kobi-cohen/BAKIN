const PRODUCTS = {
  // ===== חומרי גלם =====
  'chocolate-70': {
    id: 'chocolate-70', name: 'שוקולד מריר בלגי 70%', category: 'חומרי גלם',
    categoryPage: 'raw-materials.html', categoryId: 'raw',
    price: 32.90, oldPrice: 39.90, badge: 'חדש', stars: 5, reviews: 48,
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&q=80',
      'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=900&q=80',
      'https://images.unsplash.com/photo-1606312619070-d48b8c7c9da5?w=900&q=80'
    ],
    sku: 'CHO-001', weight: '500 גרם',
    description: 'שוקולד מריר בלגי פרימיום עם 70% מוצקי קקאו. מיוצר מפולי קקאו איכותיים מאפריקה, בעל טעם עשיר ועמוק עם נגיעות פירותיות עדינות. מתאים להמסה, לציפוי עוגות, למוסים, לטראפלים ולכל יצירה שוקולדית.',
    ingredients: ['מוצקי קקאו 70%', 'חמאת קקאו', 'סוכר קנה', 'ווניל טבעי', 'כשר לפסח'],
    specs: [
      { label: 'משקל', value: '500 גרם' },
      { label: 'אחוז קקאו', value: '70%' },
      { label: 'מוצא', value: 'בלגיה' },
      { label: 'כשרות', value: 'כשר לפסח' },
      { label: 'אחסון', value: 'מקום קריר ויבש, 12-18°C' }
    ],
    tips: 'להמסה: חממו בבן-מארי או במיקרוגל ב-30 שניות עם ערבוב בכל פעם.'
  },
  'cocoa-powder': {
    id: 'cocoa-powder', name: 'אבקת קקאו הולנדית 100%', category: 'חומרי גלם',
    categoryPage: 'raw-materials.html', categoryId: 'raw',
    price: 24.50, badge: null, stars: 4, reviews: 31,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=900&q=80'],
    sku: 'COC-002', weight: '250 גרם',
    description: 'אבקת קקאו הולנדית מעובדת בתהליך Dutch-process, המעניקה צבע כהה עמוק וטעם קקאו חלק ופחות חמצמץ. מושלמת לעוגות, עוגיות, שייקים ואבקות חמות.',
    ingredients: ['אבקת קקאו 100%', 'מעובד בשיטה הולנדית', 'ללא תוספי סוכר'],
    specs: [
      { label: 'משקל', value: '250 גרם' },
      { label: 'שומן', value: '22-24%' },
      { label: 'עיבוד', value: 'Dutch Process' },
      { label: 'כשרות', value: 'כשר' }
    ],
    tips: 'הוסיפו לקמח יחד עם החומרים היבשים. לשתייה חמה: ערבבו עם מעט מים קרים לפני הוספת החלב החם.'
  },
  'vanilla-extract': {
    id: 'vanilla-extract', name: 'תמצית וניל טבעית מדגסקר', category: 'חומרי גלם',
    categoryPage: 'raw-materials.html', categoryId: 'raw',
    price: 18.90, oldPrice: 26.00, badge: 'מבצע', stars: 5, reviews: 67,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=900&q=80'],
    sku: 'VAN-003', weight: '100 מ"ל',
    description: 'תמצית וניל טבעית טהורה מקצועיות, מיוצרת מתרמילי וניל ממדגסקר. ריח ותמונה עשירים ואותנטיים שלא יושגו עם תחליפים. כמות קטנה מספיקה לכל מתכון.',
    ingredients: ['מים', "מיצוי תרמילי וניל (מדגסקר) 35%", 'אלכוהול 35%'],
    specs: [
      { label: 'נפח', value: '100 מ"ל' },
      { label: 'מוצא', value: 'מדגסקר' },
      { label: 'ריכוז', value: 'X2 (כפול)' },
      { label: 'כשרות', value: 'כשר' }
    ],
    tips: 'כמות מומלצת: 1 כפית לכל 12 קאפקייקס. ניתן להחליף את תמצית הוניל הרגילה ביחס 1:1.'
  },
  'brown-sugar': {
    id: 'brown-sugar', name: 'סוכר חום דמררה 1 ק"ג', category: 'חומרי גלם',
    categoryPage: 'raw-materials.html', categoryId: 'raw',
    price: 14.90, badge: null, stars: 4, reviews: 22,
    image: 'https://images.unsplash.com/photo-1612200564368-0e90cba86c7b?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1612200564368-0e90cba86c7b?w=900&q=80'],
    sku: 'SUG-004', weight: '1 ק"ג',
    description: 'סוכר קנה חום דמררה בעל גבישים גסים וטעם קרמלי עדין. מעניק לאפויים צבע ועומק טעם מיוחד. מתאים לעוגיות, קרמבל, מאפים ושתיית קפה.',
    ingredients: ['סוכר קנה חום 100% טבעי', 'ללא תוספים ומשמרים'],
    specs: [
      { label: 'משקל', value: '1 ק"ג' },
      { label: 'סוג', value: 'דמררה' },
      { label: 'מוצא', value: 'ברזיל' }
    ],
    tips: 'לקרמבל מושלם: ערבבו 1 כוס סוכר + 80 גרם חמאה + 1 כוס קמח.'
  },
  'flour-t55': {
    id: 'flour-t55', name: 'קמח לבן T55 מיוחד לפטיסרי', category: 'חומרי גלם',
    categoryPage: 'raw-materials.html', categoryId: 'raw',
    price: 19.90, badge: null, stars: 5, reviews: 54,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80'],
    sku: 'FLR-005', weight: '1 ק"ג',
    description: 'קמח חיטה לבן מסוג T55 הצרפתי, מיועד במיוחד לפטיסרי ואפייה מדויקת. תכולת חלבון אופטימלית המעניקה מרקם רך ועדין לעוגות, מאפינס, קרואסונים ועוגיות.',
    ingredients: ['קמח חיטה T55', 'ויטמין B1', 'ויטמין B3', 'חומצה פולית'],
    specs: [
      { label: 'משקל', value: '1 ק"ג' },
      { label: 'סוג', value: 'T55' },
      { label: 'חלבון', value: '10.5-11.5%' },
      { label: 'כשרות', value: 'כשר לפסח' }
    ],
    tips: 'נפו תמיד לפני השימוש לקבלת מרקם אוורירי. שמרו במקום יבש וסגור.'
  },
  'food-colors': {
    id: 'food-colors', name: 'סט צבעי מאכל ג\'ל 12 צבעים', category: 'חומרי גלם',
    categoryPage: 'raw-materials.html', categoryId: 'raw',
    price: 59.90, oldPrice: 79.90, badge: 'חדש', stars: 5, reviews: 89,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&q=80'],
    sku: 'CLR-006', weight: 'סט 12 × 20 גרם',
    description: 'סט מקצועי של 12 צבעי מאכל בג\'ל, ריכוז גבוה הדורש כמות קטנה מאוד. הצבעים לא מדללים בצקים ולא משנים מרקם. מתאים לקרם חמאה, בצק סוכר, מרנג ושוקולד לבן.',
    ingredients: ['מים', 'גליצרין', 'צבעי מאכל מאושרים', 'שומרים: E211'],
    specs: [
      { label: 'כמות', value: '12 גוונים' },
      { label: 'נפח כל בקבוק', value: '20 גרם' },
      { label: 'סוג', value: 'ג\'ל ריכוזי' },
      { label: 'כשרות', value: 'כשר' }
    ],
    tips: 'השתמשו בכמות קטנה — הצבע ריכוזי מאוד. עבור שוקולד לבן, השתמשו בצבעים ייעודיים לשוקולד.'
  },

  // ===== כלי עבודה =====
  'round-pan-24': {
    id: 'round-pan-24', name: 'תבנית עגולה 24 ס"מ נון-סטיק', category: 'כלי עבודה',
    categoryPage: 'tools.html', categoryId: 'tools',
    price: 49.90, badge: null, stars: 5, reviews: 112,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=900&q=80'],
    sku: 'PAN-001', weight: '680 גרם',
    description: 'תבנית אפייה עגולה 24 ס"מ עם ציפוי נון-סטיק כפול, תחתית נשלפת לשחרור קל. עובי דפנות 0.8 מ"מ לחלוקת חום אחידה. עמידה עד 240°C.',
    ingredients: ['פלדת פחמן', 'ציפוי PTFE כפול', 'תחתית נשלפת'],
    specs: [
      { label: 'קוטר', value: '24 ס"מ' },
      { label: 'גובה', value: '7 ס"מ' },
      { label: 'חומר', value: 'פלדת פחמן' },
      { label: 'ציפוי', value: 'נון-סטיק כפול' },
      { label: 'עמידות חום', value: 'עד 240°C' },
      { label: 'שטיפה', value: 'ידנית מומלצת' }
    ],
    tips: 'משחו קלות בחמאה גם עם ציפוי נון-סטיק לשחרור מושלם. אל תשתמשו בכלי מתכת חדים.'
  },
  'silicone-rolling': {
    id: 'silicone-rolling', name: 'מערוך סיליקון אנטי-דבק', category: 'כלי עבודה',
    categoryPage: 'tools.html', categoryId: 'tools',
    price: 34.90, oldPrice: 44.90, badge: 'מבצע', stars: 4, reviews: 38,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=80'],
    sku: 'TLS-002', weight: '320 גרם',
    description: 'מערוך סיליקון באיכות מקצועית עם ידיות ארגונומיות. משטח אנטי-דבק המונע הידבקות בצק. מתאים לבצק פריך, בצק סוכר, פונדנט ועוגיות.',
    ingredients: ['סיליקון מאכלי דרגה A', 'ידיות PP', 'BPA Free'],
    specs: [
      { label: 'אורך', value: '38 ס"מ' },
      { label: 'קוטר', value: '5 ס"מ' },
      { label: 'חומר', value: 'סיליקון מאכלי' },
      { label: 'טמפרטורה', value: '-40°C עד 220°C' }
    ],
    tips: 'פזרו מעט קמח על המשטח לתוצאה מיטבית. ניתן לנקות במדיח כלים.'
  },
  'piping-bags': {
    id: 'piping-bags', name: "שקיות זילוף חד פעמיות 100 יח'", category: 'כלי עבודה',
    categoryPage: 'tools.html', categoryId: 'tools',
    price: 22.90, badge: null, stars: 5, reviews: 201,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80'],
    sku: 'ZLF-003', weight: '120 גרם',
    description: "שקיות זילוף חד-פעמיות בגודל 35 ס\"מ (14 אינץ'), עבות ועמידות לפיצוץ. מתאימות לקרם חמאה, גנאש, מרנג ובצקים נוזליים. ניתן לחתוך לכל גודל פתח.",
    ingredients: ['פוליאתילן עובי 0.06 מ"מ', 'BPA Free', 'עמיד לחום עד 60°C'],
    specs: [
      { label: "כמות", value: "100 יח'" },
      { label: 'אורך', value: '35 ס"מ' },
      { label: 'קוטר פתח', value: 'ניתן לחיתוך' },
      { label: 'חומר', value: 'PE' }
    ],
    tips: "הכניסו את הפייה לפני מילוי השקית. קפלו את השוליים החוצה בזמן מילוי לניקיון מרבי."
  },
  'piping-tips': {
    id: 'piping-tips', name: "סט פיות זילוף נירוסטה 24 יח'", category: 'כלי עבודה',
    categoryPage: 'tools.html', categoryId: 'tools',
    price: 67.90, badge: null, stars: 5, reviews: 76,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80'],
    sku: 'ZLF-004', weight: '250 גרם',
    description: "סט מקצועי של 24 פיות זילוף מנירוסטה 304, הכולל: פיות כוכב פתוח/סגור, עגולות, שושן, לחם, עלים ועוד. עמיד לחלוטין בשטיפה במדיח.",
    ingredients: ['נירוסטה 304 (18/8)', 'עובי 0.6 מ"מ', 'ללא BPA'],
    specs: [
      { label: "כמות", value: "24 פיות" },
      { label: 'חומר', value: 'נירוסטה 304' },
      { label: 'שטיפה', value: 'מדיח כלים' },
      { label: 'כיסוי', value: 'קופסת אחסון' }
    ],
    tips: 'הרטיבו קלות בפייה לפני זילוף קרם חמאה לתוצאה חלקה יותר.'
  },
  'silicone-spatula': {
    id: 'silicone-spatula', name: 'מרית סיליקון עמידה לחום', category: 'כלי עבודה',
    categoryPage: 'tools.html', categoryId: 'tools',
    price: 16.90, badge: null, stars: 4, reviews: 44,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=900&q=80'],
    sku: 'TLS-005', weight: '85 גרם',
    description: 'מרית סיליקון גמישה עם ידית ארגונומית, עמידה לחום עד 220°C. מושלמת לקיפול בצקים עדינים, ריקון קערות ועבודה עם מסות חמות.',
    ingredients: ['סיליקון מאכלי', 'ידית נירוסטה/PP', 'BPA Free'],
    specs: [
      { label: 'אורך', value: '28 ס"מ' },
      { label: 'עמידות חום', value: 'עד 220°C' },
      { label: 'חומר', value: 'סיליקון + נירוסטה' }
    ],
    tips: 'מושלמת לקיפול חלבונים מוקצפים לבלילה — תנועות קיפול עדינות מלמטה למעלה.'
  },
  'cookie-cutters': {
    id: 'cookie-cutters', name: 'סט חותכני עוגיות 20 צורות', category: 'כלי עבודה',
    categoryPage: 'tools.html', categoryId: 'tools',
    price: 39.90, oldPrice: 54.90, badge: 'חדש', stars: 5, reviews: 93,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=80'],
    sku: 'TLS-006', weight: '280 גרם',
    description: "סט 20 חותכנים לעוגיות מנירוסטה, כולל: כוכבים, לבבות, עיגולים, עצים, פרחים, חיות ועוד. קצוות חדים לחיתוך מדויק. שמרים בקופסת מתכת כלולה.",
    ingredients: ['נירוסטה 201', 'גובה 3 ס"מ', 'קצוות מחוזקים'],
    specs: [
      { label: "כמות", value: "20 חותכנים" },
      { label: 'חומר', value: 'נירוסטה' },
      { label: 'גובה', value: '3 ס"מ' },
      { label: 'אחסון', value: 'קופסת מתכת' }
    ],
    tips: 'טבלו קלות בקמח לפני כל חיתוך למניעת הידבקות.'
  },

  // ===== אריזות =====
  'cake-box-25': {
    id: 'cake-box-25', name: 'קופסת עוגה לבנה עם חלון 25×25', category: 'אריזות',
    categoryPage: 'packaging.html', categoryId: 'packaging',
    price: 8.90, badge: null, stars: 5, reviews: 88,
    image: 'https://images.unsplash.com/photo-1562440499-64a3f0c30c5d?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1562440499-64a3f0c30c5d?w=900&q=80'],
    sku: 'PKG-001', weight: 'קרטון 350 גרם',
    description: 'קופסת עוגה לבנה יוקרתית עם חלון PET שקוף. מגיעה מורכבת למחצה לחיסכון בזמן. קרטון עמיד 350 גרם עם גימור מבריק.',
    ingredients: ['קרטון לבן 350 גרם', 'חלון PET שקוף', 'ממוחזר חלקית'],
    specs: [
      { label: 'מידות', value: '25×25×12 ס"מ' },
      { label: 'חומר', value: 'קרטון 350 גרם' },
      { label: 'חלון', value: 'PET שקוף' },
      { label: 'כמות באריזה', value: '10 יחידות' }
    ],
    tips: 'מתאים לעוגות עד גובה 10 ס"מ. הניחו תחתית קרטון מתחת לעוגה לפני הכנסה.'
  },
  'cupcake-box-6': {
    id: 'cupcake-box-6', name: 'קופסת 6 קאפקייקס עם מגש', category: 'אריזות',
    categoryPage: 'packaging.html', categoryId: 'packaging',
    price: 6.50, oldPrice: 9.90, badge: 'מבצע', stars: 4, reviews: 52,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=900&q=80'],
    sku: 'PKG-002', weight: 'קרטון 300 גרם',
    description: 'קופסת קאפקייקס ל-6 יחידות עם מגש פלסטיק בעל 6 תאים וחלון שקוף. הקאפקייקס נשארים יציבים בהובלה.',
    ingredients: ['קרטון לבן 300 גרם', 'מגש PET שקוף', 'ידית נשיאה'],
    specs: [
      { label: 'מידות', value: '26×18×10 ס"מ' },
      { label: 'קיבולת', value: "6 קאפקייקס" },
      { label: 'מגש', value: 'כלול' },
      { label: 'כמות באריזה', value: '10 יחידות' }
    ],
    tips: 'מתאים לקאפקייקס בקוטר עד 5.5 ס"מ. המגש מונע הזזה בנסיעה.'
  },
  'silver-board-30': {
    id: 'silver-board-30', name: 'מגש כסוף עגול 30 ס"מ – 10 יח\'', category: 'אריזות',
    categoryPage: 'packaging.html', categoryId: 'packaging',
    price: 22.90, badge: null, stars: 5, reviews: 143,
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1607478900766-efe13248b125?w=900&q=80'],
    sku: 'PKG-003', weight: 'קרטון 3 מ"מ',
    description: 'מגש עגול בציפוי כסוף מבריק, עובי 3 מ"מ. עמיד ומחוזק לנשיאת עוגות כבדות. מעניק מראה מקצועי ויוקרתי.',
    ingredients: ['קרטון מחוזק 3 מ"מ', 'ציפוי כסוף מבריק', 'עמיד ללחות'],
    specs: [
      { label: 'קוטר', value: '30 ס"מ' },
      { label: 'עובי', value: '3 מ"מ' },
      { label: 'גימור', value: 'כסוף מבריק' },
      { label: 'כמות', value: "10 יח'" }
    ],
    tips: 'הדביקו מעט קצפת או גנאש בתחתית העוגה כדי לקבע אותה למגש.'
  },
  'satin-ribbon': {
    id: 'satin-ribbon', name: 'סרט סאטן 5 ס"מ – 9 מטר', category: 'אריזות',
    categoryPage: 'packaging.html', categoryId: 'packaging',
    price: 12.90, badge: null, stars: 4, reviews: 29,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80'],
    sku: 'PKG-004', weight: '65 גרם',
    description: 'סרט סאטן איכותי ברוחב 5 ס"מ, גליל 9 מטר. ברק גבוה ומרקם חלק. זמין בצבעים: לבן, שמפניה, ורוד, כחול, אדום וזהב.',
    ingredients: ['100% פוליאסטר', 'ברק סאטן גבוה', 'קצוות מסוגלים'],
    specs: [
      { label: 'רוחב', value: '5 ס"מ' },
      { label: 'אורך', value: '9 מטר' },
      { label: 'חומר', value: 'פוליאסטר סאטן' },
      { label: 'צבעים', value: 'לבן / שמפניה / ורוד / כחול / זהב' }
    ],
    tips: 'לקשירת פפיון מקצועי: השאירו קצה של 30 ס"מ וקפלו לולאות שוות.'
  },
  'cello-bags': {
    id: 'cello-bags', name: "שקיות סלופן מעוטרות 50 יח'", category: 'אריזות',
    categoryPage: 'packaging.html', categoryId: 'packaging',
    price: 18.90, badge: 'חדש', stars: 5, reviews: 67,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1605792657660-596af9009e82?w=900&q=80'],
    sku: 'PKG-005', weight: '90 גרם',
    description: "שקיות סלופן שקופות עם הדפס פרחים עדין. מושלמות לעטיפת עוגיות, ממתקים, עוגות בגביע וסלסלות מתנה. נסגרות בסרט או גומי.",
    ingredients: ['OPP 30 מיקרון', 'הדפס פרחים', 'ניתן לאטימה בחום'],
    specs: [
      { label: "כמות", value: "50 יח'" },
      { label: 'מידות', value: '20×30 ס"מ' },
      { label: 'עובי', value: '30 מיקרון' },
      { label: 'פתיחה', value: 'מלמעלה' }
    ],
    tips: 'לאטימה מושלמת השתמשו בסוגר חום (heat sealer) או פשוט קשרו עם סרט.'
  },
  'baking-paper': {
    id: 'baking-paper', name: 'נייר אפייה מגולגל 50 מטר', category: 'אריזות',
    categoryPage: 'packaging.html', categoryId: 'packaging',
    price: 24.90, badge: null, stars: 5, reviews: 201,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80',
    images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80'],
    sku: 'PKG-006', weight: '320 גרם',
    description: 'נייר אפייה סיליקוני שני-צדדי ברוחב 38 ס"מ, גליל 50 מטר. אנטי-דבק מלא, עמיד לחום עד 230°C. חוסך שמן ומנקה בקלות.',
    ingredients: ['נייר סיליקוני', 'ציפוי PTFE דו-צדדי', 'ללא כלור'],
    specs: [
      { label: 'אורך', value: '50 מטר' },
      { label: 'רוחב', value: '38 ס"מ' },
      { label: 'עמידות חום', value: 'עד 230°C' },
      { label: 'שימושים', value: 'ניתן לשימוש חוזר' }
    ],
    tips: 'ניתן לשימוש חוזר עד 5 פעמים כשמנקים בזהירות. עמיד גם להקפאה.'
  }
};

const CATEGORIES = {
  raw: {
    id: 'raw', name: 'חומרי גלם', page: 'raw-materials.html',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b8c7c9da5?w=600&q=80',
    description: 'שוקולד, קמחים, סוכר, צבעים ועוד',
    subcats: ['הכל', 'שוקולד', 'קמחים', 'סוכר', 'תמציות', 'צבעים']
  },
  tools: {
    id: 'tools', name: 'כלי עבודה', page: 'tools.html',
    image: 'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=600&q=80',
    description: 'תבניות, שקיות זילוף, פיות ועוד',
    subcats: ['הכל', 'תבניות', 'זילוף', 'כלי עבודה', 'קוצצנים', 'מכשירים']
  },
  packaging: {
    id: 'packaging', name: 'אריזות לעוגות', page: 'packaging.html',
    image: 'https://images.unsplash.com/photo-1559181567-c3190bba5ae0?w=600&q=80',
    description: 'קופסאות, מגשים, סלופן וסרטים',
    subcats: ['הכל', 'קופסאות', 'קאפקייקס', 'מגשים', 'סרטים', 'ניירות']
  }
};

function getProductsByCategory(categoryId) {
  return Object.values(PRODUCTS).filter(p => p.categoryId === categoryId);
}

function getProduct(id) {
  return PRODUCTS[id] || null;
}
