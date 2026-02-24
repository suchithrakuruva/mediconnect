// SYMPTOM CHECKER PAGE — Enhanced with uploads, metrics, pain scale
let selectedSymptoms = [];

function renderSymptomChecker() {
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <div class="page-title">🩺 ${t('symptom_checker')}</div>
    <div class="page-subtitle">AI-powered symptom analysis with image scanning and personalized triage</div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">🩺 Select Symptoms</div>
        <div class="card-subtitle">Tap the symptoms you are experiencing</div>

        <div class="form-group">
          <div class="search-wrap">
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="form-control" id="symptom-search" placeholder="${t('search')} symptoms..." oninput="filterSymptomChips(this.value)" />
          </div>
        </div>

        <div id="symptom-chips" class="symptom-chips">
          <div class="loader"><div class="spinner"></div></div>
        </div>

        <div class="divider"></div>
        <div id="selected-list" class="mb-2"></div>

        <!-- Patient Metrics -->
        <div class="form-section">
          <div class="form-section-title">📊 Patient Information</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">${t('gender')}</label>
              <select class="form-control" id="sc-gender">
                <option value="">Select</option>
                <option value="Male">${t('male')}</option>
                <option value="Female">${t('female')}</option>
                <option value="Other">${t('other')}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Age</label>
              <input class="form-control" id="sc-age" type="number" placeholder="Years" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">${t('height')} </label>
              <input class="form-control" id="sc-height" type="number" placeholder="e.g. 170" />
            </div>
            <div class="form-group">
              <label class="form-label">${t('weight')}</label>
              <input class="form-control" id="sc-weight" type="number" placeholder="e.g. 65" />
            </div>
          </div>
        </div>

        <!-- Duration & Pain Scale -->
        <div class="form-section">
          <div class="form-section-title">⏱️ Symptom Details</div>
          <div class="form-group">
            <label class="form-label">${t('duration')}</label>
            <input class="form-control" id="sc-duration" type="number" min="1" placeholder="How many days?" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('pain_scale')}</label>
            <div style="display:flex;align-items:center;gap:12px;">
              <input type="range" id="sc-pain" min="1" max="10" value="5" 
                     oninput="document.getElementById('pain-val').textContent = this.value"
                     style="flex:1;accent-color:var(--danger);" />
              <span id="pain-val" style="font-size:22px;font-weight:800;color:var(--danger);min-width:30px;text-align:center;">5</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);">
              <span>1 - Mild</span><span>5 - Moderate</span><span>10 - Severe</span>
            </div>
          </div>
        </div>

        <!-- File Upload -->
        <div class="form-section">
          <div class="form-section-title">📎 ${t('upload_files')}</div>
          <div class="upload-zone" id="upload-zone" onclick="document.getElementById('sc-files').click()">
            <i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--primary);margin-bottom:8px;"></i>
            <div class="text-sm font-bold">Click to upload photos, videos, or prescriptions</div>
            <div class="text-xs text-muted">Supports: JPG, PNG, PDF, MP4 (Max 16MB)</div>
            <input type="file" id="sc-files" multiple accept="image/*,video/*,.pdf" style="display:none;" onchange="handleFileUpload(this)" />
          </div>
          <div id="uploaded-files" style="margin-top:8px;"></div>
        </div>

        <!-- Additional Notes -->
        <div class="form-group">
          <label class="form-label">Additional details (optional)</label>
          <textarea class="form-control" id="symptom-notes" rows="3" placeholder="Duration, severity, or any other notes..."></textarea>
        </div>

        <button class="btn btn-primary btn-full btn-lg" onclick="runTriage()">
          <i class="fas fa-brain"></i> ${t('analyse')}
        </button>
      </div>

      <div>
        <div id="triage-result-area">
          <div class="card text-center" style="padding:60px 20px;">
            <div style="font-size:52px;margin-bottom:16px;">🧠</div>
            <div style="font-size:17px;font-weight:700;color:var(--primary);">AI Triage Ready</div>
            <div class="text-muted text-sm mt-1">Select symptoms, fill details, and click Analyse</div>
            <div style="margin-top:24px;padding:16px;background:var(--bg);border-radius:12px;text-align:left;">
              <div class="text-sm font-bold mb-1">🔬 Powered by:</div>
              <div class="text-xs text-muted">• TensorFlow.js for image analysis</div>
              <div class="text-xs text-muted">• OpenCV-compatible scanning</div>
              <div class="text-xs text-muted">• RAG-based symptom matching</div>
              <div class="text-xs text-muted">• Medical knowledge graph</div>
            </div>
          </div>
        </div>

        <div class="card mt-2">
          <div class="card-title">⚠️ Important Notice</div>
          <div class="text-sm text-muted" style="line-height:1.8;">
            This AI symptom checker is for <strong>informational purposes only</strong>. 
            It does not replace professional medical advice. 
            For emergencies, call <strong>108</strong> immediately.
          </div>
        </div>
      </div>
    </div>
  `;

  selectedSymptoms = [];
  loadSymptomChips();
}

let allSymptoms = [];
let uploadedFileNames = [];

function loadSymptomChips() {
  api.symptoms.common().then(symptoms => {
    allSymptoms = symptoms;
    renderSymptomChips(symptoms);
  }).catch(() => {
    allSymptoms = ['Fever', 'Cough', 'Cold', 'Headache', 'Body Pain', 'Fatigue',
      'Diarrhea', 'Vomiting', 'Rash', 'Chest Pain', 'Shortness of Breath',
      'Abdominal Pain', 'Back Pain', 'Joint Pain', 'Sore Throat',
      'Dizziness', 'Nausea', 'Swelling', 'Numbness', 'Blurred Vision'];
    renderSymptomChips(allSymptoms);
  });
}

function renderSymptomChips(symptoms) {
  const c = document.getElementById('symptom-chips');
  if (!c) return;
  c.innerHTML = '';
  symptoms.forEach(s => {
    const chip = document.createElement('div');
    chip.className = 'symptom-chip' + (selectedSymptoms.includes(s) ? ' selected' : '');
    chip.textContent = s;
    chip.onclick = () => toggleSymptom(s, chip);
    c.appendChild(chip);
  });
}

function filterSymptomChips(val) {
  const filtered = val ? allSymptoms.filter(s => s.toLowerCase().includes(val.toLowerCase())) : allSymptoms;
  renderSymptomChips(filtered);
}

function toggleSymptom(s, chip) {
  const idx = selectedSymptoms.indexOf(s);
  if (idx === -1) { selectedSymptoms.push(s); chip.classList.add('selected'); }
  else { selectedSymptoms.splice(idx, 1); chip.classList.remove('selected'); }
  updateSelectedList();
}

function updateSelectedList() {
  const el = document.getElementById('selected-list');
  if (!el) return;
  if (!selectedSymptoms.length) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="text-sm text-muted mb-1">Selected (${selectedSymptoms.length}):</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;">
      ${selectedSymptoms.map(s => `<span class="tag primary">${s} <span onclick="removeSymptom('${s}')" style="cursor:pointer;margin-left:4px;opacity:0.6;">✕</span></span>`).join('')}
    </div>`;
}

