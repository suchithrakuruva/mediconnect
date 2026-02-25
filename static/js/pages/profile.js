// PROFILE PAGE
function renderProfile() {
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <div class="page-title">👤 ${t('profile')}</div>
    <div class="page-subtitle">Your personal information, medical history, and transaction records</div>

    <div class="profile-header-card card mb-3">
      <div class="flex items-center gap-3">
        <div class="profile-photo" id="profile-photo">
          <i class="fas fa-user fa-2x"></i>
        </div>
        <div style="flex:1;">
          <h2 id="profile-name" style="font-size:24px;font-weight:800;color:var(--primary);">Loading...</h2>
          <div class="text-muted" id="profile-email">—</div>
          <div class="text-sm mt-1"><span class="badge badge-primary" id="profile-role">Patient</span></div>
          <div class="text-sm text-muted mt-1" id="profile-location">—</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="editProfile()"><i class="fas fa-edit"></i> Edit</button>
      </div>
    </div>

    <div class="grid-4 mb-3" id="profile-stats">
      <div class="stat-card" style="cursor:default;">
        <div class="stat-icon" style="background:rgba(10,36,99,0.08);"><i class="fas fa-venus-mars" style="color:var(--primary)"></i></div>
        <div class="stat-info"><h3 id="p-gender">—</h3><p>Gender</p></div>
      </div>
      <div class="stat-card" style="cursor:default;">
        <div class="stat-icon" style="background:rgba(42,157,143,0.08);"><i class="fas fa-birthday-cake" style="color:var(--success)"></i></div>
        <div class="stat-info"><h3 id="p-age">—</h3><p>Age</p></div>
      </div>
      <div class="stat-card" style="cursor:default;">
        <div class="stat-icon" style="background:rgba(231,111,81,0.08);"><i class="fas fa-ruler-vertical" style="color:var(--accent)"></i></div>
        <div class="stat-info"><h3 id="p-height">—</h3><p>Height (cm)</p></div>
      </div>
      <div class="stat-card" style="cursor:default;">
        <div class="stat-icon" style="background:rgba(233,196,106,0.12);"><i class="fas fa-weight" style="color:#92670a"></i></div>
        <div class="stat-info"><h3 id="p-weight">—</h3><p>Weight (kg)</p></div>
      </div>
    </div>

    <div class="tabs">
      <button class="tab-btn active" id="pt-tab-appt" onclick="switchProfileTab('appt')">📅 Appointments</button>
      <button class="tab-btn" id="pt-tab-txn" onclick="switchProfileTab('txn')">💳 Transactions</button>
      <button class="tab-btn" id="pt-tab-records" onclick="switchProfileTab('records')">📋 Records</button>
    </div>
    <div id="profile-tab-content"></div>
  `;

  api.profile.get().then(u => {
    document.getElementById('profile-name').textContent = u.name || 'User';
    document.getElementById('profile-email').textContent = `${u.email} · ${u.phone}`;
    document.getElementById('profile-location').textContent = `${u.address}, ${u.city}, ${u.state} - ${u.pincode}`;
    document.getElementById('p-gender').textContent = u.gender || '—';
    document.getElementById('p-age').textContent = u.age || '—';
    document.getElementById('p-height').textContent = u.height_cm || '—';
    document.getElementById('p-weight').textContent = u.weight_kg || '—';
    const photo = document.getElementById('profile-photo');
    if (u.name) photo.innerHTML = `<span style="font-size:28px;font-weight:800;">${u.name.charAt(0)}</span>`;
    // Show role from auth
    const roleEl = document.getElementById('profile-role');
    if (roleEl && currentUser) roleEl.textContent = currentUser.role || 'Patient';
  }).catch(() => { });

  switchProfileTab('appt');
}

function switchProfileTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('pt-tab-' + tab)?.classList.add('active');
  const c = document.getElementById('profile-tab-content');
  c.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

  if (tab === 'appt') {
    api.profile.appointments().then(appts => {
      if (!appts.length) { c.innerHTML = ''; c.appendChild(createEmptyState('📅', 'No appointments', 'Book your first appointment')); return; }
      c.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Doctor</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Amount</th></tr></thead><tbody id="prof-appt-tbody"></tbody></table></div>`;
      api.doctors.list().then(docs => {
        const docMap = {};
        docs.forEach(d => docMap[d.id] = d.name);
        const tbody = document.getElementById('prof-appt-tbody');
        appts.forEach(a => {
          const drName = docMap[a.doctor_id] || `Dr. Unknown`;
          tbody.innerHTML += `<tr><td class="font-bold">${drName}</td><td>${formatDate(a.appointment_date)}</td><td>${a.appointment_time}</td><td><span class="badge badge-primary">${a.type}</span></td><td><span class="badge badge-${a.status === 'completed' ? 'success' : a.status === 'cancelled' ? 'danger' : 'info'}">${a.status}</span></td><td>₹${a.amount || 0}</td></tr>`;
        });
      });
    });
  } else if (tab === 'txn') {
    api.profile.transactions().then(txns => {
      if (!txns.length) { c.innerHTML = ''; c.appendChild(createEmptyState('💳', 'No transactions', 'Your payment history will appear here')); return; }
      c.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Type</th><th>Description</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead><tbody>${txns.map(t => `<tr><td><span class="badge badge-primary">${t.type}</span></td><td>${t.description}</td><td class="font-bold text-success">₹${t.amount}</td><td class="text-sm">${t.payment_method}</td><td><span class="badge badge-success">${t.status}</span></td><td class="text-sm text-muted">${formatDate(t.created_at)}</td></tr>`).join('')
        }</tbody></table></div>`;
    });
  } else {
    api.profile.records().then(recs => {
      if (!recs.length) { c.innerHTML = ''; c.appendChild(createEmptyState('📋', 'No records', 'Hospital records will show here')); return; }
      c.innerHTML = recs.map(r => `
              <div class="card fade-in mb-2">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-bold text-primary">${r.hospital_name}</div>
                    <div class="text-sm text-muted">Patient: ${r.name}, Age: ${r.age}</div>
                  </div>
                  <span class="badge badge-${r.status === 'admitted' ? 'warning' : 'success'}">${r.status}</span>
                </div>
                <div class="divider"></div>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center;">
                  <div><div class="text-xs text-muted">Room</div><div class="font-bold">${r.room_number}</div></div>
                  <div><div class="text-xs text-muted">Bed</div><div class="font-bold">${r.bed_number}</div></div>
                  <div><div class="text-xs text-muted">Patient #</div><div class="font-bold">${r.patient_number}</div></div>
                </div>
                <div class="text-sm text-muted mt-1">Diagnosis: ${r.diagnosis} · Admitted: ${r.admission_date}</div>
              </div>
            `).join('');
    });
  }
}

function editProfile() {
  api.profile.get().then(u => {
    const role = currentUser?.role || 'Patient';
    const doctorFields = role === 'Doctor' ? `
          <div class="divider"></div>
          <div class="form-section-title">👨‍⚕️ Doctor Details</div>
          <div class="form-group"><label class="form-label">Specialization</label><input class="form-control" id="ep-spec" value="${u.specialization || ''}" placeholder="e.g. Cardiologist" /></div>
          <div class="form-group"><label class="form-label">Qualification</label><input class="form-control" id="ep-qual" value="${u.qualification || ''}" placeholder="e.g. MBBS, MD" /></div>
          <div class="form-group"><label class="form-label">Hospital/Clinic</label><input class="form-control" id="ep-hospital" value="${u.hospital || ''}" /></div>
          <div class="form-group"><label class="form-label">Experience (years)</label><input class="form-control" id="ep-exp" type="number" value="${u.experience_years || ''}" /></div>
          <div class="form-group"><label class="form-label">Registration No.</label><input class="form-control" id="ep-regnum" value="${u.registration_number || ''}" placeholder="Medical Council Registration" /></div>
        ` : '';
    const patientFields = role === 'Patient' ? `
          <div class="divider"></div>
          <div class="form-section-title">🏥 Medical Information</div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Blood Type</label><select class="form-control" id="ep-blood"><option value="">Select</option>${['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => `<option ${u.blood_type === bt ? 'selected' : ''}>${bt}</option>`).join('')}</select></div>
            <div class="form-group"><label class="form-label">Date of Birth</label><input class="form-control" id="ep-dob" type="date" value="${u.dob || ''}" /></div>
          </div>
          <div class="form-group"><label class="form-label">Known Allergies</label><input class="form-control" id="ep-allergies" value="${u.allergies || ''}" placeholder="e.g. Penicillin, Dust" /></div>
          <div class="form-group"><label class="form-label">Medical Conditions</label><input class="form-control" id="ep-conditions" value="${u.conditions || ''}" placeholder="e.g. Diabetes, Hypertension" /></div>
          <div class="form-group"><label class="form-label">Current Medications</label><input class="form-control" id="ep-medications" value="${u.medications || ''}" placeholder="e.g. Metformin 500mg" /></div>
          <div class="form-group"><label class="form-label">Emergency Contact Name</label><input class="form-control" id="ep-emname" value="${u.emergency_contact_name || ''}" /></div>
          <div class="form-group"><label class="form-label">Emergency Contact Phone</label><input class="form-control" id="ep-emphone" value="${u.emergency_contact_phone || ''}" /></div>
          <div class="form-group"><label class="form-label">Health Insurance ID</label><input class="form-control" id="ep-insurance" value="${u.insurance_id || ''}" placeholder="Ayushman Bharat / Private Insurance" /></div>
        ` : '';
    createModal('✏️ Edit Profile', `
          <div class="form-section-title">👤 Personal Information</div>
          <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" id="ep-name" value="${u.name || ''}" /></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Age</label><input class="form-control" id="ep-age" type="number" value="${u.age || ''}" /></div>
            <div class="form-group"><label class="form-label">Gender</label><select class="form-control" id="ep-gender"><option ${u.gender === 'Male' ? 'selected' : ''}>Male</option><option ${u.gender === 'Female' ? 'selected' : ''}>Female</option><option ${u.gender === 'Other' ? 'selected' : ''}>Other</option></select></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Height (cm)</label><input class="form-control" id="ep-height" type="number" value="${u.height_cm || ''}" /></div>
            <div class="form-group"><label class="form-label">Weight (kg)</label><input class="form-control" id="ep-weight" type="number" value="${u.weight_kg || ''}" /></div>
          </div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="ep-phone" value="${u.phone || ''}" /></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="ep-emiledit" type="email" value="${u.email || ''}" /></div>
          <div class="form-group"><label class="form-label">Address</label><textarea class="form-control" id="ep-address" rows="2">${u.address || ''}</textarea></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">City</label><input class="form-control" id="ep-city" value="${u.city || ''}" /></div>
            <div class="form-group"><label class="form-label">State</label><input class="form-control" id="ep-state" value="${u.state || ''}" /></div>
            <div class="form-group"><label class="form-label">PIN Code</label><input class="form-control" id="ep-pin" value="${u.pincode || ''}" /></div>
          </div>
          ${patientFields}
          ${doctorFields}
          <button class="btn btn-primary btn-full mt-2" onclick="saveProfile()"><i class="fas fa-save"></i> Save Changes</button>
        `);
  });
}

async function saveProfile() {
  const data = {
    name: document.getElementById('ep-name')?.value,
    age: parseInt(document.getElementById('ep-age')?.value) || 0,
    gender: document.getElementById('ep-gender')?.value,
    height_cm: parseFloat(document.getElementById('ep-height')?.value) || 0,
    weight_kg: parseFloat(document.getElementById('ep-weight')?.value) || 0,
    phone: document.getElementById('ep-phone')?.value,
    address: document.getElementById('ep-address')?.value,
    city: document.getElementById('ep-city')?.value,
    pincode: document.getElementById('ep-pin')?.value,
  };
  try {
    await api.profile.update(data);
    document.querySelector('.modal-overlay')?.remove();
    showToast('Profile updated! ✅');
    renderProfile();
  } catch { showToast('Could not update', 'error'); }
}
