// HOME PAGE — Revamped with Logo, News, Reviews
function renderHome() {
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <!-- Hero Banner with Logo, Name, Affiliation -->
    <div class="hero-banner">
      <canvas id="hero-canvas" class="hero-canvas"></canvas>
      <div class="hero-content">
        <div style="display:flex;align-items:center;gap:20px;justify-content:center;flex-wrap:wrap;">
          <div class="logo-icon">
            <i class="fas fa-heartbeat"></i>
          </div>
          <div>
            <h1 class="brand-name">MediConnect</h1>
            <p class="brand-affiliation">Affiliated to KMC · Your Health, Our Priority</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Action Cards -->
    <div class="stat-grid" id="home-stats">
      <div class="stat-card" onclick="navigate('symptom-checker')" style="cursor:pointer;">
        <div class="stat-icon" style="background:rgba(10,36,99,0.10)"><i class="fas fa-stethoscope fa-lg" style="color:var(--primary)"></i></div>
        <div class="stat-info"><h3 id="s-doctors">—</h3><p>Doctors Available</p></div>
      </div>
      <div class="stat-card" onclick="navigate('emergency')" style="cursor:pointer;">
        <div class="stat-icon" style="background:rgba(42,157,143,0.10)"><i class="fas fa-hospital fa-lg" style="color:var(--success)"></i></div>
        <div class="stat-info"><h3 id="s-hospitals">—</h3><p>Hospitals</p></div>
      </div>
      <div class="stat-card" onclick="navigate('appointments')" style="cursor:pointer;">
        <div class="stat-icon" style="background:rgba(231,111,81,0.10)"><i class="fas fa-calendar-check fa-lg" style="color:var(--accent)"></i></div>
        <div class="stat-info"><h3 id="s-appts">—</h3><p>Appointments Today</p></div>
      </div>
      <div class="stat-card" onclick="navigate('telemedicine')" style="cursor:pointer;">
        <div class="stat-icon" style="background:rgba(233,196,106,0.15)"><i class="fas fa-video fa-lg" style="color:#92670a"></i></div>
        <div class="stat-info"><h3 id="s-tele">—</h3><p>Telemedicine Doctors</p></div>
      </div>
    </div>

    <!-- Feature Grid -->
    <div class="grid-3 mt-3">
      <div class="card feature-card" onclick="navigate('symptom-checker')">
        <div style="font-size:36px;margin-bottom:12px;">🩺</div>
        <div class="card-title">AI Symptom Checker</div>
        <div class="card-subtitle">Upload images, describe symptoms, get AI-powered triage with pain scale & duration tracking</div>
        <span class="badge badge-primary">Try Now →</span>
      </div>
      <div class="card feature-card" onclick="navigate('emergency')">
        <div style="font-size:36px;margin-bottom:12px;">🏥</div>
        <div class="card-title">Emergency & Hospitals</div>
        <div class="card-subtitle">Live map with hospitals, ambulance booking, dial numbers & estimated arrival times</div>
        <span class="badge badge-danger">Emergency →</span>
      </div>
      <div class="card feature-card" onclick="navigate('telemedicine')">
        <div style="font-size:36px;margin-bottom:12px;">📱</div>
        <div class="card-title">Telemedicine</div>
        <div class="card-subtitle">Connect with qualified doctors from anywhere via video consultation</div>
        <span class="badge badge-info">Consult →</span>
      </div>
      <div class="card feature-card" onclick="navigate('donors')">
        <div style="font-size:36px;margin-bottom:12px;">🩸</div>
        <div class="card-title">Blood & Organ Donor</div>
        <div class="card-subtitle">Find blood donors by type and organ donors. Register as a donor to save lives</div>
        <span class="badge badge-danger">Donate →</span>
      </div>
      <div class="card feature-card" onclick="navigate('medicine')">
        <div style="font-size:36px;margin-bottom:12px;">💊</div>
        <div class="card-title">Medicine Delivery</div>
        <div class="card-subtitle">Order medicines with UPI/card payments. Free delivery above ₹299</div>
        <span class="badge badge-success">Order →</span>
      </div>
      <div class="card feature-card" onclick="navigate('diet')">
        <div style="font-size:36px;margin-bottom:12px;">🥗</div>
        <div class="card-title">Diet & Lifestyle</div>
        <div class="card-subtitle">Personalized diet plans and healthy lifestyle recommendations</div>
        <span class="badge badge-warning">Explore →</span>
      </div>
    </div>

    <!-- Latest Medical News -->
    <div class="card mt-3">
      <div class="card-title">📰 ${t('latest_news')}</div>
      <div class="card-subtitle">Latest medical developments from around the world</div>
      <div id="news-container" class="news-grid">
        <div class="loader"><div class="spinner"></div></div>
      </div>
    </div>

    <!-- Reviews Section with Auto-Slide -->
    <div class="card mt-3">
      <div class="card-title">⭐ ${t('reviews')}</div>
      <div class="card-subtitle">Trusted by patients and doctors across India</div>
      <div class="reviews-slider" id="reviews-slider"></div>
      <div class="reviews-dots" id="reviews-dots"></div>
    </div>

    <!-- Health Alerts -->
    <div class="card mt-3">
      <div class="card-title">🔔 Active Health Alerts</div>
      <div class="card-subtitle">Real-time disease surveillance across Indian states</div>
      <div id="home-alerts" class="grid-3">
        <div class="loader"><div class="spinner"></div></div>
      </div>
    </div>
  `;

  // Animated background
  initHeroAnimation();

  // Load stats
  api.analytics.overview().then(data => {
    document.getElementById('s-doctors').textContent = data.total_doctors;
    document.getElementById('s-hospitals').textContent = data.total_hospitals;
    document.getElementById('s-appts').textContent = data.total_appointments;
    document.getElementById('s-tele').textContent = data.telemedicine_doctors;
  }).catch(() => { });

  // Load news
  api.news.list().then(news => {
    const c = document.getElementById('news-container');
    c.innerHTML = '';
    news.forEach(n => {
      const div = document.createElement('div');
      div.className = 'news-card fade-in';
      div.innerHTML = `
              <div class="news-icon">${n.icon}</div>
              <div class="news-body">
                <div class="news-title">${n.title}</div>
                <div class="news-summary">${n.summary}</div>
                <div class="news-meta"><span>${n.source}</span> · <span>${n.time}</span></div>
              </div>
            `;
      c.appendChild(div);
    });
  }).catch(() => {
    document.getElementById('news-container').innerHTML = '<p class="text-muted">Could not load news</p>';
  });

  // Reviews
  initReviews();

  // Load alerts
  api.analytics.alerts().then(alerts => {
    const container = document.getElementById('home-alerts');
    container.innerHTML = '';
    if (!alerts.length) {
      container.innerHTML = '<p class="text-muted">No active alerts</p>';
      return;
    }
    alerts.slice(0, 6).forEach(a => container.appendChild(createAlertCard(a)));
  }).catch(() => {
    document.getElementById('home-alerts').innerHTML = '<p class="text-muted">Could not load alerts</p>';
  });
}

function initHeroAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  const particles = [];
  const icons = ['❤️', '🩺', '💊', '🏥', '🧬', '🩸', '⚕️', '🫀', '🧠', '💉'];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: 14 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.2
    });
  }

  function animate() {
    if (!document.getElementById('hero-canvas')) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px sans-serif`;
      ctx.fillText(p.icon, p.x, p.y);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

function initReviews() {
  const reviews = [
    { name: 'Priya Menon', city: 'Kochi', rating: 5, text: 'MediConnect helped me find a specialist doctor when my village had no healthcare. The telemedicine feature is a lifesaver!', avatar: 'PM' },
    { name: 'Rajesh Gupta', city: 'Lucknow', rating: 5, text: 'Booked an ambulance in 2 minutes during my father\'s emergency. The live tracking gave us so much peace of mind.', avatar: 'RG' },
    { name: 'Sunita Devi', city: 'Nalanda', rating: 4, text: 'As a rural health worker, the AI symptom checker helps me triage patients better. Available in Hindi too!', avatar: 'SD' },
    { name: 'Dr. Arun Prakash', city: 'Chennai', rating: 5, text: 'Excellent platform for doctors. The telemedicine feature lets me reach patients in remote areas. Very well designed.', avatar: 'AP' },
    { name: 'Meera Jha', city: 'Patna', rating: 5, text: 'Ordered medicines online with UPI payment. Delivered in 3 hours! The blood donor directory also helped my neighbor.', avatar: 'MJ' },
    { name: 'Vikram Singh', city: 'Jaipur', rating: 4, text: 'The hospital locator with live map is amazing. Found the nearest government hospital with ICU beds instantly.', avatar: 'VS' },
    { name: 'Fatima Begum', city: 'Hyderabad', rating: 5, text: 'Love the multilingual support. My grandmother uses it in Telugu. The chatbot answers all her health queries patiently.', avatar: 'FB' },
  ];

  const slider = document.getElementById('reviews-slider');
  const dots = document.getElementById('reviews-dots');
  if (!slider || !dots) return;

  slider.innerHTML = reviews.map((r, i) => `
      <div class="review-card ${i === 0 ? 'active' : ''}">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div class="review-avatar">${r.avatar}</div>
          <div>
            <div class="font-bold">${r.name}</div>
            <div class="text-xs text-muted">${r.city}</div>
          </div>
          <div style="margin-left:auto;">${createStars(r.rating)}</div>
        </div>
        <div class="text-sm" style="line-height:1.7;color:var(--text-muted);">"${r.text}"</div>
      </div>
    `).join('');

  dots.innerHTML = reviews.map((_, i) => `<span class="review-dot ${i === 0 ? 'active' : ''}" onclick="goToReview(${i})"></span>`).join('');

  let current = 0;
  window.goToReview = function (i) {
    current = i;
    document.querySelectorAll('.review-card').forEach((c, idx) => c.classList.toggle('active', idx === i));
    document.querySelectorAll('.review-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
  };

  setInterval(() => {
    current = (current + 1) % reviews.length;
    window.goToReview(current);
  }, 4000);
}
