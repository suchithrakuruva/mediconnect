// DIET & LIFESTYLE PAGE
function renderDiet() {
    const el = document.getElementById('page-content');
    el.innerHTML = `
    <div class="page-title">🥗 ${t('diet')}</div>
    <div class="page-subtitle">Personalized diet plans and lifestyle recommendations for better health</div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">🍎 Balanced Diet Plan</div>
        <div style="margin-top:12px;">
          ${[
            { meal: 'Breakfast (7-8 AM)', items: 'Idli/Dosa with Sambar, Fresh fruits, Green tea', cal: '350-400 kcal', icon: '🌅' },
            { meal: 'Mid-Morning (10 AM)', items: 'Handful of nuts, Buttermilk/Coconut water', cal: '150 kcal', icon: '🥜' },
            { meal: 'Lunch (12-1 PM)', items: 'Rice/Roti, Dal, Sabzi, Curd, Salad', cal: '500-600 kcal', icon: '🍱' },
            { meal: 'Evening Snack (4 PM)', items: 'Sprouts chaat, Fruit juice, Roasted chana', cal: '200 kcal', icon: '🍹' },
            { meal: 'Dinner (7-8 PM)', items: 'Chapati, Light curry, Vegetable soup', cal: '400-500 kcal', icon: '🥗' },
        ].map(m => `
            <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);align-items:flex-start;">
              <span style="font-size:24px;">${m.icon}</span>
              <div style="flex:1;">
                <div class="font-bold text-sm">${m.meal}</div>
                <div class="text-sm text-muted">${m.items}</div>
              </div>
              <span class="badge badge-success">${m.cal}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">🏃 Lifestyle Habits</div>
        <div style="margin-top:12px;display:flex;flex-direction:column;gap:16px;">
          ${[
            { habit: 'Morning Walk / Yoga', duration: '30-45 min daily', benefit: 'Improves cardiovascular health', icon: '🧘', progress: 75 },
            { habit: 'Stay Hydrated', duration: '8-10 glasses/day', benefit: 'Better digestion & skin health', icon: '💧', progress: 60 },
            { habit: 'Quality Sleep', duration: '7-8 hours nightly', benefit: 'Mental clarity & immunity', icon: '😴', progress: 85 },
            { habit: 'Screen Breaks', duration: 'Every 30 min', benefit: 'Reduces eye strain & posture issues', icon: '👀', progress: 40 },
            { habit: 'Meditation', duration: '15-20 min daily', benefit: 'Reduces stress & anxiety', icon: '🧠', progress: 55 },
        ].map(h => `
            <div>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="font-size:20px;">${h.icon}</span>
                <div style="flex:1;">
                  <div class="font-bold text-sm">${h.habit}</div>
                  <div class="text-xs text-muted">${h.duration} · ${h.benefit}</div>
                </div>
              </div>
              <div class="progress"><div class="progress-bar" style="width:${h.progress}%;background:var(--success);"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="grid-3 mt-3">
      <div class="card text-center">
        <div style="font-size:36px;">🚫</div>
        <div class="card-title mt-1">Foods to Avoid</div>
        <ul style="text-align:left;font-size:13px;color:var(--text-muted);margin-top:12px;padding-left:20px;line-height:2;">
          <li>Excessive sugar & processed foods</li>
          <li>Trans fats & deep-fried items</li>
          <li>Excessive salt (limit to 5g/day)</li>
          <li>Carbonated & sugary drinks</li>
          <li>Alcohol & tobacco</li>
        </ul>
      </div>
      <div class="card text-center">
        <div style="font-size:36px;">✅</div>
        <div class="card-title mt-1">Superfoods of India</div>
        <ul style="text-align:left;font-size:13px;color:var(--text-muted);margin-top:12px;padding-left:20px;line-height:2;">
          <li>Turmeric (Haldi) — Anti-inflammatory</li>
          <li>Moringa (Drumstick) — Nutrient-rich</li>
          <li>Amla — Vitamin C powerhouse</li>
          <li>Millets (Ragi, Jowar) — Diabetic-friendly</li>
          <li>Ashwagandha — Stress relief</li>
        </ul>
      </div>
      <div class="card text-center">
        <div style="font-size:36px;">💪</div>
        <div class="card-title mt-1">Daily Exercise Guide</div>
        <ul style="text-align:left;font-size:13px;color:var(--text-muted);margin-top:12px;padding-left:20px;line-height:2;">
          <li>Surya Namaskar — 12 rounds</li>
          <li>Brisk walking — 30 min</li>
          <li>Pranayama breathing — 15 min</li>
          <li>Stretching exercises — 10 min</li>
          <li>Strength training — 20 min (3x/week)</li>
        </ul>
      </div>
    </div>
  `;
}
