// BLOOD & ORGAN DONOR PAGE
function renderDonors() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">🩸 ${t('donors')}</div>
    <div class="page-subtitle">Find blood donors and organ donors. Register to save lives.</div>

    <div class="tabs">
      <button class="tab-btn active" id="donor-tab-blood" onclick="switchDonorTab('blood')">🩸 Blood Donors</button>
      <button class="tab-btn" id="donor-tab-organ" onclick="switchDonorTab('organ')">🫀 Organ Donors</button>
    </div>

    <div id="donor-content"></div>
  `;
    switchDonorTab('blood');
}

function switchDonorTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('donor-tab-' + tab)?.classList.add('active');
    const c = document.getElementById('donor-content');

    if (tab === 'blood') {
        c.innerHTML = `
          <div class="card mt-2">
            <div class="card-title">Select Blood Type</div>
            <div class="card-subtitle">Click a blood type to see available donors</div>
            <div id="blood-type-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:12px;">
              ${['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => `
                <button class="blood-type-btn" onclick="loadBloodDonors('${bt}', this)">
                  <span class="blood-icon">🩸</span>
                  <span class="blood-label">${bt}</span>
                </button>
              `).join('')}
            </div>
          </div>
          <div id="blood-donors-list" class="mt-2"></div>
          <div class="card mt-2">
            <button class="btn btn-primary btn-full" onclick="showBloodDonorRegForm()">
              <i class="fas fa-plus"></i> Register as Blood Donor
            </button>
          </div>
        `;
    } else {
        c.innerHTML = `
          <div class="card mt-2">
            <div class="card-title">Select Organ Type</div>
            <div class="card-subtitle">Click an organ type to see available donors</div>
            <div id="organ-type-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:12px;">
              ${['Kidney', 'Liver', 'Heart', 'Lung', 'Cornea', 'Bone Marrow', 'Pancreas', 'Intestine'].map(organ => `
                <button class="organ-type-btn" onclick="loadOrganDonors('${organ}', this)">
                  <span style="font-size:24px;">${getOrganEmoji(organ)}</span>
                  <span style="font-size:12px;font-weight:600;">${organ}</span>
                </button>
              `).join('')}
            </div>
          </div>
          <div id="organ-donors-list" class="mt-2"></div>
          <div class="card mt-2">
            <button class="btn btn-primary btn-full" onclick="showOrganDonorRegForm()">
              <i class="fas fa-plus"></i> Register as Organ Donor
            </button>
          </div>
        `;
    }
}

function getOrganEmoji(organ) {
    const map = { Kidney: '🫘', Liver: '🫁', Heart: '🫀', Lung: '🫁', Cornea: '👁️', 'Bone Marrow': '🦴', Pancreas: '🔬', Intestine: '🧬' };
    return map[organ] || '🏥';
}

async function loadBloodDonors(type, btn) {
    document.querySelectorAll('.blood-type-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const list = document.getElementById('blood-donors-list');
    list.innerHTML = '<div class="loader"><div class="spinner"></div></div>';
    try {
        const donors = await api.donors.bloodDonors(type);
        if (!donors.length) { list.innerHTML = '<div class="card text-center text-muted" style="padding:24px;">No donors available for ' + type + '</div>'; return; }
        list.innerHTML = `<div class="card"><div class="card-title">Available ${type} Donors (${donors.length})</div>` +
            donors.map(d => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#E63946,#c1121f);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;">${type}</div>
                  <div>
                    <div class="font-bold text-sm">${d.name}</div>
                    <div class="text-xs text-muted">Age: ${d.age} · ${d.city}, ${d.state}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px;align-items:center;">
                  <span class="badge badge-success">Available</span>
                  <a href="tel:${d.phone}" class="btn btn-sm btn-primary"><i class="fas fa-phone"></i></a>
                </div>
              </div>
            `).join('') + '</div>';
    } catch { list.innerHTML = '<div class="alert alert-warning">Could not load donors</div>'; }
}

async function loadOrganDonors(organ, btn) {
    document.querySelectorAll('.organ-type-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const list = document.getElementById('organ-donors-list');
    list.innerHTML = '<div class="loader"><div class="spinner"></div></div>';
    try {
        const donors = await api.donors.organDonors(organ);
        if (!donors.length) { list.innerHTML = '<div class="card text-center text-muted" style="padding:24px;">No donors available for ' + organ + '</div>'; return; }
        list.innerHTML = `<div class="card"><div class="card-title">Available ${organ} Donors (${donors.length})</div>` +
            donors.map(d => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">${getOrganEmoji(organ)}</div>
                  <div>
                    <div class="font-bold text-sm">${d.name}</div>
                    <div class="text-xs text-muted">Age: ${d.age} · Blood: ${d.blood_type} · ${d.city}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px;align-items:center;">
                  <span class="badge badge-success">Available</span>
                  <a href="tel:${d.phone}" class="btn btn-sm btn-primary"><i class="fas fa-phone"></i></a>
                </div>
              </div>
            `).join('') + '</div>';
    } catch { list.innerHTML = '<div class="alert alert-warning">Could not load donors</div>'; }
}

function showBloodDonorRegForm() {
    createModal('🩸 Register as Blood Donor', `
      <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" id="bd-name" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Age</label><input class="form-control" id="bd-age" type="number" /></div>
        <div class="form-group"><label class="form-label">Blood Type</label><select class="form-control" id="bd-type">${['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(b => `<option>${b}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="bd-phone" type="tel" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">City</label><input class="form-control" id="bd-city" /></div>
        <div class="form-group"><label class="form-label">State</label><input class="form-control" id="bd-state" /></div>
      </div>
      <button class="btn btn-danger btn-full" onclick="registerBloodDonor()"><i class="fas fa-tint"></i> Register</button>
    `);
}

async function registerBloodDonor() {
    try {
        await api.donors.registerBlood({
            name: document.getElementById('bd-name')?.value,
            age: parseInt(document.getElementById('bd-age')?.value),
            blood_type: document.getElementById('bd-type')?.value,
            phone: document.getElementById('bd-phone')?.value,
            city: document.getElementById('bd-city')?.value,
            state: document.getElementById('bd-state')?.value,
        });
        document.querySelector('.modal-overlay')?.remove();
        showToast('Registered as blood donor! 🩸 Thank you!');
    } catch { showToast('Registration failed', 'error'); }
}

function showOrganDonorRegForm() {
    createModal('🫀 Register as Organ Donor', `
      <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" id="od-name" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Age</label><input class="form-control" id="od-age" type="number" /></div>
        <div class="form-group"><label class="form-label">Organ</label><select class="form-control" id="od-organ">${['Kidney', 'Liver', 'Heart', 'Lung', 'Cornea', 'Bone Marrow'].map(o => `<option>${o}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="od-phone" type="tel" /></div>
      <button class="btn btn-primary btn-full" onclick="registerOrganDonor()"><i class="fas fa-heart"></i> Register</button>
    `);
}

async function registerOrganDonor() {
    try {
        await api.donors.registerOrgan({
            name: document.getElementById('od-name')?.value,
            age: parseInt(document.getElementById('od-age')?.value),
            organ: document.getElementById('od-organ')?.value,
            phone: document.getElementById('od-phone')?.value,
        });
        document.querySelector('.modal-overlay')?.remove();
        showToast('Registered as organ donor! 🫀 Thank you!');
    } catch { showToast('Registration failed', 'error'); }
}
