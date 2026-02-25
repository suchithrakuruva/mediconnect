// EMERGENCY & HOSPITALS — Merged Page with Live Map
let emergencyMap = null;
let emergencyMarkers = [];
let activeRequestId = null;
let etaInterval = null;

function renderEmergency() {
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <div class="page-title">🚨 ${t('emergency')}</div>
    <div class="page-subtitle">Live hospital map with ambulance booking & dial support</div>

    <div class="emergency-layout">
      <!-- LEFT: Live Map -->
      <div class="emergency-map-side">
        <div class="card" style="padding:0;overflow:hidden;">
          <div id="emergency-map" style="height:520px;"></div>
        </div>
        <div id="tracker-area" style="margin-top:16px;"></div>
      </div>

      <!-- RIGHT: Controls -->
      <div class="emergency-controls-side">
        <!-- My Location -->
        <div class="card">
          <div class="card-title"><i class="fas fa-map-marker-alt text-danger"></i> My Location</div>
          <div class="form-group">
            <label class="form-label">Your Full Address</label>
            <textarea class="form-control" id="my-address" rows="2" placeholder="House no., Street, Area, City, PIN..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Contact Number</label>
            <input class="form-control" id="my-phone" placeholder="+91 XXXXX XXXXX" type="tel" oninput="onPhoneInput(this.value)" />
          </div>
          <button class="btn btn-primary btn-full btn-sm" onclick="detectMyLocation()">
            <i class="fas fa-crosshairs"></i> Detect My Live Location
          </button>
          <div id="my-location-status" class="text-xs text-muted mt-1"></div>
        </div>

        <!-- Emergency Contacts - Only Ambulance -->
        <div class="card mt-2">
          <div class="card-title">📞 Emergency Contact</div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">
              <div style="display:flex;gap:8px;align-items:center;">
                <span style="font-size:18px;">🚑</span>
                <div><div class="font-bold text-sm">Ambulance</div></div>
              </div>
              <a href="tel:108" class="btn btn-sm btn-danger">108</a>
            </div>
          </div>
        </div>

        <!-- Ambulance Form -->
        <div class="card mt-2">
          <div class="card-title">🚑 Book Ambulance</div>
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input class="form-control" id="amb-name" placeholder="Full name" />
          </div>
          <div class="form-group">
            <label class="form-label">Emergency Type</label>
            <select class="form-control" id="amb-type">
              <option>Cardiac Emergency</option>
              <option>Road Accident / Trauma</option>
              <option>Stroke</option>
              <option>Difficulty Breathing</option>
              <option>Severe Injury</option>
              <option>Pregnancy Emergency</option>
              <option>General Emergency</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Destination Hospital (optional)</label>
            <select class="form-control" id="amb-hospital">
              <option value="">Nearest Available</option>
            </select>
          </div>
          <button class="btn btn-danger btn-full btn-lg" onclick="requestEmergencyAmbulance()">
            <i class="fas fa-ambulance"></i> Dispatch Ambulance Now
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (emergencyMap) { emergencyMap.remove(); emergencyMap = null; }
    emergencyMap = L.map('emergency-map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(emergencyMap);
    // Auto-detect location on page load
    autoDetectAndShowNearby();
    loadEmergencyHospitals();
  }, 100);
}

// When any number is typed in phone, auto-detect live location and show nearby hospitals
function onPhoneInput(val) {
  if (val.replace(/\D/g, '').length >= 3) {
    autoDetectAndShowNearby();
  }
}

function autoDetectAndShowNearby() {
  const status = document.getElementById('my-location-status');
  if (!status) return;
  status.textContent = 'Detecting your live location...';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        status.innerHTML = `<span class="text-success">📍 Live Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</span>`;
        if (emergencyMap) {
          emergencyMap.setView([latitude, longitude], 12);
          // Remove previous user marker
          emergencyMarkers.forEach(m => {
            if (m._isUserMarker) m.remove();
          });
          const userMarker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: '',
              html: `<div style="background:#3B82F6;width:18px;height:18px;border-radius:50%;border:4px solid white;box-shadow:0 0 0 4px rgba(59,130,246,0.3);"></div>`,
              iconSize: [18, 18]
            })
          }).addTo(emergencyMap).bindPopup('<strong>📍 Your Live Location</strong>').openPopup();
          userMarker._isUserMarker = true;
          emergencyMarkers.push(userMarker);
        }
      },
      () => {
        status.innerHTML = '<span class="text-danger">Could not detect location. Please enable GPS.</span>';
        // Fallback: show Kurnool area
        if (emergencyMap) emergencyMap.setView([15.8281, 78.0373], 12);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    status.textContent = 'Geolocation not supported.';
  }
}

