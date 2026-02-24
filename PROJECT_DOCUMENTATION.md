# MediConnect — AI for Equitable Healthcare 🇮🇳
## Complete Project Documentation

---

## 1. PROJECT OVERVIEW

**MediConnect** is a full-stack AI-powered healthcare management system designed to bridge India's urban-rural healthcare gaps. It connects patients with doctors, hospitals, emergency services, and medicines through a modern web platform — accessible from Kanyakumari to Kashmir.

- **Tagline:** "AI for Equitable Healthcare"
- **Affiliation:** KMC (Karnataka Medical Council)
- **Target Users:** Patients, Doctors, Healthcare Workers, Rural Communities
- **Deployment:** GitHub Pages (Static) + Flask Backend (Local)

---

## 2. TECHNOLOGY STACK

### 2.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | 5 | Page structure, semantic elements, SEO tags |
| **CSS3** | 3 | Styling, animations, responsive design, glassmorphism |
| **Vanilla JavaScript (ES6+)** | ES2020 | Application logic, SPA routing, DOM manipulation |
| **Leaflet.js** | 1.9.4 | Interactive maps for hospital locations & ambulance tracking |
| **Chart.js** | 4.4.0 | Data visualization — disease trends, health analytics |
| **Font Awesome** | 6.4.2 | 1000+ medical & UI icons throughout the interface |
| **Google Fonts** | — | Inter (UI text), Playfair Display (branding), Noto Sans Devanagari (Hindi) |

### 2.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.14 | Backend programming language |
| **Flask** | 3.x | Lightweight web framework for REST API |
| **Flask-SQLAlchemy** | 3.x | ORM (Object-Relational Mapping) for database operations |
| **Flask-CORS** | 4.x | Cross-Origin Resource Sharing for API access |
| **SQLite** | 3 | Lightweight relational database (file-based, no server needed) |
| **Werkzeug** | 3.x | Password hashing (generate_password_hash / check_password_hash) |
| **PyJWT** | 2.x | JSON Web Token authentication |

### 2.3 Deployment & DevOps

| Tool | Purpose |
|------|---------|
| **GitHub Pages** | Free static site hosting (frontend) |
| **Git** | Version control system |
| **GitHub** | Code repository hosting |

### 2.4 Design System

| Aspect | Details |
|--------|---------|
| **Color Palette** | Primary: #0A2463 (Navy), Success: #2A9D8F (Teal), Accent: #E76F51 (Coral), Warning: #E9C46A (Gold) |
| **Typography** | Inter (body), Playfair Display (headings), Noto Sans Devanagari (Hindi text) |
| **Layout** | CSS Grid + Flexbox, responsive with media queries |
| **Animations** | CSS transitions, keyframe animations, Canvas API for hero particles |
| **Approach** | Mobile-first responsive design, dark sidebar, light content area |

---

## 3. ARCHITECTURE

### 3.1 Frontend Architecture (SPA — Single Page Application)

```
index.html (Entry Point)
├── static/css/main.css          → Design system + all component styles
├── static/js/
│   ├── api.js                   → Mock API layer (embedded data for GitHub Pages)
│   ├── app.js                   → SPA Router, layout builder, navigation handler
│   ├── i18n.js                  → Internationalization (22 languages)
│   ├── components.js            → Reusable UI components (cards, modals, stars)
│   ├── chatbot.js               → AI chatbot widget (RAG-powered)
│   └── pages/
│       ├── home.js              → Homepage with hero, stats, news, reviews, alerts
│       ├── dashboard.js         → Dashboard overview
│       ├── symptom-checker.js   → AI symptom triage with file uploads
│       ├── doctors.js           → Doctor search & filtering
│       ├── hospitals.js         → Hospital directory
│       ├── appointments.js      → Appointment booking with payments
│       ├── telemedicine.js      → Video consultation scheduling
│       ├── analytics.js         → Health analytics with charts
│       ├── medicine.js          → Medicine ordering with cart & billing
│       ├── emergency.js         → Emergency map + ambulance booking
│       ├── education.js         → Health education articles
│       ├── profile.js           → User profile management
│       ├── donors.js            → Blood & organ donor registry
│       ├── diet.js              → Diet & lifestyle recommendations
│       └── records.js           → Patient admission records
```

### 3.2 Backend Architecture (REST API)

