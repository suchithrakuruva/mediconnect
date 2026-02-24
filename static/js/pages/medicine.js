// MEDICINE DELIVERY PAGE — with Payment
let cart = {};

function renderMedicine() {
  const el = document.getElementById('page-content');
  el.innerHTML = `
    <div class="page-title">💊 ${t('medicine')}</div>
    <div class="page-subtitle">Order medicines online — delivered to your door across India</div>

    <div class="grid-2" style="gap:24px;">
      <div>
        <div class="filter-bar" style="margin-bottom:16px;">
          <div class="search-wrap" style="flex:2;">
            <i class="fas fa-search search-icon"></i>
            <input class="form-control" id="med-search" placeholder="${t('search')} medicines..." oninput="filterMedicines()" />
          </div>
          <select class="form-control" id="med-cat" onchange="filterMedicines()">
            <option value="">All Categories</option>
          </select>
        </div>
        <div id="medicine-grid" class="medicine-grid">
          <div class="loader"><div class="spinner"></div><span>${t('loading')}</span></div>
        </div>
      </div>

      <div>
        <div class="card" style="position:sticky;top:84px;">
          <div class="card-title"><i class="fas fa-shopping-cart"></i> ${t('cart')} <span id="cart-count" class="badge badge-primary ml-1">0</span></div>
          <div id="cart-items" style="min-height:100px;margin:12px 0;">
            <div class="text-center text-muted" style="padding:24px 0;">
              <div style="font-size:32px;margin-bottom:8px;">🛒</div>Your cart is empty
            </div>
          </div>
          <div class="divider"></div>

          <!-- Bill Summary -->
          <div id="bill-summary" style="display:none;">
            <div class="text-sm font-bold mb-1">Bill Summary</div>
            <div id="bill-items" style="font-size:13px;color:var(--text-muted);"></div>
            <div class="divider" style="margin:10px 0;"></div>
            <div class="flex justify-between" style="font-size:13px;color:var(--text-muted);">
              <span>Subtotal</span><span id="bill-subtotal">₹0</span>
            </div>
            <div class="flex justify-between" style="font-size:13px;color:var(--text-muted);">
              <span>Delivery Fee</span><span id="bill-delivery">₹0</span>
            </div>
            <div class="flex justify-between" style="font-size:13px;color:var(--text-muted);">
              <span>GST (5%)</span><span id="bill-gst">₹0</span>
            </div>
            <div class="divider" style="margin:10px 0;"></div>
          </div>

          <div class="flex justify-between font-bold" style="margin-bottom:12px;font-size:18px;">
            <span>${t('total')}</span>
            <span id="cart-total" style="color:var(--success);">₹0</span>
          </div>

          <div class="form-group">
            <label class="form-label">Delivery Address</label>
            <textarea class="form-control" id="delivery-address" rows="2" placeholder="House/flat no., street, city, PIN..."></textarea>
          </div>

          <!-- Payment buttons -->
          <button class="btn btn-accent btn-full btn-lg" onclick="placeOrder()">
            <i class="fas fa-credit-card"></i> ${t('pay_now')} & ${t('place_order')}
          </button>
          <div class="text-center text-xs text-muted mt-2">🚚 Free delivery on orders above ₹299 · Delivered in 2–4 hours</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:10px;">
            <span class="tag">📱 GPay</span>
            <span class="tag">📲 PhonePe</span>
            <span class="tag">💳 Cards</span>
            <span class="tag">🏛️ NetBanking</span>
          </div>
        </div>
      </div>
    </div>
  `;

  cart = {};
  api.medicine.categories().then(cats => {
    const sel = document.getElementById('med-cat');
    cats.forEach(c => { const o = document.createElement('option'); o.textContent = c; sel.appendChild(o); });
  });
  filterMedicines();
}