function loadEmergencyHospitals() {
  api.hospitals.list().then(hospitals => {
    emergencyMarkers = emergencyMarkers.filter(m => {
      if (!m._isUserMarker) { m.remove(); return false; }
      return true;
    });

    const sel = document.getElementById('amb-hospital');
    hospitals.forEach(h => {
      const o = document.createElement('option');
      o.value = h.id;
      o.textContent = `${h.name} — ${h.city}`;
      sel.appendChild(o);
    });

    hospitals.forEach(h => {
      if (!h.latitude || !h.longitude) return;
      const color = h.emergency ? '#E63946' : (h.type === 'Government' ? '#0A2463' : '#2A9D8F');
      const icon = L.divIcon({
        className: '',
        html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);cursor:pointer;"></div>`,
        iconSize: [16, 16]
      });

      const transportETA = Math.floor(5 + Math.random() * 25);
      const ambETA = Math.floor(8 + Math.random() * 15);

      const popupContent = `
              <div style="min-width:250px;font-family:Inter,sans-serif;">
                <div style="font-weight:800;font-size:15px;color:#0A2463;margin-bottom:6px;">${h.name}</div>
                <div style="display:flex;gap:6px;margin-bottom:8px;">
                  <span style="background:${h.type === 'Government' ? 'rgba(10,36,99,0.1)' : 'rgba(42,157,143,0.1)'};color:${h.type === 'Government' ? '#0A2463' : '#2A9D8F'};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">${h.type}</span>
                  ${h.emergency ? '<span style="background:rgba(230,57,70,0.1);color:#E63946;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">Emergency</span>' : ''}
                </div>
                <div style="font-size:12px;color:#64748B;margin-bottom:4px;">⭐ ${h.rating}/5 · 🕐 ${h.available_time || '24/7'}</div>
                <div style="font-size:12px;color:#64748B;margin-bottom:4px;">🛏 ${h.available_beds} beds available</div>
                <div style="font-size:12px;color:#64748B;margin-bottom:8px;">🚗 ~${transportETA} min by car · 🚑 Ambulance ~${ambETA} min</div>
                <div style="display:flex;gap:6px;">
                  <a href="tel:${(h.phone || '108').replace(/[^0-9]/g, '')}" 
                     style="flex:1;display:flex;align-items:center;justify-content:center;gap:4px;background:#0A2463;color:white;padding:8px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;">
                    📞 ${h.phone || '108'}
                  </a>
                  <button onclick="bookAmbulanceToHospital(${h.id},'${h.name.replace(/'/g, "\\'")}')" 
                          style="flex:1;display:flex;align-items:center;justify-content:center;gap:4px;background:#E63946;color:white;padding:8px;border-radius:8px;font-size:12px;font-weight:600;border:none;cursor:pointer;">
                    🚑 Ambulance
                  </button>
                </div>
              </div>
            `;

      const marker = L.marker([h.latitude, h.longitude], { icon })
        .bindPopup(popupContent, { maxWidth: 300 })
        .addTo(emergencyMap);
      emergencyMarkers.push(marker);
    });
  });
}

function detectMyLocation() {
  autoDetectAndShowNearby();
}

function bookAmbulanceToHospital(hospitalId, hospitalName) {
  document.getElementById('amb-hospital').value = hospitalId;
  document.getElementById('amb-name')?.focus();
  showToast(`Selected ${hospitalName}. Fill details to dispatch ambulance.`, 'info');
}

// Driver names pool for simulation
const DRIVER_NAMES = [
  { name: 'Ramesh Kumar', phone: '+91-9988776655' },
  { name: 'Sunil Verma', phone: '+91-9877665544' },
  { name: 'Mohan Das', phone: '+91-9766554433' },
  { name: 'Prakash Rao', phone: '+91-9655443322' },
  { name: 'Vijay Singh', phone: '+91-9544332211' },
];

async function requestEmergencyAmbulance() {
  const name = document.getElementById('amb-name')?.value;
  const phone = document.getElementById('my-phone')?.value;
  const address = document.getElementById('my-address')?.value;
  const emergency_type = document.getElementById('amb-type')?.value;

  if (!name || !phone || !address) {
    showToast('Please fill name, phone and address', 'warning'); return;
  }

  try {
    const result = await api.ambulance.request({
      patient_name: name, phone, pickup_address: address, emergency_type
    });
    // Add driver info
    const driver = DRIVER_NAMES[Math.floor(Math.random() * DRIVER_NAMES.length)];
    result.driver_name = driver.name;
    result.driver_phone = driver.phone;

    activeRequestId = result.id;
    showToast('🚑 Ambulance dispatched! Driver: ' + driver.name);
    renderEmergencyTracker(result);
    simulateEmergencyTracking(result);
  } catch {
    showToast('Could not dispatch. Call 108 directly.', 'error');
  }
}

