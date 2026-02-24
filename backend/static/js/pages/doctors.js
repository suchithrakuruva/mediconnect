// DOCTORS PAGE
function renderDoctors() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Find a Doctor</div>
    <div class="page-subtitle">Search across India's network of healthcare professionals</div>

    <div class="filter-bar">
      <div class="search-wrap" style="flex:2;min-width:200px;">
        <i class="fas fa-search search-icon"></i>
        <input class="form-control" id="doc-search" placeholder="Search by name or hospital..." oninput="filterDoctors()" />
      </div>
      <select class="form-control" id="doc-spec" onchange="filterDoctors()" style="flex:1;min-width:160px;">
        <option value="">All Specializations</option>
      </select>
      <select class="form-control" id="doc-city" onchange="filterDoctors()" style="flex:1;min-width:140px;">
        <option value="">All Cities</option>
      </select>
      <select class="form-control" id="doc-lang" onchange="filterDoctors()" style="flex:1;min-width:130px;">
        <option value="">All Languages</option>
        <option>Hindi</option><option>English</option><option>Tamil</option><option>Telugu</option>
        <option>Marathi</option><option>Gujarati</option><option>Bengali</option>
        <option>Malayalam</option><option>Kannada</option><option>Punjabi</option>
      </select>
      <label style="display:flex;align-items:center;gap:6px;font-size:13px;white-space:nowrap;cursor:pointer;">
        <input type="checkbox" id="doc-tele" onchange="filterDoctors()" /> Telemedicine only
      </label>
      <button class="btn btn-outline btn-sm" onclick="clearDoctorFilters()">Clear</button>
    </div>

    <div id="doc-count" class="text-muted text-sm mb-2"></div>
    <div id="doctors-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;">
      <div class="loader"><div class="spinner"></div><span>Loading doctors...</span></div>
    </div>
  `;

    // Load filters
    api.doctors.specializations().then(specs => {
        const sel = document.getElementById('doc-spec');
        specs.forEach(s => { const o = document.createElement('option'); o.textContent = s; sel.appendChild(o); });
    });
    api.doctors.cities().then(cities => {
        const sel = document.getElementById('doc-city');
        cities.forEach(c => { const o = document.createElement('option'); o.textContent = c; sel.appendChild(o); });
    });
    filterDoctors();
}

function filterDoctors() {
    const search = document.getElementById('doc-search')?.value || '';
    const spec = document.getElementById('doc-spec')?.value || '';
    const city = document.getElementById('doc-city')?.value || '';
    const lang = document.getElementById('doc-lang')?.value || '';
    const tele = document.getElementById('doc-tele')?.checked;

    const params = {};
    if (spec) params.specialization = spec;
    if (city) params.city = city;
    if (lang) params.language = lang;
    if (tele) params.telemedicine = 'true';

    const grid = document.getElementById('doctors-grid');
    grid.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

    api.doctors.list(params).then(doctors => {
        let filtered = doctors;
        if (search) {
            const q = search.toLowerCase();
            filtered = doctors.filter(d => d.name.toLowerCase().includes(q) || (d.hospital || '').toLowerCase().includes(q));
        }
        const count = document.getElementById('doc-count');
        if (count) count.textContent = `Showing ${filtered.length} doctor${filtered.length !== 1 ? 's' : ''}`;
        grid.innerHTML = '';
        if (!filtered.length) {
            grid.appendChild(createEmptyState('🔍', 'No doctors found', 'Try adjusting your filters'));
            return;
        }
        filtered.forEach(doc => {
            const card = createDoctorCard(doc, (d) => openBookingModal(d));
            grid.appendChild(card);
        });
    }).catch(() => {
        grid.innerHTML = '<div class="alert alert-warning">Could not load doctors. Please check the backend connection.</div>';
    });
}

function clearDoctorFilters() {
    document.getElementById('doc-search').value = '';
    document.getElementById('doc-spec').value = '';
    document.getElementById('doc-city').value = '';
    document.getElementById('doc-lang').value = '';
    document.getElementById('doc-tele').checked = false;
    filterDoctors();
}

function openBookingModal(doc) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Book Appointment</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div style="background:var(--bg);border-radius:10px;padding:14px;margin-bottom:18px;">
        <div class="font-bold">${doc.name}</div>
        <div class="text-sm text-muted">${doc.specialization} • ${doc.hospital}</div>
        <div class="text-sm">₹${doc.consultation_fee} consultation fee</div>
      </div>
      <div class="form-group">
        <label class="form-label">Type</label>
        <select class="form-control" id="appt-type">
          <option value="in-person">In-Person</option>
          ${doc.telemedicine ? '<option value="telemedicine">Telemedicine</option>' : ''}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" class="form-control" id="appt-date" min="${getTodayStr()}" value="${getTodayStr()}" onchange="loadSlots(${doc.id})" />
      </div>
      <div id="slots-area"></div>
      <div class="form-group">
        <label class="form-label">Symptoms / Reason</label>
        <textarea class="form-control" id="appt-symptoms" rows="2" placeholder="Brief description..."></textarea>
      </div>
      <button class="btn btn-primary btn-full" onclick="bookAppointment(${doc.id})">
        <i class="fas fa-calendar-check"></i> Confirm Booking
      </button>
    </div>
  `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    loadSlots(doc.id);
}

let selectedSlot = '';
async function loadSlots(doctorId) {
    const date = document.getElementById('appt-date')?.value;
    if (!date) return;
    selectedSlot = '';
    const area = document.getElementById('slots-area');
    if (!area) return;
    area.innerHTML = '<div class="loader"><div class="spinner"></div></div>';
    try {
        const data = await api.appointments.slots(doctorId, date);
        area.innerHTML = `
      <div class="form-label mb-1">Available Time Slots</div>
      <div class="slot-grid">
        ${data.available_slots.map(s => `<div class="time-slot" onclick="selectSlot(this,'${s}')">${s}</div>`).join('')}
        ${data.booked_slots.map(s => `<div class="time-slot booked">${s}</div>`).join('')}
      </div>
    `;
    } catch { area.innerHTML = ''; }
}

function selectSlot(el, slot) {
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    el.classList.add('selected');
    selectedSlot = slot;
}

async function bookAppointment(doctorId) {
    if (!selectedSlot) { showToast('Please select a time slot', 'warning'); return; }
    const date = document.getElementById('appt-date')?.value;
    const type = document.getElementById('appt-type')?.value;
    const symptoms = document.getElementById('appt-symptoms')?.value;
    try {
        await api.appointments.book({ doctor_id: doctorId, appointment_date: date, appointment_time: selectedSlot, type, symptoms });
        document.querySelector('.modal-overlay')?.remove();
        showToast('Appointment booked successfully! 🎉');
    } catch { showToast('Failed to book appointment', 'error'); }
}
