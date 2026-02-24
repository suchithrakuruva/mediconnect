// APPOINTMENTS PAGE — with Payment Options
function renderAppointments() {
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <div class="page-title">📅 ${t('appointments')}</div>
    <div class="page-subtitle">Manage and track your healthcare appointments</div>

    <div class="tabs">
      <button class="tab-btn active" id="tab-list" onclick="switchApptTab('list')">My Appointments</button>
      <button class="tab-btn" id="tab-book" onclick="switchApptTab('book')">Book New</button>
    </div>

    <div id="appt-tab-content"></div>
  `;
  switchApptTab('list');
}

function switchApptTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab)?.classList.add('active');
  if (tab === 'list') renderApptList();
  else renderBookingForm();
}

function renderApptList() {
  const c = document.getElementById('appt-tab-content');
  c.innerHTML = '<div class="loader"><div class="spinner"></div></div>';
  api.appointments.list({ patient_id: 1 }).then(appts => {
    if (!appts.length) {
      c.innerHTML = '';
      c.appendChild(createEmptyState('📅', 'No appointments yet', 'Book your first appointment'));
      return;
    }
    const statusColors = { scheduled: 'info', completed: 'success', cancelled: 'danger' };
    c.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Doctor</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Payment</th><th>Action</th></tr></thead>
          <tbody id="appt-tbody"></tbody>
        </table>
      </div>`;
    const tbody = document.getElementById('appt-tbody');
    appts.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-bold">Doctor #${a.doctor_id}</td>
        <td>${formatDate(a.appointment_date)}</td>
        <td>${a.appointment_time}</td>
        <td><span class="badge badge-primary">${a.type}</span></td>
        <td><span class="badge badge-${statusColors[a.status] || 'info'}">${a.status}</span></td>
        <td><span class="badge badge-${a.payment_status === 'paid' ? 'success' : 'warning'}">${a.payment_status || 'pending'}</span></td>
        <td>${a.status === 'scheduled' ? `<button class="btn btn-sm btn-danger" onclick="cancelAppt(${a.id}, this)">Cancel</button>` : '—'}</td>
      `;
      tbody.appendChild(tr);
    });
  }).catch(() => {
    c.innerHTML = '<div class="alert alert-warning">Could not load appointments.</div>';
  });
}

async function cancelAppt(id, btn) {
  if (!confirm('Cancel this appointment?')) return;
  btn.disabled = true;
  try {
    await api.appointments.cancel(id);
    showToast('Appointment cancelled');
    renderApptList();
  } catch { showToast('Could not cancel', 'error'); btn.disabled = false; }
}

function renderBookingForm() {
  const c = document.getElementById('appt-tab-content');
  c.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-title">${t('book_appointment')}</div>
        <div class="form-group">
          <label class="form-label">Doctor</label>
          <select class="form-control" id="bf-doctor" onchange="loadSlotsBooking()">
            <option value="">— Select Doctor —</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-control" id="bf-type">
            <option value="in-person">In-Person Visit</option>
            <option value="telemedicine">Telemedicine</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-control" id="bf-date" min="${getTodayStr()}" value="${getTodayStr()}" onchange="loadSlotsBooking()" />
        </div>
        <div id="bf-slots"></div>
        <div class="form-group">
          <label class="form-label">Reason / Symptoms</label>
          <textarea class="form-control" id="bf-symptoms" rows="3" placeholder="Describe your issue..."></textarea>
        </div>

        <!-- Consultation fee display -->
        <div id="bf-fee-display" style="display:none;" class="mb-2">
          <div style="background:var(--bg);border-radius:10px;padding:14px;display:flex;justify-content:space-between;align-items:center;">
            <span class="font-bold">Consultation Fee:</span>
            <span id="bf-fee-amount" style="font-size:20px;font-weight:800;color:var(--success);">₹0</span>
          </div>
        </div>

        <button class="btn btn-primary btn-full btn-lg" onclick="submitBooking()">
          <i class="fas fa-calendar-check"></i> Confirm & Pay
        </button>
      </div>
      <div class="card">
        <div class="card-title">💡 Tips for Your Visit</div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;margin-top:12px;">
          ${[
      ['📋', 'Bring your previous medical records and prescriptions'],
      ['⏰', 'Arrive 10–15 minutes early for registration'],
      ['💊', 'List all current medications and allergies'],
      ['🩺', 'Note down all your symptoms with duration'],
      ['📞', 'Save the doctor\'s clinic number for queries'],
      ['💳', 'Multiple payment options: UPI, Card, Net Banking']
    ].map(([icon, text]) => `<li style="display:flex;gap:12px;align-items:flex-start;"><span style="font-size:20px;">${icon}</span><span class="text-sm">${text}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  let bfSelectedSlot = '';
  let bfDoctors = {};
  api.doctors.list().then(docs => {
    const sel = document.getElementById('bf-doctor');
    docs.forEach(d => {
      bfDoctors[d.id] = d;
      const o = document.createElement('option');
      o.value = d.id;
      o.textContent = `${d.name} — ${d.specialization} (₹${d.consultation_fee})`;
      sel.appendChild(o);
    });
  });

  window.loadSlotsBooking = async function () {
    const doctorId = document.getElementById('bf-doctor')?.value;
    const date = document.getElementById('bf-date')?.value;
    if (!doctorId || !date) return;
    bfSelectedSlot = '';

    // Show fee
    const doc = bfDoctors[doctorId];
    if (doc) {
      document.getElementById('bf-fee-display').style.display = 'block';
      document.getElementById('bf-fee-amount').textContent = '₹' + doc.consultation_fee;
    }

    const area = document.getElementById('bf-slots');
    area.innerHTML = '<div class="loader"><div class="spinner"></div></div>';
    try {
      const data = await api.appointments.slots(doctorId, date);
      area.innerHTML = `
        <div class="form-label mb-1">Available Slots</div>
        <div class="slot-grid">
          ${data.available_slots.map(s => `<div class="time-slot" onclick="bfSelectSlot(this,'${s}')">${s}</div>`).join('')}
          ${data.booked_slots.map(s => `<div class="time-slot booked">${s}</div>`).join('')}
        </div>`;
      window.bfSelectSlot = (el, slot) => {
        document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
        el.classList.add('selected');
        bfSelectedSlot = slot;
      };
    } catch { area.innerHTML = ''; }
  };

  window.submitBooking = async function () {
    const doctorId = document.getElementById('bf-doctor')?.value;
    const date = document.getElementById('bf-date')?.value;
    const type = document.getElementById('bf-type')?.value;
    const symptoms = document.getElementById('bf-symptoms')?.value;
    if (!doctorId) { showToast('Please select a doctor', 'warning'); return; }
    if (!bfSelectedSlot) { showToast('Please select a time slot', 'warning'); return; }

    const doc = bfDoctors[doctorId];
    const fee = doc ? doc.consultation_fee : 0;

    // Show payment modal
    showPaymentModal(fee, `Consultation with ${doc ? doc.name : 'Doctor'}`, async (paymentMethod) => {
      try {
        await api.appointments.book({
          doctor_id: parseInt(doctorId), appointment_date: date,
          appointment_time: bfSelectedSlot, type, symptoms, patient_id: 1,
          amount: fee, payment_method: paymentMethod, payment_status: 'paid'
        });
        showToast('Appointment booked & paid! 🎉');
        switchApptTab('list');
      } catch { showToast('Booking failed. Try again.', 'error'); }
    });
  };
}