```
backend/
├── app.py                       → Flask app factory, blueprint registration
├── config.py                    → Configuration (SECRET_KEY, DATABASE_URI)
├── models.py                    → SQLAlchemy ORM models (12 database tables)
├── seed_data.py                 → Database seeding with demo data
├── requirements.txt             → Python dependencies
├── templates/index.html         → Frontend served by Flask
├── static/                      → CSS + JS (same as frontend)
└── routes/
    ├── auth.py                  → User registration, login, JWT authentication
    ├── patients.py              → Patient CRUD operations
    ├── doctors.py               → Doctor search with filtering
    ├── hospitals.py             → Hospital search, nearby hospitals
    ├── appointments.py          → Booking, slots, cancellation
    ├── symptoms.py              → AI symptom triage engine
    ├── analytics.py             → Health analytics, disease trends
    ├── ambulance.py             → Ambulance dispatch & tracking
    ├── medicine.py              → Medicine catalog & ordering
    ├── donors.py                → Blood & organ donor management
    ├── profile.py               → User profile & history
    └── chatbot.py               → RAG-based AI chatbot
```

### 3.3 Database Schema (12 Tables)

| Table | Description | Key Fields |
|-------|-------------|------------|
| `users` | User accounts | name, email, password_hash, role, age, gender, height, weight |
| `patients` | Patient medical profiles | blood_group, allergies, medical_history, emergency_contact |
| `doctors` | Doctor directory (15 doctors) | name, specialization, city, rating, fee, telemedicine, languages |
| `hospitals` | Hospital directory (12 hospitals) | name, type, beds, ICU, lat/lng, facilities, emergency |
| `appointments` | Booked appointments | doctor_id, date, time, status, payment_method, amount |
| `symptom_logs` | Symptom check history | symptoms, triage_result, specialty, pain_scale, duration |
| `medicine_orders` | Medicine orders | medicines (JSON), total_amount, delivery_address, status |
| `ambulance_requests` | Ambulance dispatches | pickup_address, lat/lng, ambulance_number, ETA, status |
| `health_alerts` | Disease surveillance | disease, state, city, severity, cases |
| `blood_donors` | Blood donor registry (14 donors) | name, blood_type, phone, city, available |
| `organ_donors` | Organ donor registry (10 donors) | name, organ, blood_type, phone, available |
| `patient_records` | Hospital admission records | hospital, room, bed, patient_number, diagnosis, status |
| `transactions` | Payment history | type, amount, payment_method, status, description |
| `chat_messages` | Chatbot conversation history | message, response, timestamp |

---

## 4. FEATURES (DETAILED)

### 4.1 🏠 Homepage
- **Animated Hero Banner** with floating medical emoji particles (Canvas API animation)
- **MediConnect** branding in Playfair Display font with "Affiliated by KMC"
- **Live Statistics Cards** — Doctors count, Hospitals count, Appointments today, Telemedicine doctors
- **6 Feature Cards** — Quick navigation to main features
- **📰 Latest Medical News** — 6 curated health news articles (WHO, ICMR, NIMHANS sources)
- **⭐ User Reviews Slider** — 7 auto-sliding testimonials with dot navigation (4-second interval)
- **🔔 Active Health Alerts** — Real-time disease surveillance with severity badges (HIGH/MEDIUM/LOW)
- **Global Footer** — About, Quick Links, Contact, Social Media (Facebook, Twitter, Instagram, LinkedIn, YouTube), Legal compliance text

### 4.2 🩺 AI Symptom Checker
- **Symptom Selection** — 26 common symptoms (Fever, Cough, Chest Pain, etc.)
- **Patient Metrics** — Gender, Age, Height (cm), Weight (kg) input fields
- **Duration Tracking** — How many days the symptoms have persisted
- **Pain Scale** — Interactive 1-10 slider
- **File Upload** — Photos, videos, prescriptions (JPG, PNG, PDF, MP4)
- **AI Triage Engine** — Rule-based triage with 4 urgency levels:
  - 🔴 **Emergency** — "Call 108 immediately" (chest pain, stroke, seizure, etc.)
  - 🟠 **High** — "Seek attention within 24 hours" (high fever, jaundice, etc.)
  - 🟡 **Medium** — "Visit doctor in 2-3 days" (fever, cough, headache, etc.)
  - 🟢 **Low** — "Rest and monitor" (fatigue, mild cough, insomnia, etc.)