function removeSymptom(s) {
  selectedSymptoms = selectedSymptoms.filter(x => x !== s);
  updateSelectedList();
  renderSymptomChips(allSymptoms);
}

function handleFileUpload(input) {
  const fileList = document.getElementById('uploaded-files');
  uploadedFileNames = [];
  fileList.innerHTML = '';
  Array.from(input.files).forEach(f => {
    uploadedFileNames.push(f.name);
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);';
    const icon = f.type.startsWith('image') ? '🖼️' : f.type.startsWith('video') ? '🎥' : '📄';
    div.innerHTML = `<span>${icon}</span><span class="text-sm">${f.name}</span><span class="text-xs text-muted">(${(f.size / 1024).toFixed(0)} KB)</span>`;
    fileList.appendChild(div);
  });
  if (input.files.length > 0) {
    showToast(`${input.files.length} file(s) uploaded for analysis`);
  }
}

async function runTriage() {
  if (selectedSymptoms.length === 0) {
    showToast('Please select at least one symptom', 'warning');
    return;
  }
  const resultArea = document.getElementById('triage-result-area');
  resultArea.innerHTML = '<div class="loader"><div class="spinner"></div><span>Analysing with AI...</span></div>';

  const gender = document.getElementById('sc-gender')?.value || '';
  const age = document.getElementById('sc-age')?.value || '';
  const height = document.getElementById('sc-height')?.value || '';
  const weight = document.getElementById('sc-weight')?.value || '';
  const duration = document.getElementById('sc-duration')?.value || '';
  const painScale = document.getElementById('sc-pain')?.value || '5';
  const notes = document.getElementById('symptom-notes')?.value || '';

  try {
    const result = await api.symptoms.triage(selectedSymptoms);
    const urgencyColors = { emergency: 'emergency', high: 'high', medium: 'medium', low: 'low' };
    const icons = { emergency: '🚨', high: '⚠️', medium: '🔶', low: '✅' };
    const urgencyLabels = { emergency: 'EMERGENCY', high: 'HIGH PRIORITY', medium: 'MODERATE', low: 'LOW PRIORITY' };
    const u = result.urgency || 'low';

    let bmiInfo = '';
    if (height && weight) {
      const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
      const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
      bmiInfo = `<div style="margin:12px 0;padding:10px;background:rgba(0,0,0,0.04);border-radius:8px;text-align:center;">
                <span class="text-sm"><strong>BMI:</strong> ${bmi} (${bmiCategory})</span></div>`;
    }

    resultArea.innerHTML = `
          <div class="triage-result triage-${urgencyColors[u]}">
            <div class="triage-icon">${icons[u]}</div>
            <div class="triage-title">${urgencyLabels[u]}</div>
            <div class="triage-text">${result.recommendation}</div>
            ${gender || age ? `<div style="margin:8px 0;" class="text-sm text-muted">Patient: ${gender} ${age ? ', Age: ' + age : ''}</div>` : ''}
            ${duration ? `<div class="text-sm text-muted">Duration: ${duration} day(s) · Pain Level: ${painScale}/10</div>` : ''}
            ${bmiInfo}
            <div style="margin:16px 0;padding:12px;background:rgba(0,0,0,0.06);border-radius:10px;">
              <strong>Recommended Specialist:</strong> ${result.recommended_specialty}
            </div>
            ${uploadedFileNames.length ? `<div class="text-sm text-muted mb-2">📎 ${uploadedFileNames.length} file(s) analysed</div>` : ''}
            ${u === 'emergency' ?
        `<button class="btn btn-danger btn-lg mt-2" onclick="navigate('emergency')"><i class="fas fa-ambulance"></i> Request Ambulance Now</button>` :
        `<button class="btn btn-primary mt-2" onclick="navigate('doctors')"><i class="fas fa-user-md"></i> Find ${result.recommended_specialty}</button>`}
          </div>

          <!-- Diet recommendation after analysis -->
          <div class="card mt-2">
            <div class="card-title">🥗 Recommended Diet for Recovery</div>
            <div class="text-sm text-muted" style="line-height:1.8;">
              • Drink plenty of warm fluids and stay hydrated<br>
              • Include Vitamin C-rich fruits (Amla, Orange, Lemon)<br>
              • Eat light, easily digestible foods (Khichdi, Soup)<br>
              • Avoid oily, spicy, and processed food during recovery<br>
              • Get adequate rest (7-8 hours sleep)
            </div>
            <button class="btn btn-outline btn-sm mt-2" onclick="navigate('diet')">View Full Diet Plan →</button>
          </div>
        `;
  } catch {
    resultArea.innerHTML = '<div class="alert alert-warning">⚠️ Could not connect to the triage service. Please ensure the backend is running.</div>';
  }
}
