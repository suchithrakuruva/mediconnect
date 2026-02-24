// ANALYTICS PAGE
let analyticsCharts = {};

function renderAnalytics() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Health Analytics</div>
    <div class="page-subtitle">Data-driven disease surveillance and healthcare coverage insights for India</div>

    <div class="stat-grid" id="analytics-stats">
      <div class="loader"><div class="spinner"></div></div>
    </div>

    <div class="grid-2 mt-3">
      <div class="card">
        <div class="card-title">📈 Disease Trends (6 Months)</div>
        <div class="card-subtitle">Monthly reported cases across major diseases</div>
        <div class="chart-container" style="height:280px;"><canvas id="trend-chart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">🗺️ State Healthcare Coverage</div>
        <div class="card-subtitle">Doctors per 1000 population</div>
        <div class="chart-container" style="height:280px;"><canvas id="state-chart"></canvas></div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-title">🔔 Active Disease Alerts</div>
      <div id="alert-list" class="grid-3 mt-2"></div>
    </div>

    <div class="card mt-3">
      <div class="card-title">📊 State-wise Healthcare Data</div>
      <div id="state-table" class="table-wrap mt-2"></div>
    </div>
  `;

    // Destroy old charts
    Object.values(analyticsCharts).forEach(c => c.destroy());
    analyticsCharts = {};

    api.analytics.overview().then(d => {
        const sg = document.getElementById('analytics-stats');
        sg.innerHTML = [
            ['fas fa-user-md', d.total_doctors, 'Total Doctors', 'rgba(10,36,99,0.10)', 'var(--primary)'],
            ['fas fa-hospital', d.total_hospitals, 'Hospitals', 'rgba(42,157,143,0.10)', 'var(--success)'],
            ['fas fa-calendar-check', d.total_appointments, 'Total Appointments', 'rgba(231,111,81,0.10)', 'var(--accent)'],
            ['fas fa-stethoscope', d.total_symptom_checks, 'Symptom Checks', 'rgba(69,123,157,0.10)', 'var(--info)'],
        ].map(([icon, val, label, bg, color]) => `
      <div class="stat-card">
        <div class="stat-icon" style="background:${bg}"><i class="${icon} fa-lg" style="color:${color}"></i></div>
        <div class="stat-info"><h3>${val}</h3><p>${label}</p></div>
      </div>
    `).join('');
    });

    api.analytics.diseaseTrends().then(data => {
        const ctx = document.getElementById('trend-chart')?.getContext('2d');
        if (!ctx) return;
        analyticsCharts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.month),
                datasets: [
                    { label: 'Malaria', data: data.map(d => d.Malaria), borderColor: '#E63946', backgroundColor: 'rgba(230,57,70,0.08)', tension: 0.4, fill: true },
                    { label: 'Dengue', data: data.map(d => d.Dengue), borderColor: '#E76F51', backgroundColor: 'rgba(231,111,81,0.08)', tension: 0.4, fill: true },
                    { label: 'Tuberculosis', data: data.map(d => d.Tuberculosis), borderColor: '#0A2463', backgroundColor: 'rgba(10,36,99,0.08)', tension: 0.4, fill: true },
                    { label: 'Typhoid', data: data.map(d => d.Typhoid), borderColor: '#2A9D8F', backgroundColor: 'rgba(42,157,143,0.08)', tension: 0.4, fill: true },
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
            }
        });
    });

    api.analytics.stateHealth().then(data => {
        const ctx = document.getElementById('state-chart')?.getContext('2d');
        if (!ctx) return;
        const colors = data.map(d => d.doctors_per_1000 > 2 ? '#2A9D8F' : d.doctors_per_1000 > 1 ? '#E9C46A' : '#E63946');
        analyticsCharts.state = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.state),
                datasets: [{ label: 'Doctors per 1000', data: data.map(d => d.doctors_per_1000), backgroundColor: colors, borderRadius: 6 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
            }
        });

        const tableEl = document.getElementById('state-table');
        tableEl.innerHTML = `<table>
      <thead><tr><th>State</th><th>Doctors/1000</th><th>Hospitals</th><th>Coverage</th><th>Assessment</th></tr></thead>
      <tbody>${data.map(s => `
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
          <td><span class="badge ${s.coverage > 70 ? 'badge-success' : s.coverage > 50 ? 'badge-warning' : 'badge-danger'}">${s.coverage > 70 ? '✅ Good' : s.coverage > 50 ? '⚠️ Moderate' : '🔴 Critical'}</span></td>
        </tr>`).join('')}
      </tbody></table>`;
    });

    api.analytics.alerts().then(alerts => {
        const c = document.getElementById('alert-list');
        c.innerHTML = '';
        if (!alerts.length) { c.textContent = 'No active alerts'; return; }
        alerts.forEach(a => c.appendChild(createAlertCard(a)));
    });
}
