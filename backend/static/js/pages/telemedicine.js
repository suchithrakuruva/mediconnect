// TELEMEDICINE PAGE
function renderTelemedicine() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">Telemedicine</div>
    <div class="page-subtitle">Consult a doctor from anywhere — bringing specialist care to every corner of India</div>

    <div class="video-card mb-3">
      <div class="video-icon">📹</div>
      <div class="video-title">Video Consultation</div>
      <div class="video-desc">
        Connect face-to-face with qualified doctors without leaving home. Ideal for rural areas — requires only a smartphone and internet connection.
      </div>
      <button class="btn btn-lg" style="background:rgba(255,255,255,0.2);color:#fff;border:2px solid rgba(255,255,255,0.5);" onclick="openConsultModal()">
        <i class="fas fa-video"></i> Start Video Consultation
      </button>
    </div>

    <div class="grid-3 mb-3">
      <div class="card text-center">
        <div style="font-size:36px;margin-bottom:12px;">⚡</div>
        <div class="card-title">Instant Connect</div>
        <div class="text-sm text-muted">Get connected to an available doctor within 15 minutes</div>
      </div>
      <div class="card text-center">
        <div style="font-size:36px;margin-bottom:12px;">🔒</div>
        <div class="card-title">Secure & Private</div>
        <div class="text-sm text-muted">End-to-end encrypted consultations. Your data never shared without consent.</div>
      </div>
      <div class="card text-center">
        <div style="font-size:36px;margin-bottom:12px;">📋</div>
        <div class="card-title">Digital Prescription</div>
        <div class="text-sm text-muted">Receive digital prescriptions and follow-up reminders after your consultation</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">👨‍⚕️ Telemedicine Doctors</div>
        <div class="card-subtitle">Doctors available for video consultation right now</div>
        <div id="tele-doctors"></div>
      </div>
      <div class="card">
        <div class="card-title">📅 Schedule a Consultation</div>
        <div class="form-group mt-2">
          <label class="form-label">Preferred Doctor</label>
          <select class="form-control" id="tele-doctor">
            <option value="">— Any Available Doctor —</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-control" id="tele-date" min="${getTodayStr()}" value="${getTodayStr()}" />
          </div>
          <div class="form-group">
            <label class="form-label">Time</label>
            <select class="form-control" id="tele-time">
              ${['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(t => `<option>${t}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Reason for Consultation</label>
          <textarea class="form-control" id="tele-reason" rows="3" placeholder="Describe your health concern..."></textarea>
        </div>
        <div style="background:var(--bg);border-radius:10px;padding:12px;margin-bottom:16px;font-size:13px;">
          💰 <strong>Consultation Fee:</strong> ₹200–₹800 (based on specialist)<br>
          📞 <strong>Mode:</strong> Video / Audio Call via WhatsApp or Zoom<br>
          ⏱️ <strong>Duration:</strong> 15–30 minutes
        </div>
        <button class="btn btn-primary btn-full" onclick="scheduleTeleconsult()">
          <i class="fas fa-calendar-check"></i> Schedule Consultation
        </button>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-title">🌐 Available in Languages</div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;">
        ${['Hindi 🇮🇳', 'English 🇬🇧', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Malayalam', 'Kannada', 'Punjabi', 'Odia', 'Assamese'].map(l => `<span class="tag primary" style="font-size:13px;padding:6px 14px;">${l}</span>`).join('')}
      </div>
    </div>
  `;

    api.doctors.list({ telemedicine: 'true' }).then(docs => {
        const c = document.getElementById('tele-doctors');
        c.innerHTML = '';
        const sel = document.getElementById('tele-doctor');
        docs.slice(0, 5).forEach(d => {
            const div = document.createElement('div');
            div.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);';
            div.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
            ${d.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div class="font-bold text-sm">${d.name}</div>
            <div class="text-xs text-muted">${d.specialization} • ${d.city}</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
          <span class="badge badge-success">● Available</span>
          <span class="text-xs text-muted">₹${d.consultation_fee}</span>
        </div>
      `;
            c.appendChild(div);
            const o = document.createElement('option');
            o.value = d.id;
            o.textContent = `${d.name} — ${d.specialization}`;
            sel.appendChild(o);
        });
    });
}

function openConsultModal() {
    createModal(
        '📹 Start Instant Video Consultation',
        `<div class="text-center" style="padding:12px 0;">
      <div style="font-size:48px;margin-bottom:16px;">🩺</div>
      <p style="color:var(--text-muted);margin-bottom:20px;">We'll connect you with an available doctor within 15 minutes.</p>
      <div style="background:var(--bg);border-radius:10px;padding:16px;text-align:left;margin-bottom:20px;">
        <div class="text-sm"><strong>Before you connect:</strong></div>
        <ul style="margin-top:8px;padding-left:20px;font-size:13px;color:var(--text-muted);line-height:2;">
          <li>Ensure good lighting and a quiet environment</li>
          <li>Have your medical documents ready if any</li>
          <li>Test your camera and microphone</li>
          <li>Stable internet (minimum 1 Mbps)</li>
        </ul>
      </div>
      <button class="btn btn-primary btn-full" onclick="this.closest('.modal-overlay').remove();showToast('Connecting to doctor... 🔗')">
        <i class="fas fa-video"></i> Connect Now
      </button>
    </div>`,
        ''
    );
}

async function scheduleTeleconsult() {
    const doctorId = document.getElementById('tele-doctor')?.value;
    const date = document.getElementById('tele-date')?.value;
    const time = document.getElementById('tele-time')?.value;
    const reason = document.getElementById('tele-reason')?.value;
    if (!reason) { showToast('Please describe your health concern', 'warning'); return; }
    try {
        await api.appointments.book({
            doctor_id: doctorId ? parseInt(doctorId) : 2,
            appointment_date: date, appointment_time: time,
            type: 'telemedicine', symptoms: reason, patient_id: 1
        });
        showToast('Teleconsultation scheduled! You\'ll get a call confirmation. 📞');
        document.getElementById('tele-reason').value = '';
    } catch { showToast('Scheduling failed. Try again.', 'error'); }
}
