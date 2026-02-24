// =====================================================
// MediConnect — Main App Router (Revamped)
// =====================================================

const ROUTES = {
  home: { label: () => t('home'), icon: 'fas fa-home', render: renderHome },
  dashboard: { label: () => t('dashboard'), icon: 'fas fa-th-large', render: renderDashboard },
  'symptom-checker': { label: () => t('symptom_checker'), icon: 'fas fa-stethoscope', render: renderSymptomChecker },
  doctors: { label: () => t('find_doctors'), icon: 'fas fa-user-md', render: renderDoctors },
  telemedicine: { label: () => t('telemedicine'), icon: 'fas fa-video', render: renderTelemedicine },
  analytics: { label: () => t('analytics'), icon: 'fas fa-chart-line', render: renderAnalytics },
  medicine: { label: () => t('medicine'), icon: 'fas fa-pills', render: renderMedicine },
  education: { label: () => t('education'), icon: 'fas fa-book-medical', render: renderEducation },
  donors: { label: () => t('donors'), icon: 'fas fa-tint', render: renderDonors },
  diet: { label: () => t('diet'), icon: 'fas fa-utensils', render: renderDiet },
  records: { label: () => t('records'), icon: 'fas fa-clipboard-list', render: renderRecords },
  appointments: { label: () => t('appointments'), icon: 'fas fa-calendar-check', render: renderAppointments },
  profile: { label: () => t('profile'), icon: 'fas fa-user', render: renderProfile, hidden: true },
  emergency: { label: () => t('emergency'), icon: 'fas fa-hospital', render: renderEmergency, hidden: true },
};

let currentPage = 'home';

function buildLayout() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Sidebar -->
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <h1>Medi<span>Connect</span></h1>
        <p>AI for Equitable Healthcare 🇮🇳</p>
      </div>
      <div class="sidebar-nav" id="sidebar-nav"></div>
    </nav>

    <!-- Main content -->
    <div class="main-content">
      <header class="header">
        <div class="header-left">
          <button class="btn-icon" id="sidebar-toggle" onclick="toggleSidebar()" style="display:none;">
            <i class="fas fa-bars fa-lg"></i>
          </button>
          <div class="header-title" id="header-title">MediConnect</div>
        </div>
        <div class="header-right">
          <!-- Language Selector -->
          <div class="lang-selector">
            <select class="lang-select" id="lang-select" onchange="setLanguage(this.value)">
              ${Object.entries(LANGUAGES).map(([code, name]) =>
    `<option value="${code}" ${code === currentLang ? 'selected' : ''}>${name}</option>`
  ).join('')}
            </select>
            <i class="fas fa-globe" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--primary);pointer-events:none;font-size:13px;"></i>
          </div>

          <div style="font-size:12px;color:var(--text-muted);" id="header-clock"></div>

          <!-- Emergency Button -->
          <button class="header-emergency-btn" onclick="navigate('emergency')" title="Emergency & Hospitals">
            <i class="fas fa-hospital"></i> <span class="hide-mobile">🚨</span>
          </button>

          <!-- Profile Avatar -->
          <div class="header-avatar" title="Profile" onclick="navigate('profile')">A</div>
        </div>
      </header>

      <main class="page">
        <div id="page-content"></div>
      </main>

      <!-- Global Footer -->
      <footer class="global-footer" id="global-footer">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>About Us</h3>
            <p>MediConnect is India's AI-powered healthcare platform bridging urban-rural healthcare gaps. 
            We connect patients with doctors, hospitals, and emergency services through cutting-edge technology.</p>
            <p style="margin-top:8px;"><strong>Affiliated by KMC</strong> (Karnataka Medical Council)</p>
          </div>
          <div class="footer-col">
            <h3>Quick Links</h3>
            <a onclick="navigate('symptom-checker')">Symptom Checker</a>
            <a onclick="navigate('doctors')">Find Doctors</a>
            <a onclick="navigate('emergency')">Emergency & Hospitals</a>
            <a onclick="navigate('medicine')">Order Medicine</a>
            <a onclick="navigate('donors')">Blood & Organ Donor</a>
          </div>
          <div class="footer-col">
            <h3>Contact Us</h3>
            <p><i class="fas fa-envelope"></i> admin@mediconnect.in</p>
            <p><i class="fas fa-phone"></i> 1800-180-1104 (Toll-free)</p>
            <p><i class="fas fa-map-marker-alt"></i> Bengaluru, Karnataka, India</p>
            <div class="footer-social">
              <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://youtube.com" target="_blank"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 MediConnect Healthcare Pvt. Ltd. All rights reserved. | Privacy Policy | Terms of Service</p>
          <p style="font-size:11px;margin-top:4px;">Compliant with IT Act 2000, Digital Personal Data Protection Act 2023, and Telemedicine Practice Guidelines 2020</p>
        </div>
      </footer>
    </div>
  `;

  buildNav();
  startClock();
  navigate(currentPage);
  // Initialize chatbot
  setTimeout(() => initChatbot(), 500);
}

function buildNav() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  Object.entries(ROUTES).forEach(([key, route]) => {
    if (route.hidden) return;
    const item = document.createElement('div');
    item.className = 'nav-item' + (key === currentPage ? ' active' : '');
    item.id = 'nav-' + key;
    const label = typeof route.label === 'function' ? route.label() : route.label;
    item.innerHTML = `<i class="${route.icon}"></i><span>${label}</span>`;
    item.onclick = () => navigate(key);
    nav.appendChild(item);
  });
}

function navigate(page) {
  if (!ROUTES[page]) page = 'home';

  // Update active state
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.getElementById('nav-' + page)?.classList.add('active');

  // Update header title
  const label = typeof ROUTES[page].label === 'function' ? ROUTES[page].label() : ROUTES[page].label;
  document.getElementById('header-title').textContent = label;
  currentPage = page;

  // Clean up map if leaving emergency page
  if (page !== 'emergency' && typeof emergencyMap !== 'undefined' && emergencyMap) {
    try { emergencyMap.remove(); } catch { }
    emergencyMap = null;
  }
  // Clean up old hospital map
  if (page !== 'hospitals' && typeof hospitalMap !== 'undefined' && hospitalMap) {
    try { hospitalMap.remove(); } catch { }
    hospitalMap = null;
  }
  if (page !== 'analytics' && typeof analyticsCharts !== 'undefined') {
    Object.values(analyticsCharts).forEach(c => { try { c.destroy(); } catch { } });
  }
  if (page !== 'ambulance' && typeof etaInterval !== 'undefined' && etaInterval) {
    clearInterval(etaInterval);
  }

  const content = document.getElementById('page-content');
  content.innerHTML = '';
  content.scrollTop = 0;
  window.scrollTo(0, 0);

  ROUTES[page].render();

  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function startClock() {
  function tick() {
    const now = new Date();
    const el = document.getElementById('header-clock');
    if (el) el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 60000);
}

function handleResize() {
  const toggle = document.getElementById('sidebar-toggle');
  if (toggle) toggle.style.display = window.innerWidth < 768 ? 'flex' : 'none';
}
window.addEventListener('resize', handleResize);

document.addEventListener('DOMContentLoaded', () => {
  buildLayout();
  setTimeout(handleResize, 0);
});