function renderEmergencyTracker(req) {
  const area = document.getElementById('tracker-area');
  area.innerHTML = `
    <div class="ambulance-tracker">
      <div class="flex justify-between items-center mb-2">
        <div class="font-bold" style="font-size:18px;color:var(--danger);">🚨 Ambulance Dispatched</div>
        <div class="badge badge-danger">${req.ambulance_number}</div>
      </div>
      <div class="text-sm text-muted">Emergency: ${req.emergency_type}</div>
      
      <!-- Driver Details -->
      <div style="margin:12px 0;background:rgba(10,36,99,0.06);border-radius:10px;padding:14px;">
        <div class="font-bold text-sm" style="margin-bottom:8px;">🚑 Ambulance & Driver Details</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;">
          <div><strong>Ambulance:</strong> ${req.ambulance_number}</div>
          <div><strong>Driver:</strong> ${req.driver_name || 'Ramesh Kumar'}</div>
          <div><strong>Contact:</strong> <a href="tel:${(req.driver_phone || '+91-9988776655').replace(/[^0-9+]/g, '')}" style="color:var(--primary);font-weight:600;">${req.driver_phone || '+91-9988776655'}</a></div>
          <div><strong>Type:</strong> ALS Ambulance</div>
        </div>
      </div>
      
      <!-- Live Countdown HH:MM:SS -->
      <div style="margin:16px 0;background:rgba(230,57,70,0.08);border-radius:12px;padding:20px;text-align:center;">
        <div class="text-xs text-muted" style="letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Estimated Arrival</div>
        <div id="eta-countdown" style="display:flex;align-items:center;justify-content:center;gap:4px;">
          <div style="text-align:center;"><span id="eta-hrs" style="font-size:36px;font-weight:800;color:var(--danger);display:block;">00</span><span style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">Hrs</span></div>
          <span style="font-size:36px;font-weight:700;color:var(--danger);padding:0 4px;">:</span>
          <div style="text-align:center;"><span id="eta-mins" style="font-size:36px;font-weight:800;color:var(--danger);display:block;">${String(req.eta_minutes).padStart(2, '0')}</span><span style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">Min</span></div>
          <span style="font-size:36px;font-weight:700;color:var(--danger);padding:0 4px;">:</span>
          <div style="text-align:center;"><span id="eta-secs" style="font-size:36px;font-weight:800;color:var(--danger);display:block;">00</span><span style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">Sec</span></div>
        </div>
      </div>
      
      <div class="tracker-steps">
        <div class="tracker-step done"><div class="step-dot"><i class="fas fa-check" style="font-size:12px;"></i></div><div class="step-label">Requested</div></div>
        <div class="tracker-step active" id="step-dispatched"><div class="step-dot"><i class="fas fa-ambulance" style="font-size:12px;"></i></div><div class="step-label">Dispatched</div></div>
        <div class="tracker-step" id="step-enroute"><div class="step-dot">3</div><div class="step-label">En Route</div></div>
        <div class="tracker-step" id="step-arrived"><div class="step-dot">4</div><div class="step-label">Arrived</div></div>
      </div>
    </div>`;
}

function simulateEmergencyTracking(req) {
  if (etaInterval) clearInterval(etaInterval);
  let totalSeconds = req.eta_minutes * 60;

  etaInterval = setInterval(() => {
    totalSeconds = Math.max(0, totalSeconds - 1);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const hrsEl = document.getElementById('eta-hrs');
    const minsEl = document.getElementById('eta-mins');
    const secsEl = document.getElementById('eta-secs');

    if (hrsEl) hrsEl.textContent = String(hrs).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');

    // Update tracker steps
    if (totalSeconds <= Math.floor(req.eta_minutes * 60 * 0.6)) {
      document.getElementById('step-enroute')?.classList.add('active');
      document.getElementById('step-dispatched')?.classList.replace('active', 'done');
    }
    if (totalSeconds === 0) {
      clearInterval(etaInterval);
      document.getElementById('step-enroute')?.classList.replace('active', 'done');
      document.getElementById('step-arrived')?.classList.add('active');
      const countdown = document.getElementById('eta-countdown');
      if (countdown) countdown.innerHTML = '<div style="font-size:42px;">🏥</div><div class="text-sm text-muted">Ambulance has arrived!</div>';
      showToast('🚑 Ambulance has arrived at your location!');
    }
  }, 1000);
}
