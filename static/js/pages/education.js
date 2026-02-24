// HEALTH EDUCATION PAGE
const EDUCATION_ARTICLES = [
    {
        id: 1, emoji: '🦟', lang: 'Hindi + English',
        title: 'Dengue Fever: Prevention & Care',
        titleHi: 'डेंगू बुखार: बचाव और देखभाल',
        desc: 'Learn how to prevent dengue mosquito breeding, recognize symptoms early and manage at home. Includes Hindi instructions.',
        category: 'Viral Disease',
        content: `<h3>What is Dengue? / डेंगू क्या है?</h3>
      <p>Dengue is a viral illness spread by the <em>Aedes aegypti</em> mosquito, which bites during daytime.</p>
      <p>डेंगू एक वायरल बीमारी है जो <em>Aedes aegypti</em> मच्छर से फैलती है, जो दिन में काटता है।</p>
      <h3>Symptoms / लक्षण</h3>
      <ul><li>High fever (103°F+) / तेज बुखार</li><li>Severe headache / तेज सिरदर्द</li><li>Eye pain / आँखों में दर्द</li><li>Skin rash / त्वचा पर दाने</li><li>Joint & muscle pain / जोड़ और मांसपेशी का दर्द</li></ul>
      <h3>Prevention / बचाव</h3>
      <ul><li>Eliminate standing water / रुके हुए पानी को हटाएं</li><li>Use mosquito nets / मच्छरदानी का उपयोग करें</li><li>Wear full-sleeve clothes / पूरी बाँह के कपड़े पहनें</li><li>Apply mosquito repellent / मच्छर-रोधी लोशन लगाएं</li></ul>`
    },
    {
        id: 2, emoji: '🫁', lang: 'Hindi + English',
        title: 'Tuberculosis: Know the Facts',
        titleHi: 'तपेदिक (TB): जरूरी जानकारी',
        desc: 'India accounts for 26% of global TB cases. Understand transmission, DOTS treatment, and free government testing.',
        category: 'Infectious Disease',
        content: `<h3>What is TB? / टीबी क्या है?</h3>
      <p>TB is a bacterial infection caused by <em>Mycobacterium tuberculosis</em>, mainly affecting the lungs.</p>
      <h3>Key Facts</h3>
      <ul><li>TB is curable with 6-month free government treatment</li><li>DOTS (Directly Observed Treatment) is available at all PHCs</li><li>Nikshay Poshan Yojana: ₹500/month nutrition support for TB patients</li></ul>
      <h3>Symptoms</h3>
      <ul><li>Cough for more than 2 weeks</li><li>Blood in cough / खाँसी में खून</li><li>Night sweats / रात में पसीना</li><li>Unexplained weight loss</li></ul>`
    },
    {
        id: 3, emoji: '🤱', lang: 'Hindi + English',
        title: 'Maternal & Child Health',
        titleHi: 'माँ और बच्चे का स्वास्थ्य',
        desc: 'Government schemes like Janani Suraksha Yojana, PMMVY, and ANC checkups explained for rural mothers.',
        category: 'Women & Child Health',
        content: `<h3>Government Support Schemes</h3>
      <ul>
        <li><strong>Janani Suraksha Yojana:</strong> ₹1400 cash for institutional delivery in rural areas</li>
        <li><strong>PMMVY:</strong> ₹5000 maternity benefit for first child</li>
        <li><strong>JSY:</strong> Free antenatal checkups at PHC</li>
      </ul>
      <h3>Nutrition During Pregnancy / गर्भावस्था में पोषण</h3>
      <ul><li>Iron & Folic Acid tablets — free from ASHA worker</li><li>Eat dark green vegetables daily</li><li>4 ANC (Antenatal Care) checkups: 12, 20, 28, 36 weeks</li></ul>`
    },
    {
        id: 4, emoji: '🩸', lang: 'Hindi + English',
        title: 'Diabetes Management in India',
        titleHi: 'मधुमेह का प्रबंधन',
        desc: 'India has 77 million diabetics. Learn about diet, medication, and managing diabetes in low-resource settings.',
        category: 'Non-Communicable Disease',
        content: `<h3>Types / प्रकार</h3>
      <ul><li>Type 1: Insulin-dependent / इंसुलिन-निर्भर</li><li>Type 2: Lifestyle-related, most common / जीवनशैली से संबंधित</li></ul>
      <h3>Diet Tips / आहार सुझाव</h3>
      <ul><li>Avoid white rice, prefer millets (jowar, bajra, ragi)</li><li>Eat small frequent meals / छोटे-छोटे भोजन</li><li>Include bitter gourd (karela) in diet</li><li>Walk 30 minutes daily</li></ul>
      <h3>Free Treatment</h3>
      <p>Metformin and other diabetes medications are available free at government hospitals under NPCDCS programme.</p>`
    },
    {
        id: 5, emoji: '🧠', lang: 'Hindi + English',
        title: 'Mental Health Awareness',
        titleHi: 'मानसिक स्वास्थ्य जागरूकता',
        desc: 'Breaking stigma around mental illness in rural India. Available helplines, counselling, and community support.',
        category: 'Mental Health',
        content: `<h3>Common Conditions / सामान्य स्थितियाँ</h3>
      <ul><li>Depression / अवसाद</li><li>Anxiety / चिंता</li><li>Stress / तनाव</li><li>PTSD</li></ul>
      <h3>Helplines / सहायता</h3>
      <ul><li>iCall: 9152987821</li><li>Vandrevala Foundation: 1860-2662-345</li><li>NIMHANS Helpline: 080-46110007</li></ul>
      <h3>Breaking the Stigma</h3>
      <p>Mental illness is NOT weakness or a curse. It is a medical condition just like diabetes or fever — treatable with the right support.</p>`
    },
    {
        id: 6, emoji: '🚿', lang: 'Hindi + Tamil + English',
        title: 'Water Safety & Hygiene',
        titleHi: 'जल सुरक्षा और स्वच्छता',
        desc: 'Preventing waterborne diseases: cholera, typhoid, diarrhea. Safe water practices for rural communities.',
        category: 'Public Health',
        content: `<h3>Water Safety Rules</h3>
      <ul><li>Always boil drinking water for 10 minutes</li><li>Use ORS (Oral Rehydration Salt) for diarrhea</li><li>Wash hands with soap before meals and after toilet</li><li>Maintain clean water storage containers</li></ul>
      <h3>ORS Preparation / ORS बनाने का तरीका</h3>
      <ul><li>1 litre clean boiled water</li><li>6 teaspoons sugar</li><li>0.5 teaspoon salt</li><li>Mix well and give small sips frequently</li></ul>`
    },
];