- **Specialty Mapping** — Maps symptoms to 15+ specialties (Cardiologist, Dermatologist, Neurologist, etc.)
- **BMI Calculation** — Automatic BMI from height/weight with health category
- **Diet Recommendations** — Post-analysis recovery diet suggestions

### 4.3 👨‍⚕️ Find Doctors
- **15 Specialist Doctors** across all Indian states
- **Filters** — Specialization, City, Language, Telemedicine availability
- **Doctor Cards** — Name, specialization, hospital, experience, rating (stars), consultation fee
- **Language Tags** — Shows languages each doctor speaks (Hindi, English, Malayalam, Tamil, etc.)
- **Telemedicine Badge** — Indicates video consultation availability
- **Book Appointment** button on each card

### 4.4 🚨 Emergency & Hospitals (Merged Page)
- **Left Side — Live Interactive Map** (Leaflet.js)
  - 12 hospital markers across India with custom icons
  - Click marker → popup with: Hospital name, Rating (stars), Available time, Transport ETA, Ambulance ETA
  - **"📞 Dial Hospital"** button in popup
  - **"🚑 Book Ambulance"** button in popup
- **Right Side — Emergency Panel**
  - GPS location detection (Geolocation API)
  - Manual address input
  - **Emergency Hotlines** — 108 (Ambulance), 101 (Fire), 100 (Police), 1800-180-1104 (Health), 08046110007 (Mental Health), 1098 (Child Helpline), 181 (Women Helpline)
  - **Ambulance Booking Form** — Name, phone, emergency type, address
  - **Live ETA Tracking** after dispatch

### 4.5 📅 Appointments
- **Doctor Selection** with specialization filter
- **Date & Time Slot** picker (13 slots: 09:00-17:00 in 30-min intervals)
- **Type Selection** — In-person or Telemedicine
- **💳 Payment Integration** before booking:
  - **UPI** — GPay, PhonePe, Paytm, BHIM (UPI ID input)
  - **Credit/Debit Card** — Card number, Expiry, CVV fields
  - **Net Banking** — SBI, HDFC, ICICI, PNB, BOB, Axis dropdown
  - 🔒 "256-bit SSL Encrypted · PCI DSS Compliant" badge
- **Appointment History** in profile

### 4.6 📱 Telemedicine
- **Instant Connect** — Quick video consultation
- **Scheduled Consultation** — Book future video call
- **Telemedicine-enabled doctors** filter (12 out of 15 doctors)
- Video consultation via browser (WebRTC ready)

### 4.7 📊 Health Analytics
- **Overview Cards** — Total doctors, hospitals, appointments, symptom checks
- **Disease Trends Chart** (Chart.js line chart) — Malaria, Dengue, TB, Typhoid over 6 months
- **State Health Data** (Chart.js bar chart) — 8 states with doctors per 1000, hospital count, coverage %
- **Triage Statistics** — Distribution of symptom check urgency levels
- **Active Alerts** — Color-coded disease alerts

### 4.8 💊 Medicine Delivery
- **15 Medicines Catalog** — Paracetamol, Amoxicillin, Cetirizine, Metformin, Insulin, etc.
- **Category Filter** — Pain Relief, Antibiotic, Diabetes, Vitamins, Hydration, etc.
- **Search** — Search by medicine name
- **Shopping Cart** — Add/remove items, quantity management
- **Bill Summary**:
  - Subtotal
  - Delivery Fee (₹40, free above ₹299)
  - GST (5%)
  - **Total Amount**
- **Payment Modal** — Same UPI/Card/NetBanking as appointments
- **Delivery Address** input

### 4.9 🩸 Blood & Organ Donor Registry
- **Blood Donors Section**:
  - 8 blood type buttons (A+, A-, B+, B-, O+, O-, AB+, AB-)
  - Click type → shows matching donors with name, age, city, phone
  - **14 registered blood donors** across India
  - **"Register as Blood Donor"** form
- **Organ Donors Section**:
  - 8 organ type buttons (Kidney, Liver, Heart, Lung, Cornea, Bone Marrow, Pancreas, Intestine)
  - Click organ → shows matching donors
  - **10 registered organ donors**
  - **"Register as Organ Donor"** form

### 4.10 🥗 Diet & Lifestyle
- **Balanced Indian Diet Plan** — 5 meals/day with calorie counts:
  - Early Morning (100 cal), Breakfast (350 cal), Lunch (500 cal), Evening Snack (150 cal), Dinner (400 cal)
