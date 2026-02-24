// =====================================================
// Shared Components
// =====================================================

function createDoctorCard(d) {
  const card = document.createElement('div');
  card.className = 'doctor-card fade-in';
  card.innerHTML = `
    <div style="display:flex;gap:12px;align-items:center;">
      <div class="doctor-avatar">${d.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
      <div style="flex:1;">
        <div class="doctor-name">${d.name}</div>
        <div class="doctor-spec">${d.specialization}</div>
        <div class="doctor-meta"><span>🏥 ${d.hospital || d.city}</span></div>
      </div>
      <div style="text-align:right;">
        <div class="font-bold text-success" style="font-size:16px;">₹${d.consultation_fee}</div>
        <div class="text-xs text-muted">${d.experience_years}y exp</div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
      <div class="doctor-tags">
        ${d.languages?.map(l => `<span class="tag">${l.trim()}</span>`).join('') || ''}
        ${d.telemedicine ? '<span class="tag success">📹 Telemedicine</span>' : ''}
        <span class="tag primary">🕐 ${d.available_time || '09-17'}</span>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <span class="stars">${createStars(d.rating)}</span>
        <span class="rating-num">${d.rating}</span>
      </div>
    </div>
  `;
  return card;
}

function createHospitalCard(h) {
  const card = document.createElement('div');
  card.className = 'card fade-in';
  card.innerHTML = `
    <div class="flex justify-between items-center">
      <div>
        <div class="card-title">${h.name}</div>
        <div class="text-sm text-muted">📍 ${h.address || ''}, ${h.city}</div>
      </div>
      <div style="text-align:right;">
        ${createStars(h.rating)}
        <div class="text-xs text-muted mt-1">${h.type}</div>
      </div>
    </div>
    <div class="divider"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;">
      <div><div class="text-xs text-muted">Total Beds</div><div class="font-bold text-primary">${h.beds}</div></div>
      <div><div class="text-xs text-muted">ICU Beds</div><div class="font-bold text-danger">${h.icu_beds}</div></div>
      <div><div class="text-xs text-muted">Available</div><div class="font-bold text-success">${h.available_beds}</div></div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;">
      ${h.facilities?.map(f => `<span class="tag primary">${f.trim()}</span>`).join('') || ''}
    </div>
  `;
  return card;
}

function createAlertCard(a) {
  const card = document.createElement('div');
  card.className = 'card fade-in';
  const sevColors = { high: 'danger', medium: 'warning', low: 'info' };
  card.innerHTML = `
    <span class="badge badge-${sevColors[a.severity] || 'info'} mb-1">${a.severity?.toUpperCase()}</span>
    <div class="card-title">${a.title}</div>
    <div class="text-sm text-muted" style="margin:6px 0;line-height:1.6;">${a.description}</div>
    <div class="flex justify-between text-xs text-muted mt-1">
      <span>📍 ${a.city}, ${a.state}</span>
      <span class="font-bold">${a.cases} cases</span>
    </div>
  `;
  return card;
}

function createStars(rating) {
  const full = Math.floor(rating || 0);
  const half = (rating || 0) - full >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fas fa-star" style="color:#F59E0B;"></i>';
  if (half) html += '<i class="fas fa-star-half-alt" style="color:#F59E0B;"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="far fa-star" style="color:#D1D5DB;"></i>';
  return html;
}

function createLoader() {
  const div = document.createElement('div');
  div.className = 'loader';
  div.innerHTML = '<div class="spinner"></div><span>Loading...</span>';
  return div;
}

function createEmptyState(icon, title, desc) {
  const div = document.createElement('div');
  div.className = 'card text-center fade-in';
  div.style.padding = '48px 24px';
  div.innerHTML = `
    <div style="font-size:48px;margin-bottom:16px;">${icon}</div>
    <h3 style="font-weight:700;color:var(--primary);margin-bottom:6px;">${title}</h3>
    <p class="text-muted text-sm">${desc}</p>
  `;
  return div;
}

function createModal(title, content, footer) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      ${content}
      ${footer ? `<div style="margin-top:16px;">${footer}</div>` : ''}
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  return overlay;
}

function formatDate(d) {
  if (!d) return '—';
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return d; }
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}
