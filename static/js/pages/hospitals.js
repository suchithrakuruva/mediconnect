// HOSPITALS PAGE — with Leaflet Map
let hospitalMap = null;
let hospitalMarkers = [];

function renderHospitals() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Hospital Locator</div>
    <div class="page-subtitle">Find hospitals near you — government, private, PHC, and CHC across India</div>

    <div class="filter-bar">
      <div class="search-wrap" style="flex:2;min-width:180px;">
        <i class="fas fa-search search-icon"></i>
        <input class="form-control" id="hosp-search" placeholder="Search by name or city..." oninput="filterHospitals()" />
      </div>
      <select class="form-control" id="hosp-type" onchange="filterHospitals()">
        <option value="">All Types</option>
        <option>Government</option><option>Private</option><option>PHC</option><option>CHC</option>
      </select>
      <select class="form-control" id="hosp-state" onchange="filterHospitals()">
        <option value="">All States</option>
        <option>Delhi</option><option>Maharashtra</option><option>Karnataka</option>
        <option>Kerala</option><option>Tamil Nadu</option><option>Uttar Pradesh</option>
        <option>Bihar</option><option>Rajasthan</option><option>Gujarat</option>
        <option>West Bengal</option><option>Punjab</option><option>Telangana</option>
      </select>
      <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;white-space:nowrap;">
        <input type="checkbox" id="hosp-emergency" onchange="filterHospitals()" /> Emergency only
      </label>
    </div>

    <div class="grid-2" style="gap:24px;">
      <div>
        <div class="card" style="padding:0;overflow:hidden;margin-bottom:24px;">
          <div id="hospital-map" style="height:420px;"></div>
        </div>
        <div class="card">
          <div class="card-title">📊 Hospital Stats</div>
          <div id="hosp-stats" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;"></div>
        </div>
      </div>
      <div>
        <div id="hosp-count" class="text-muted text-sm mb-2"></div>
        <div id="hospitals-list" style="display:flex;flex-direction:column;gap:16px;max-height:720px;overflow-y:auto;padding-right:4px;">
          <div class="loader"><div class="spinner"></div><span>Loading hospitals...</span></div>
        </div>
      </div>
    </div>
  `;

    // Init map
    setTimeout(() => {
        if (hospitalMap) { hospitalMap.remove(); hospitalMap = null; }
        hospitalMap = L.map('hospital-map').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(hospitalMap);
        loadHospitals();
    }, 100);
}

let allHospitals = [];
function loadHospitals() {
    api.hospitals.list().then(hospitals => {
        allHospitals = hospitals;
        renderHospitalList(hospitals);
        renderHospitalMapMarkers(hospitals);
        renderHospitalStats(hospitals);
    }).catch(() => {
        document.getElementById('hospitals-list').innerHTML =
            '<div class="alert alert-warning">Could not load hospitals. Ensure backend is running.</div>';
    });
}

function filterHospitals() {
    const search = (document.getElementById('hosp-search')?.value || '').toLowerCase();
    const type = document.getElementById('hosp-type')?.value || '';
    const state = document.getElementById('hosp-state')?.value || '';
    const emergency = document.getElementById('hosp-emergency')?.checked;

    let filtered = allHospitals;
    if (search) filtered = filtered.filter(h => h.name.toLowerCase().includes(search) || h.city.toLowerCase().includes(search));
    if (type) filtered = filtered.filter(h => h.type === type);
    if (state) filtered = filtered.filter(h => h.state === state);
    if (emergency) filtered = filtered.filter(h => h.emergency);

    renderHospitalList(filtered);
    renderHospitalMapMarkers(filtered);
}

function renderHospitalList(hospitals) {
    const list = document.getElementById('hospitals-list');
    const count = document.getElementById('hosp-count');
    if (!list) return;
    if (count) count.textContent = `Showing ${hospitals.length} hospital${hospitals.length !== 1 ? 's' : ''}`;
    list.innerHTML = '';
    if (!hospitals.length) { list.appendChild(createEmptyState('🏥', 'No hospitals found', 'Try changing your filters')); return; }
    hospitals.forEach(h => list.appendChild(createHospitalCard(h)));
}

function renderHospitalMapMarkers(hospitals) {
    if (!hospitalMap) return;
    hospitalMarkers.forEach(m => m.remove());
    hospitalMarkers = [];
    hospitals.forEach(h => {
        if (!h.latitude || !h.longitude) return;
        const color = h.emergency ? '#E63946' : (h.type === 'Government' ? '#0A2463' : '#2A9D8F');
        const icon = L.divIcon({
            className: '',
            html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
            iconSize: [14, 14]
        });
        const marker = L.marker([h.latitude, h.longitude], { icon })
            .bindPopup(`
        <strong>${h.name}</strong><br>
        <span style="color:#64748B;font-size:12px;">${h.type} • ${h.city}</span><br>
        <span style="font-size:12px;">🛏 ${h.available_beds} beds available</span>
        ${h.emergency ? '<br><span style="color:#E63946;font-size:12px;font-weight:600;">🚨 Emergency Services</span>' : ''}
      `)
            .addTo(hospitalMap);
        hospitalMarkers.push(marker);
    });
}

function renderHospitalStats(hospitals) {
    const el = document.getElementById('hosp-stats');
    if (!el) return;
    const govCount = hospitals.filter(h => h.type === 'Government').length;
    const emerCount = hospitals.filter(h => h.emergency).length;
    const totalBeds = hospitals.reduce((a, h) => a + (h.beds || 0), 0);
    const availBeds = hospitals.reduce((a, h) => a + (h.available_beds || 0), 0);
    el.innerHTML = [
        ['🏛️', govCount, 'Government'],
        ['🚨', emerCount, 'Emergency'],
        ['🛏', totalBeds.toLocaleString(), 'Total Beds'],
        ['✅', availBeds.toLocaleString(), 'Available Beds']
    ].map(([icon, val, label]) => `
    <div style="text-align:center;padding:12px;background:var(--bg);border-radius:10px;">
      <div style="font-size:22px;">${icon}</div>
      <div style="font-size:22px;font-weight:800;color:var(--primary);">${val}</div>
      <div style="font-size:12px;color:var(--text-muted);">${label}</div>
    </div>
  `).join('');
}