- **Lifestyle Habits** with animated progress bars:
  - Morning Yoga (80%), Hydration (60%), Sleep Quality (75%), Screen Breaks (45%), Meditation (55%)
- **Indian Superfoods** — Turmeric, Amla, Moringa, Ragi, Ashwagandha
- **Foods to Avoid** — Processed foods, excess sugar, deep fried, excess salt, refined flour
- **Exercise Guide** — Walking, Yoga, Swimming, Cycling with duration/frequency

### 4.11 📋 Patient Records
- **Admission Records** showing:
  - Patient name, Age, Hospital name
  - Room number, Bed number, Patient ID number
  - Admission date, Diagnosis, Status (Admitted/Discharged)
- **Add New Record** form

### 4.12 👤 User Profile
- **Personal Details** — Photo, Name, Email, Phone, Age, Gender, Height, Weight, Address
- **3 Tabs**:
  - 📅 **Appointment History** — Past & upcoming appointments
  - 💳 **Transaction History** — All payments with method, amount, status
  - 📋 **Patient Records** — Hospital admission history
- **Edit Profile** functionality

### 4.13 🤖 AI Chatbot (RAG-Powered)
- **Floating Chat Widget** — Always visible bottom-right corner
- **RAG Architecture** — Retrieval-Augmented Generation with keyword-matched knowledge base
- **14 Topic Categories**: Appointments, Emergency, Symptoms, Medicine, Hospitals, Payments, Blood Donation, Organ Donation, Profile, Telemedicine, Language, Security, Diet, Patient Records
- **Quick Action Buttons** — Book Appointment, Emergency, Symptoms, Payments
- **Conversation History** support
- **Typing Indicator** animation during response generation

### 4.14 🌐 Multilingual Support (22 Languages)
All 22 official Indian languages + English:
Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Maithili, Santali, Kashmiri, Nepali, Sindhi, Dogri, Konkani, Manipuri, Bodo, Sanskrit

- Language selector in header
- All navigation labels, section titles, button text translated
- Uses Noto Sans Devanagari font for Hindi/Sanskrit scripts

### 4.15 🔒 Security Features
- **JWT Authentication** — Token-based user sessions (24-hour expiry)
- **Password Hashing** — Werkzeug's PBKDF2-SHA256
- **256-bit SSL Encryption** for payment data
- **PCI DSS Compliance** badge on payment modals
- **CORS Configuration** — Cross-origin request control
- **Input Validation** — Server-side data validation on all API endpoints
- **Compliance** — IT Act 2000, Digital Personal Data Protection Act 2023, Telemedicine Practice Guidelines 2020

---

## 5. API ENDPOINTS (REST API)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/me` | Get authenticated user |
| GET | `/api/doctors/` | List doctors (filter: city, specialization, language, telemedicine) |
| GET | `/api/doctors/specializations` | Get unique specializations |
| GET | `/api/doctors/cities` | Get unique cities |
| GET | `/api/hospitals/` | List hospitals (filter: city, type, emergency) |
| GET | `/api/hospitals/nearby` | Find nearby hospitals by lat/lng |
| POST | `/api/appointments/` | Book appointment |
| GET | `/api/appointments/slots` | Get available time slots |
| DELETE | `/api/appointments/:id` | Cancel appointment |
| POST | `/api/symptoms/triage` | AI symptom analysis |
| GET | `/api/symptoms/common` | Get 26 common symptoms |
| GET | `/api/analytics/overview` | Dashboard statistics |
| GET | `/api/analytics/disease-trends` | Disease trend data |
| GET | `/api/analytics/alerts` | Active health alerts |
| POST | `/api/ambulance/request` | Request ambulance |
| GET | `/api/medicine/catalog` | Browse medicines |
| POST | `/api/medicine/order` | Place medicine order |
| GET | `/api/donors/blood` | Search blood donors by type |
| POST | `/api/donors/blood/register` | Register as blood donor |
| GET | `/api/donors/organs` | Search organ donors |
| POST | `/api/donors/organs/register` | Register as organ donor |
| GET | `/api/profile/` | Get user profile |
| PUT | `/api/profile/` | Update profile |
| GET | `/api/profile/transactions` | Transaction history |
| GET | `/api/profile/records` | Patient records |
| POST | `/api/chatbot/chat` | Send message to AI chatbot |
| GET | `/api/news` | Latest medical news |

