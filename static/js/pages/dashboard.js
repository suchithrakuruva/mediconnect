// DASHBOARD PAGE
function renderDashboard() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Dashboard</div>
    <div class="page-subtitle">Your health overview at a glance</div>

    <div class="stat-grid" id="dash-stats">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(10,36,99,0.10)"><i class="fas fa-user-md fa-lg" style="color:var(--primary)"></i></div>
        <div class="stat-info"><h3 id="d-doctors">—</h3><p>Total Doctors</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(42,157,143,0.10)"><i class="fas fa-hospital fa-lg" style="color:var(--success)"></i></div>
        <div class="stat-info"><h3 id="d-hospitals">—</h3><p>Hospitals</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(231,111,81,0.10)"><i class="fas fa-calendar-check fa-lg" style="color:var(--accent)"></i></div>
        <div class="stat-info"><h3 id="d-appts">—</h3><p>Total Appointments</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(69,123,157,0.10)"><i class="fas fa-stethoscope fa-lg" style="color:var(--info)"></i></div>
        <div class="stat-info"><h3 id="d-trigs">—</h3><p>Symptom Checks</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(231,111,81,0.10)"><i class="fas fa-video fa-lg" style="color:var(--accent)"></i></div>
        <div class="stat-info"><h3 id="d-tele">—</h3><p>Telemedicine Doctors</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(230,57,70,0.10)"><i class="fas fa-ambulance fa-lg" style="color:var(--danger)"></i></div>
        <div class="stat-info"><h3 id="d-alerts">—</h3><p>Active Alerts</p></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">Quick Actions</div>
        <div class="card-subtitle">Go to key features quickly</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <button class="btn btn-primary" onclick="navigate('symptom-checker')"><i class="fas fa-stethoscope"></i> Check Symptoms</button>
          <button class="btn btn-accent" onclick="navigate('ambulance')"><i class="fas fa-ambulance"></i> Emergency</button>
          <button class="btn btn-success" onclick="navigate('appointments')"><i class="fas fa-calendar-plus"></i> Book Appointment</button>
          <button class="btn btn-outline" onclick="navigate('doctors')"><i class="fas fa-user-md"></i> Find Doctor</button>
          <button class="btn btn-outline" onclick="navigate('hospitals')"><i class="fas fa-hospital"></i> Hospitals</button>
          <button class="btn btn-outline" onclick="navigate('medicine')"><i class="fas fa-pills"></i> Order Medicine</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🔔 Health Alerts</div>
        <div id="dash-alerts"><div class="loader"><div class="spinner"></div></div></div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-title">State Healthcare Coverage</div>
      <div class="card-subtitle">Doctors per 1000 population by state</div>
      <div id="dash-coverage-table"></div>
    </div>
  `;

    api.analytics.overview().then(d => {
        document.getElementById('d-doctors').textContent = d.total_doctors;
        document.getElementById('d-hospitals').textContent = d.total_hospitals;
        document.getElementById('d-appts').textContent = d.total_appointments;
        document.getElementById('d-trigs').textContent = d.total_symptom_checks;
        document.getElementById('d-tele').textContent = d.telemedicine_doctors;
        document.getElementById('d-alerts').textContent = d.active_alerts;
    }).catch(() => { });

    api.analytics.alerts().then(alerts => {
        const c = document.getElementById('dash-alerts');
        c.innerHTML = '';
        alerts.slice(0, 4).forEach(a => {
            const row = document.createElement('div');
            row.style.cssText = 'padding:10px 0;border-bottom:1px solid var(--border);';
            const colors = { high: 'danger', medium: 'warning', low: 'success' };
            row.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="font-bold text-sm">${a.title}</div>
          <span class="badge badge-${colors[a.severity]}">${a.severity}</span>
        </div>
        <div class="text-xs text-muted">${a.city}, ${a.state} • ${a.cases} cases</div>
      `;
            c.appendChild(row);
        });
    });

    api.analytics.stateHealth().then(data => {
        const t = document.getElementById('dash-coverage-table');
        t.innerHTML = `
      <div class="table-wrap">
      <table>
        <thead><tr><th>State</th><th>Doctors/1000</th><th>Hospitals</th><th>Coverage %</th><th>Status</th></tr></thead>
        <tbody>
          ${data.map(s => `
            <tr>
              <td class="font-bold">${s.state}</td>
              <td>${s.doctors_per_1000}</td>
              <td>${s.hospitals.toLocaleString()}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="progress" style="width:80px;"><div class="progress-bar" style="width:${s.coverage}%;background:${s.coverage > 70 ? 'var(--success)' : s.coverage > 50 ? 'var(--warning)' : 'var(--danger)'}"></div></div>
                  ${s.coverage}%
                </div>
              </td>
              <td><span class="badge ${s.coverage > 70 ? 'badge-success' : s.coverage > 50 ? 'badge-warning' : 'badge-danger'}">${s.coverage > 70 ? 'Good' : s.coverage > 50 ? 'Moderate' : 'Critical'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
    `;
    });
}
