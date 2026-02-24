// PATIENT RECORDS PAGE
function renderRecords() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">📋 ${t('records')}</div>
    <div class="page-subtitle">View and manage your hospital admission records</div>

    <div class="grid-2">
      <div>
        <div id="records-list">
          <div class="loader"><div class="spinner"></div></div>
        </div>
      </div>
      <div class="card" style="position:sticky;top:84px;">
        <div class="card-title">➕ Add New Record</div>
        <div class="form-group"><label class="form-label">Patient Name</label><input class="form-control" id="rec-name" /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Age</label><input class="form-control" id="rec-age" type="number" /></div>
          <div class="form-group"><label class="form-label">Patient Number</label><input class="form-control" id="rec-pnum" placeholder="MED-2026-XXX" /></div>
        </div>
        <div class="form-group"><label class="form-label">Hospital Name</label><input class="form-control" id="rec-hosp" /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Room Number</label><input class="form-control" id="rec-room" /></div>
          <div class="form-group"><label class="form-label">Bed Number</label><input class="form-control" id="rec-bed" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Admission Date</label><input class="form-control" id="rec-date" type="date" /></div>
          <div class="form-group"><label class="form-label">Status</label><select class="form-control" id="rec-status"><option>admitted</option><option>discharged</option><option>transferred</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Diagnosis</label><textarea class="form-control" id="rec-diagnosis" rows="2"></textarea></div>
        <button class="btn btn-primary btn-full" onclick="addNewRecord()"><i class="fas fa-plus"></i> Add Record</button>
      </div>
    </div>
  `;
    loadRecords();
}

function loadRecords() {
    api.profile.records().then(recs => {
        const list = document.getElementById('records-list');
        if (!recs.length) { list.innerHTML = ''; list.appendChild(createEmptyState('📋', 'No records yet', 'Add your first patient record')); return; }
        list.innerHTML = recs.map(r => `
          <div class="card fade-in mb-2">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-bold text-primary" style="font-size:16px;">${r.hospital_name}</div>
                <div class="text-sm text-muted">${r.name} · Age: ${r.age}</div>
              </div>
              <span class="badge badge-${r.status === 'admitted' ? 'warning' : r.status === 'discharged' ? 'success' : 'info'}">${r.status}</span>
            </div>
            <div class="divider"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center;">
              <div><div class="text-xs text-muted">Room</div><div class="font-bold text-primary">${r.room_number}</div></div>
              <div><div class="text-xs text-muted">Bed</div><div class="font-bold text-primary">${r.bed_number}</div></div>
              <div><div class="text-xs text-muted">Patient #</div><div class="font-bold text-primary">${r.patient_number}</div></div>
            </div>
            <div class="text-sm text-muted mt-1"><strong>Diagnosis:</strong> ${r.diagnosis || '—'}</div>
            <div class="text-xs text-muted mt-1">Admitted: ${r.admission_date}</div>
          </div>
        `).join('');
    }).catch(() => {
        document.getElementById('records-list').innerHTML = '<div class="alert alert-warning">Could not load records</div>';
    });
}

async function addNewRecord() {
    const data = {
        name: document.getElementById('rec-name')?.value,
        age: parseInt(document.getElementById('rec-age')?.value) || 0,
        hospital_name: document.getElementById('rec-hosp')?.value,
        room_number: document.getElementById('rec-room')?.value,
        bed_number: document.getElementById('rec-bed')?.value,
        patient_number: document.getElementById('rec-pnum')?.value,
        admission_date: document.getElementById('rec-date')?.value,
        status: document.getElementById('rec-status')?.value,
        diagnosis: document.getElementById('rec-diagnosis')?.value,
    };
    if (!data.name || !data.hospital_name) { showToast('Fill required fields', 'warning'); return; }
    try {
        await api.profile.addRecord(data);
        showToast('Record added! ✅');
        loadRecords();
        // Clear form
        ['rec-name', 'rec-age', 'rec-hosp', 'rec-room', 'rec-bed', 'rec-pnum', 'rec-date', 'rec-diagnosis'].forEach(id => {
            const el = document.getElementById(id); if (el) el.value = '';
        });
    } catch { showToast('Could not add record', 'error'); }
}
