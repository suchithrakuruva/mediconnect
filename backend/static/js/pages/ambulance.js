// AMBULANCE / EMERGENCY PAGE
let activeRequestId = null;
let etaInterval = null;

function renderAmbulance() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Emergency Ambulance</div>
    <div class="page-subtitle">Request ambulance service instantly — available 24/7 across India</div>

    <div class="grid-2">
      <div>
        <div class="card text-center" style="padding:40px 24px;">
          <div style="margin:0 auto 24px;width:fit-content;">
            <button class="emergency-btn" onclick="showAmbulanceForm()">
              <i class="fas fa-ambulance"></i>
              <span>CALL<br>108</span>
            </button>
          </div>
          <div class="font-bold" style="font-size:18px;color:var(--primary);">Request Immediate Ambulance</div>
          <div class="text-muted text-sm mt-1">Click to fill pickup details and dispatch ambulance</div>
          <div class="divider"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:left;">
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:22px;">⚡</span>
              <div><div class="font-bold text-sm">Avg. ETA</div><div class="text-xs text-muted">8–20 minutes</div></div>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:22px;">📍</span>
              <div><div class="font-bold text-sm">GPS Tracked</div><div class="text-xs text-muted">Real-time location</div></div>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:22px;">👨‍⚕️</span>
              <div><div class="font-bold text-sm">Paramedics</div><div class="text-xs text-muted">Trained on-board staff</div></div>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:22px;">🏥</span>
              <div><div class="font-bold text-sm">Hospital Link</div><div class="text-xs text-muted">Pre-notified ER</div></div>
            </div>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-title">📞 Emergency Contacts</div>
          <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">
            ${[
            ['🚑', 'Ambulance', '108', 'Call now'],
            ['🚒', 'Fire Brigade', '101', 'Call now'],
            ['🚔', 'Police', '100', 'Call now'],
            ['👩‍⚕️', 'National Health Helpline', '1800-180-1104', 'Toll-free'],
            ['🧠', 'Mental Health Helpline', 'Vandrevala: 1860-2662-345', '24/7'],
        ].map(([icon, name, number, note]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
                <div style="display:flex;gap:10px;align-items:center;">
                  <span style="font-size:20px;">${icon}</span>
                  <div><div class="font-bold text-sm">${name}</div><div class="text-xs text-muted">${note}</div></div>
                </div>
                <a href="tel:${number.replace(/[^0-9]/g, '')}" class="btn btn-sm btn-danger">${number}</a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div id="ambulance-right">
        <div class="card">
          <div class="card-title">🚑 Request Form</div>
          <div class="card-subtitle">Fill in the details below to dispatch an ambulance</div>
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input class="form-control" id="amb-name" placeholder="Full name" />
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input class="form-control" id="amb-phone" placeholder="+91 XXXXX XXXXX" type="tel" />
          </div>
          <div class="form-group">
            <label class="form-label">Pickup Address</label>
            <textarea class="form-control" id="amb-address" rows="3" placeholder="Full address with landmark..."></textarea>
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
          <button class="btn btn-danger btn-full btn-lg" onclick="requestAmbulance()">
            <i class="fas fa-ambulance"></i> Dispatch Ambulance Now
          </button>
        </div>
      </div>
    </div>

    <div id="tracker-area" style="margin-top:24px;"></div>
  `;
}

function showAmbulanceForm() {
    document.getElementById('ambulance-right')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('amb-name')?.focus();
}

async function requestAmbulance() {
    const name = document.getElementById('amb-name')?.value;
    const phone = document.getElementById('amb-phone')?.value;
    const address = document.getElementById('amb-address')?.value;
    const emergency_type = document.getElementById('amb-type')?.value;

    if (!name || !phone || !address) {
        showToast('Please fill all fields', 'warning'); return;
    }

    try {
        const result = await api.ambulance.request({ patient_name: name, phone, pickup_address: address, emergency_type });
        activeRequestId = result.id;
        showToast('🚑 Ambulance dispatched! ETA: ' + result.eta_minutes + ' mins');
        renderTracker(result);
        simulateTracking(result);
    } catch {
        showToast('Could not dispatch. Call 108 directly.', 'error');
    }
}

function renderTracker(req) {
    const area = document.getElementById('tracker-area');
    area.innerHTML = `
    <div class="ambulance-tracker">
      <div class="flex justify-between items-center mb-2">
        <div class="font-bold" style="font-size:18px;color:var(--danger);">🚨 Ambulance Dispatched</div>
        <div class="badge badge-danger">${req.ambulance_number}</div>
      </div>
      <div class="text-sm text-muted">Pickup: ${req.pickup_address}</div>
      <div class="text-sm text-muted">Emergency: ${req.emergency_type}</div>
      <div style="margin:20px 0;background:rgba(230,57,70,0.08);border-radius:12px;padding:16px;text-align:center;">
        <div id="eta-display" style="font-size:42px;font-weight:800;color:var(--danger);">${req.eta_minutes}</div>
        <div class="text-muted text-sm">minutes away</div>
      </div>
      <div class="tracker-steps">
        <div class="tracker-step done" id="step-requested">
          <div class="step-dot"><i class="fas fa-check" style="font-size:12px;"></i></div>
          <div class="step-label">Requested</div>
        </div>
        <div class="tracker-step active" id="step-dispatched">
          <div class="step-dot"><i class="fas fa-ambulance" style="font-size:12px;"></i></div>
          <div class="step-label">Dispatched</div>
        </div>
        <div class="tracker-step" id="step-enroute">
          <div class="step-dot">3</div>
          <div class="step-label">En Route</div>
        </div>
        <div class="tracker-step" id="step-arrived">
          <div class="step-dot">4</div>
          <div class="step-label">Arrived</div>
        </div>
      </div>
    </div>
  `;
}

function simulateTracking(req) {
    if (etaInterval) clearInterval(etaInterval);
    let eta = req.eta_minutes;
    etaInterval = setInterval(() => {
        eta = Math.max(0, eta - 1);
        const etaEl = document.getElementById('eta-display');
        if (etaEl) etaEl.textContent = eta;
        if (eta <= Math.floor(req.eta_minutes * 0.6)) {
            document.getElementById('step-enroute')?.classList.add('active');
            document.getElementById('step-dispatched')?.classList.replace('active', 'done');
        }
        if (eta === 0) {
            clearInterval(etaInterval);
            document.getElementById('step-enroute')?.classList.replace('active', 'done');
            document.getElementById('step-arrived')?.classList.add('active');
            if (etaEl) etaEl.textContent = '🏥';
            showToast('Ambulance has arrived at your location!');
        }
    }, 1000);
}
