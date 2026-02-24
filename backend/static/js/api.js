// API Client for MediConnect
const API_BASE = '/api';

const api = {
  async get(path) {
    const res = await fetch(API_BASE + path);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async post(path, data) {
    const res = await fetch(API_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async put(path, data) {
    const res = await fetch(API_BASE + path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  doctors: {
    list: (params = {}) => api.get('/doctors/?' + new URLSearchParams(params)),
    get: (id) => api.get('/doctors/' + id),
    specializations: () => api.get('/doctors/specializations'),
    cities: () => api.get('/doctors/cities'),
  },
  hospitals: {
    list: (params = {}) => api.get('/hospitals/?' + new URLSearchParams(params)),
    nearby: (lat, lng) => api.get(`/hospitals/nearby?lat=${lat}&lng=${lng}`),
  },
  appointments: {
    list: (params = {}) => api.get('/appointments/?' + new URLSearchParams(params)),
    book: (data) => api.post('/appointments/', data),
    slots: (doctorId, date) => api.get(`/appointments/slots?doctor_id=${doctorId}&date=${date}`),
    cancel: (id) => api.put('/appointments/' + id, { status: 'cancelled' }),
  },
  symptoms: {
    triage: (symptoms) => api.post('/symptoms/triage', { symptoms }),
    common: () => api.get('/symptoms/common'),
  },
  analytics: {
    overview: () => api.get('/analytics/overview'),
    diseaseTrends: () => api.get('/analytics/disease-trends'),
    stateHealth: () => api.get('/analytics/state-health'),
    alerts: () => api.get('/analytics/alerts'),
  },
  ambulance: {
    request: (data) => api.post('/ambulance/request', data),
    status: (id) => api.get('/ambulance/' + id),
  },
  medicine: {
    catalog: (params = {}) => api.get('/medicine/catalog?' + new URLSearchParams(params)),
    categories: () => api.get('/medicine/categories'),
    order: (data) => api.post('/medicine/order', data),
  },
  donors: {
    bloodTypes: () => api.get('/donors/blood/types'),
    bloodDonors: (type) => api.get('/donors/blood?blood_type=' + encodeURIComponent(type)),
    organTypes: () => api.get('/donors/organs/types'),
    organDonors: (organ) => api.get('/donors/organs?organ=' + encodeURIComponent(organ)),
    registerBlood: (data) => api.post('/donors/blood/register', data),
    registerOrgan: (data) => api.post('/donors/organs/register', data),
  },
  profile: {
    get: () => api.get('/profile/'),
    update: (data) => api.put('/profile/', data),
    transactions: () => api.get('/profile/transactions'),
    appointments: () => api.get('/profile/appointments'),
    records: () => api.get('/profile/records'),
    addRecord: (data) => api.post('/profile/records', data),
  },
  news: {
    list: () => api.get('/news'),
  },
};

// Toast notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.className = `toast ${type !== 'success' ? type : ''}`;
  toast.innerHTML = `<span>${icons[type] || icons.success}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Payment modal helper
function showPaymentModal(amount, description, onSuccess) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:480px;">
      <div class="modal-header">
        <div class="modal-title">💳 ${t('payment')}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div style="background:var(--bg);border-radius:12px;padding:16px;margin-bottom:20px;text-align:center;">
        <div class="text-muted text-sm">${description}</div>
        <div style="font-size:32px;font-weight:800;color:var(--success);margin-top:8px;">₹${amount}</div>
      </div>
      <div class="form-label" style="margin-bottom:12px;">Select Payment Method</div>
      <div style="display:flex;flex-direction:column;gap:10px;" id="payment-methods">
        <button class="payment-method-btn" onclick="selectPayment(this,'upi-gpay')">
          <span style="font-size:20px;">📱</span> <span>Google Pay (UPI)</span>
        </button>
        <button class="payment-method-btn" onclick="selectPayment(this,'upi-phonepe')">
          <span style="font-size:20px;">📲</span> <span>PhonePe (UPI)</span>
        </button>
        <button class="payment-method-btn" onclick="selectPayment(this,'upi-paytm')">
          <span style="font-size:20px;">💰</span> <span>Paytm (UPI)</span>
        </button>
        <button class="payment-method-btn" onclick="selectPayment(this,'upi-bhim')">
          <span style="font-size:20px;">🏦</span> <span>BHIM UPI</span>
        </button>
        <button class="payment-method-btn" onclick="selectPayment(this,'credit-card')">
          <span style="font-size:20px;">💳</span> <span>Credit / Debit Card</span>
        </button>
        <button class="payment-method-btn" onclick="selectPayment(this,'netbanking')">
          <span style="font-size:20px;">🏛️</span> <span>Net Banking</span>
        </button>
      </div>
      <div id="payment-form-area" style="margin-top:16px;"></div>
      <button class="btn btn-primary btn-full btn-lg mt-2" id="pay-confirm-btn" onclick="processPayment()" style="display:none;">
        <i class="fas fa-lock"></i> ${t('pay_now')} — ₹${amount}
      </button>
      <div class="text-center text-xs text-muted mt-2"><i class="fas fa-lock"></i> Secured with 256-bit SSL encryption</div>
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);

  window._paymentAmount = amount;
  window._paymentCallback = onSuccess;
  window._selectedPayment = '';
}

function selectPayment(btn, method) {
  document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  window._selectedPayment = method;
  document.getElementById('pay-confirm-btn').style.display = 'flex';

  const area = document.getElementById('payment-form-area');
  if (method === 'credit-card') {
    area.innerHTML = `
      <div class="form-group"><label class="form-label">Card Number</label>
        <input class="form-control" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Expiry</label>
          <input class="form-control" placeholder="MM/YY" maxlength="5" /></div>
        <div class="form-group"><label class="form-label">CVV</label>
          <input class="form-control" placeholder="***" maxlength="3" type="password" /></div>
      </div>`;
  } else if (method.startsWith('upi')) {
    const appNames = { 'upi-gpay': 'Google Pay', 'upi-phonepe': 'PhonePe', 'upi-paytm': 'Paytm', 'upi-bhim': 'BHIM' };
    area.innerHTML = `
      <div class="form-group"><label class="form-label">UPI ID</label>
        <input class="form-control" id="upi-id" placeholder="yourname@${method.replace('upi-', '')}" /></div>
      <div class="text-center text-sm text-muted">Or scan QR code in ${appNames[method]} app</div>`;
  } else {
    area.innerHTML = `
      <div class="form-group"><label class="form-label">Select Bank</label>
        <select class="form-control">
          <option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option>
          <option>Axis Bank</option><option>Punjab National Bank</option><option>Bank of Baroda</option>
        </select></div>`;
  }
}

function processPayment() {
  if (!window._selectedPayment) { showToast('Select a payment method', 'warning'); return; }
  const btn = document.getElementById('pay-confirm-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  btn.disabled = true;

  setTimeout(() => {
    showToast(`Payment of ₹${window._paymentAmount} successful! 🎉`);
    document.querySelector('.modal-overlay')?.remove();
    if (window._paymentCallback) window._paymentCallback(window._selectedPayment);
  }, 1500);
}