function renderEducation() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Health Education</div>
    <div class="page-subtitle">Multilingual health guides for every Indian community — evidence-based, culturally relevant</div>

    <div class="filter-bar mb-3">
      <div class="search-wrap" style="flex:2;">
        <i class="fas fa-search search-icon"></i>
        <input class="form-control" id="edu-search" placeholder="Search health topics..." oninput="filterEdu()" />
      </div>
      <select class="form-control" id="edu-cat" onchange="filterEdu()" style="min-width:180px;">
        <option value="">All Categories</option>
        <option>Viral Disease</option>
        <option>Infectious Disease</option>
        <option>Women &amp; Child Health</option>
        <option>Non-Communicable Disease</option>
        <option>Mental Health</option>
        <option>Public Health</option>
      </select>
    </div>

    <div id="edu-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;"></div>
  `;
    filterEdu();
}

function filterEdu() {
    const search = (document.getElementById('edu-search')?.value || '').toLowerCase();
    const cat = document.getElementById('edu-cat')?.value || '';
    let articles = EDUCATION_ARTICLES;
    if (search) articles = articles.filter(a => a.title.toLowerCase().includes(search) || a.desc.toLowerCase().includes(search));
    if (cat) articles = articles.filter(a => a.category === cat);

    const grid = document.getElementById('edu-grid');
    grid.innerHTML = '';
    if (!articles.length) { grid.appendChild(createEmptyState('📚', 'No articles found', 'Try a different search')); return; }

    const catColors = {
        'Viral Disease': '#E63946', 'Infectious Disease': '#E76F51', 'Women & Child Health': '#E9C46A',
        'Non-Communicable Disease': '#0A2463', 'Mental Health': '#2A9D8F', 'Public Health': '#457B9D'
    };

    articles.forEach(a => {
        const card = document.createElement('div');
        card.className = 'edu-card fade-in';
        card.innerHTML = `
      <div class="edu-banner" style="background:linear-gradient(135deg,${catColors[a.category] || '#0A2463'}22,${catColors[a.category] || '#0A2463'}44);">
        ${a.emoji}
      </div>
      <div class="edu-body">
        <span class="badge" style="background:${catColors[a.category] || '#0A2463'}22;color:${catColors[a.category] || '#0A2463'};margin-bottom:8px;display:inline-block;">${a.category}</span>
        <div class="edu-title">${a.title}</div>
        ${a.titleHi ? `<div class="text-sm text-muted" style="font-family:'Noto Sans Devanagari',sans-serif;margin:4px 0;">${a.titleHi}</div>` : ''}
        <div class="edu-desc">${a.desc}</div>
        <div class="edu-footer">
          <span class="edu-lang">🌐 ${a.lang}</span>
          <button class="btn btn-sm btn-primary" onclick="openArticle(${a.id})">Read More →</button>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
}

function openArticle(id) {
    const article = EDUCATION_ARTICLES.find(a => a.id === id);
    if (!article) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <div class="modal-title">${article.emoji} ${article.title}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="badge mb-2" style="display:inline-block;">${article.category}</div>
      <div class="edu-lang mb-2" style="display:inline-block;margin-left:8px;">🌐 ${article.lang}</div>
      <div style="font-size:14px;line-height:1.9;color:var(--text);">
        ${article.content}
      </div>
      <div class="divider"></div>
      <div class="text-xs text-muted">⚠️ This content is for educational purposes. Always consult a qualified doctor for diagnosis and treatment.</div>
    </div>
  `;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
}