let allMeds = [];
function filterMedicines() {
  const search = (document.getElementById('med-search')?.value || '').toLowerCase();
  const cat = document.getElementById('med-cat')?.value || '';
  const params = {};
  if (cat) params.category = cat;
  if (search) params.search = search;

  api.medicine.catalog(params).then(meds => {
    allMeds = meds;
    const grid = document.getElementById('medicine-grid');
    grid.innerHTML = '';
    if (!meds.length) { grid.appendChild(createEmptyState('💊', 'No medicines found', 'Try a different search')); return; }
    meds.forEach(m => {
      const card = document.createElement('div');
      card.className = 'med-card fade-in';
      const catEmojis = { 'Pain Relief': '💊', 'Antibiotic': '🧬', 'Antiallergic': '🌿', 'Diabetes': '🩸', 'BP & Heart': '❤️', 'Gastro': '🫃', 'Vitamins': '🌟', 'Hydration': '💧', 'Antiseptic': '🏥', 'Respiratory': '🫁', 'Oncology': '🔵' };
      card.innerHTML = `
        <div class="med-icon">${catEmojis[m.category] || '💊'}</div>
        <div class="med-name">${m.name}</div>
        <div class="med-category">${m.category}</div>
        <div class="med-price">₹${m.price} <span class="med-unit text-muted" style="font-size:12px;font-weight:400;">/ ${m.unit}</span></div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:8px;">
          <button class="btn btn-primary btn-sm" style="flex:1;" onclick="addToCart(${m.id},'${m.name.replace(/'/g, "\\'")}',${m.price},'${m.unit}')">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>`;
      grid.appendChild(card);
    });
  });
}

function addToCart(id, name, price, unit) {
  if (cart[id]) cart[id].qty++;
  else cart[id] = { id, name, price, unit, qty: 1 };
  updateCart();
  showToast(`${name} added to cart ✅`);
}

function removeFromCart(id) {
  delete cart[id];
  updateCart();
}

function updateCart() {
  const items = document.getElementById('cart-items');
  const subtotal = Object.values(cart).reduce((a, c) => a + c.price * c.qty, 0);
  const count = Object.values(cart).reduce((a, c) => a + c.qty, 0);
  const deliveryFee = subtotal >= 299 ? 0 : 49;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = '₹' + total;

  const billSummary = document.getElementById('bill-summary');

  if (!count) {
    items.innerHTML = `<div class="text-center text-muted" style="padding:24px 0;"><div style="font-size:32px;margin-bottom:8px;">🛒</div>Your cart is empty</div>`;
    if (billSummary) billSummary.style.display = 'none';
    return;
  }

  if (billSummary) {
    billSummary.style.display = 'block';
    document.getElementById('bill-subtotal').textContent = '₹' + subtotal;
    document.getElementById('bill-delivery').textContent = deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee;
    document.getElementById('bill-gst').textContent = '₹' + gst;
    document.getElementById('bill-items').innerHTML = Object.values(cart).map(c =>
      `<div class="flex justify-between"><span>${c.name} × ${c.qty}</span><span>₹${c.price * c.qty}</span></div>`
    ).join('');
  }

  items.innerHTML = '';
  Object.values(cart).forEach(item => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);gap:8px;';
    div.innerHTML = `
      <div style="flex:1;"><div class="text-sm font-bold">${item.name}</div><div class="text-xs text-muted">${item.unit}</div></div>
      <div style="display:flex;align-items:center;gap:6px;">
        <button class="btn-icon" style="font-size:16px;" onclick="changeQty(${item.id},-1)">−</button>
        <span style="font-weight:700;min-width:20px;text-align:center;">${item.qty}</span>
        <button class="btn-icon" style="font-size:16px;" onclick="changeQty(${item.id},1)">+</button>
      </div>
      <div style="font-weight:700;color:var(--success);min-width:50px;text-align:right;">₹${item.price * item.qty}</div>
      <button class="btn-icon" onclick="removeFromCart(${item.id})">🗑️</button>`;
    items.appendChild(div);
  });
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty = Math.max(1, cart[id].qty + delta);
  updateCart();
}

async function placeOrder() {
  if (!Object.keys(cart).length) { showToast('Cart is empty', 'warning'); return; }
  const address = document.getElementById('delivery-address')?.value;
  if (!address) { showToast('Please enter delivery address', 'warning'); return; }

  const subtotal = Object.values(cart).reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryFee = subtotal >= 299 ? 0 : 49;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  showPaymentModal(total, 'Medicine Order', async (paymentMethod) => {
    const medicines = Object.values(cart).map(c => ({ name: c.name, qty: c.qty, price: c.price }));
    try {
      await api.medicine.order({
        medicines, total_amount: total, delivery_address: address,
        patient_id: 1, payment_method: paymentMethod, payment_status: 'paid'
      });
      cart = {};
      updateCart();
      document.getElementById('delivery-address').value = '';
      showToast('🎉 Order placed & paid! Expected delivery in 2–4 hours');
    } catch { showToast('Order failed. Try again.', 'error'); }
  });
}