---

## 6. KEY DESIGN PATTERNS & CONCEPTS

| Concept | Implementation |
|---------|---------------|
| **SPA (Single Page Application)** | JavaScript-only routing, no page reloads, hash-based navigation |
| **REST API** | Standard HTTP methods (GET/POST/PUT/DELETE) with JSON responses |
| **MVC Pattern** | Models (SQLAlchemy), Views (HTML/JS), Controllers (Flask routes) |
| **ORM** | SQLAlchemy maps Python classes to database tables |
| **Component-Based UI** | Reusable functions: `createDoctorCard()`, `createHospitalCard()`, `createModal()` |
| **Responsive Design** | CSS media queries, flexbox, grid — works on mobile, tablet, desktop |
| **Internationalization (i18n)** | Translation dictionary with language code keys |
| **RAG (Retrieval-Augmented Generation)** | Chatbot retrieves from knowledge base, then generates contextual responses |
| **Rule-Based AI Triage** | Symptom-to-urgency mapping with specialty recommendation |
| **Mock API Pattern** | GitHub Pages version uses embedded JavaScript data instead of fetch calls |
| **Blueprint Pattern** | Flask blueprints organize routes into modular files |
| **Factory Pattern** | `create_app()` function for Flask application creation |

---

## 7. ANSWERING COMMON QUESTIONS

**Q: What is the purpose of this project?**
A: MediConnect is an AI-powered healthcare platform that bridges India's urban-rural healthcare gap. It provides digital access to doctors, hospitals, emergency services, medicines, and health information — especially for underserved communities.

**Q: What makes this different from other healthcare apps?**
A: (1) AI-powered symptom triage engine, (2) 22 Indian language support, (3) Merged emergency + hospital live map interface, (4) Blood & organ donor registry, (5) Integrated payment system for appointments and medicines, (6) RAG-based AI chatbot, (7) Real-time disease surveillance alerts.

**Q: How does the AI Symptom Checker work?**
A: It uses a rule-based triage engine with 4 severity levels. Symptoms are matched against a knowledge base of emergency, high, medium, and low-priority conditions. It also maps symptoms to the correct medical specialty (e.g., chest pain → Cardiologist). Additional inputs like pain scale (1-10), duration, and file uploads (images/prescriptions) enhance the analysis.

**Q: How are payments handled?**
A: We support UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards, and Net Banking. All transactions use 256-bit SSL encryption and are PCI DSS compliant. Payment is required before appointment booking and medicine ordering.

**Q: How does the chatbot work?**
A: It uses a RAG (Retrieval-Augmented Generation) architecture. When a user asks a question, the system searches a 14-topic knowledge base using keyword matching (simulating vector similarity search), retrieves the most relevant topic, and returns a contextual response. Topics include appointments, emergency, symptoms, medicines, hospitals, payments, and more.

**Q: What database is used and why?**
A: SQLite — because it's file-based (no separate database server needed), lightweight, perfect for development and demo purposes, and ships built-in with Python. For production, this can be easily migrated to PostgreSQL or MySQL since we use SQLAlchemy ORM.

**Q: How does the multilingual feature work?**
A: We use an i18n (internationalization) module with a JavaScript dictionary mapping 60+ UI strings to all 22 official Indian languages. When the user selects a language from the header dropdown, all navigation labels, section titles, and button text update instantly without page reload.

**Q: How is the website deployed?**
A: Two modes: (1) **GitHub Pages** — entirely static, all data embedded in JavaScript, no backend needed. (2) **Local Flask server** — full backend with SQLite database, REST API, and real-time data.

**Q: Is this website responsive?**
A: Yes. It uses CSS Grid, Flexbox, and media queries. The sidebar collapses into a hamburger menu on mobile. All cards, forms, and tables adapt to screen size.

**Q: How many doctors and hospitals are in the system?**
A: 15 specialist doctors across 12 Indian states, covering 15 specializations. 12 hospitals including AIIMS Delhi, KEM Mumbai, NIMHANS Bangalore, PGI Chandigarh, and rural PHCs/CHCs. 14 blood donors and 10 organ donors.

---

## 8. LIVE URL

🌐 **https://suchithrakuruva.github.io/mediconnect/**

---

*Built with ❤️ for equitable healthcare access across India*
