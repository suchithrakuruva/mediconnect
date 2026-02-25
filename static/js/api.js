// =====================================================
// MediConnect — Mock API for GitHub Pages (Static)
// All data is embedded. No backend required.
// =====================================================

// ---- Toast Notification ----
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ---- Embedded Data Store (simulates DB) ----
const _store = {
    doctors: [
        { id: 1, name: 'Dr. Priya Sharma', specialization: 'Cardiologist', qualification: 'MBBS, MD (Cardiology)', experience_years: 15, hospital: 'AIIMS Delhi', city: 'New Delhi', state: 'Delhi', phone: '9810012345', email: 'priya.sharma@aiims.edu', languages: ['Hindi', 'English'], rating: 4.8, consultation_fee: 800, available: 1, telemedicine: 1, available_time: '09:00 - 17:00' },
        { id: 2, name: 'Dr. Rajesh Kumar', specialization: 'General Physician', qualification: 'MBBS, MD', experience_years: 10, hospital: 'Civil Hospital Lucknow', city: 'Lucknow', state: 'Uttar Pradesh', phone: '9935012345', email: '', languages: ['Hindi', 'Urdu', 'English'], rating: 4.5, consultation_fee: 200, available: 1, telemedicine: 1, available_time: '08:00 - 16:00' },
        { id: 3, name: 'Dr. Anitha Menon', specialization: 'Gynecologist', qualification: 'MBBS, MS (Obs & Gyn)', experience_years: 18, hospital: 'Govt Medical College Trivandrum', city: 'Thiruvananthapuram', state: 'Kerala', phone: '9847012345', email: '', languages: ['Malayalam', 'English', 'Hindi'], rating: 4.9, consultation_fee: 500, available: 1, telemedicine: 1, available_time: '10:00 - 18:00' },
        { id: 4, name: 'Dr. Suresh Patel', specialization: 'Orthopedician', qualification: 'MBBS, MS (Ortho)', experience_years: 12, hospital: 'Civil Hospital Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', phone: '9824012345', email: '', languages: ['Gujarati', 'Hindi', 'English'], rating: 4.3, consultation_fee: 400, available: 1, telemedicine: 0, available_time: '09:00 - 15:00' },
        { id: 5, name: 'Dr. Meera Iyer', specialization: 'Pediatrician', qualification: 'MBBS, MD (Pediatrics)', experience_years: 8, hospital: 'KEM Hospital Mumbai', city: 'Mumbai', state: 'Maharashtra', phone: '9820012345', email: '', languages: ['Marathi', 'Hindi', 'English'], rating: 4.7, consultation_fee: 600, available: 1, telemedicine: 1, available_time: '09:00 - 17:00' },
        { id: 6, name: 'Dr. Amitabh Singh', specialization: 'Dermatologist', qualification: 'MBBS, MD (Skin)', experience_years: 9, hospital: 'PGI Chandigarh', city: 'Chandigarh', state: 'Punjab', phone: '9814012345', email: '', languages: ['Punjabi', 'Hindi', 'English'], rating: 4.4, consultation_fee: 450, available: 1, telemedicine: 1, available_time: '10:00 - 16:00' },
        { id: 7, name: 'Dr. Kavitha Reddy', specialization: 'Neurologist', qualification: 'MBBS, DM (Neurology)', experience_years: 16, hospital: 'Osmania General Hospital', city: 'Hyderabad', state: 'Telangana', phone: '9848012345', email: '', languages: ['Telugu', 'Hindi', 'English'], rating: 4.6, consultation_fee: 700, available: 1, telemedicine: 1, available_time: '09:00 - 17:00' },
        { id: 8, name: 'Dr. Ramesh Babu', specialization: 'General Physician', qualification: 'MBBS', experience_years: 5, hospital: 'PHC Nalanda', city: 'Nalanda', state: 'Bihar', phone: '9801012345', email: '', languages: ['Bhojpuri', 'Hindi'], rating: 4.2, consultation_fee: 100, available: 1, telemedicine: 1, available_time: '08:00 - 14:00' },
        { id: 9, name: 'Dr. Sunita Chauhan', specialization: 'ENT Specialist', qualification: 'MBBS, MS (ENT)', experience_years: 11, hospital: 'SMS Hospital Jaipur', city: 'Jaipur', state: 'Rajasthan', phone: '9829012345', email: '', languages: ['Rajasthani', 'Hindi', 'English'], rating: 4.5, consultation_fee: 350, available: 1, telemedicine: 0, available_time: '09:00 - 15:00' },
        { id: 10, name: 'Dr. Prakash Nair', specialization: 'Psychiatrist', qualification: 'MBBS, MD (Psychiatry)', experience_years: 14, hospital: 'NIMHANS Bangalore', city: 'Bengaluru', state: 'Karnataka', phone: '9845012345', email: '', languages: ['Kannada', 'Malayalam', 'English', 'Hindi'], rating: 4.7, consultation_fee: 600, available: 1, telemedicine: 1, available_time: '10:00 - 18:00' },
        { id: 11, name: 'Dr. Deepa Mukherjee', specialization: 'Endocrinologist', qualification: 'MBBS, DM (Endocrinology)', experience_years: 13, hospital: 'SSKM Hospital Kolkata', city: 'Kolkata', state: 'West Bengal', phone: '9831012345', email: '', languages: ['Bengali', 'Hindi', 'English'], rating: 4.6, consultation_fee: 650, available: 1, telemedicine: 1, available_time: '09:00 - 16:00' },
        { id: 12, name: 'Dr. Vinod Rathod', specialization: 'General Surgeon', qualification: 'MBBS, MS (Surgery)', experience_years: 20, hospital: 'Government Hospital Nagpur', city: 'Nagpur', state: 'Maharashtra', phone: '9822012345', email: '', languages: ['Marathi', 'Hindi', 'English'], rating: 4.4, consultation_fee: 500, available: 1, telemedicine: 0, available_time: '08:00 - 14:00' },
        { id: 13, name: 'Dr. Lalitha Devi', specialization: 'Ophthalmologist', qualification: 'MBBS, MS (Ophthalmology)', experience_years: 7, hospital: 'Sankara Nethralaya Chennai', city: 'Chennai', state: 'Tamil Nadu', phone: '9842012345', email: '', languages: ['Tamil', 'Telugu', 'English'], rating: 4.8, consultation_fee: 400, available: 1, telemedicine: 1, available_time: '09:00 - 17:00' },
        { id: 14, name: 'Dr. Arun Joshi', specialization: 'Nephrologist', qualification: 'MBBS, DM (Nephrology)', experience_years: 17, hospital: 'SGPGI Lucknow', city: 'Lucknow', state: 'Uttar Pradesh', phone: '9839012345', email: '', languages: ['Hindi', 'English'], rating: 4.5, consultation_fee: 800, available: 1, telemedicine: 1, available_time: '10:00 - 16:00' },
        { id: 15, name: 'Dr. Fatima Khan', specialization: 'General Physician', qualification: 'MBBS, MD', experience_years: 6, hospital: 'PHC Mallapuram', city: 'Malappuram', state: 'Kerala', phone: '9846012345', email: '', languages: ['Malayalam', 'Arabic', 'Hindi', 'English'], rating: 4.3, consultation_fee: 150, available: 1, telemedicine: 1, available_time: '08:00 - 16:00' },
    ],
    hospitals: [
        { id: 1, name: 'AIIMS New Delhi', type: 'Government', address: 'Sri Aurobindo Marg', city: 'New Delhi', state: 'Delhi', phone: '011-26588500', beds: 2444, icu_beds: 120, available_beds: 180, latitude: 28.5672, longitude: 77.21, facilities: ['Emergency', 'ICU', 'Trauma Center', 'Dialysis', 'Cancer Care'], emergency: 1, rating: 4.8, available_time: '24/7' },
        { id: 2, name: 'KEM Hospital', type: 'Government', address: 'Acharya Donde Marg, Parel', city: 'Mumbai', state: 'Maharashtra', phone: '022-24107000', beds: 1900, icu_beds: 100, available_beds: 142, latitude: 18.9973, longitude: 72.8419, facilities: ['Emergency', 'ICU', 'Trauma', 'Dialysis'], emergency: 1, rating: 4.5, available_time: '24/7' },
        { id: 3, name: 'NIMHANS', type: 'Government', address: 'Hosur Road', city: 'Bengaluru', state: 'Karnataka', phone: '080-46110007', beds: 800, icu_beds: 40, available_beds: 60, latitude: 12.9426, longitude: 77.5968, facilities: ['Psychiatry', 'Neurology', 'Neurosurgery'], emergency: 1, rating: 4.7, available_time: '24/7' },
        { id: 4, name: 'Govt Medical College Trivandrum', type: 'Government', address: 'Medical College Road', city: 'Thiruvananthapuram', state: 'Kerala', phone: '0471-2528386', beds: 2500, icu_beds: 140, available_beds: 200, latitude: 8.5194, longitude: 76.9202, facilities: ['Emergency', 'ICU', 'Maternity', 'Pediatrics', 'Oncology'], emergency: 1, rating: 4.6, available_time: '24/7' },
        { id: 5, name: 'SMS Hospital Jaipur', type: 'Government', address: 'J.L.N. Marg', city: 'Jaipur', state: 'Rajasthan', phone: '0141-2518888', beds: 3700, icu_beds: 160, available_beds: 290, latitude: 26.9124, longitude: 75.8224, facilities: ['Emergency', 'Trauma', 'ICU', 'Burn Unit', 'Dialysis'], emergency: 1, rating: 4.3, available_time: '24/7' },
        { id: 6, name: 'PHC Nalanda', type: 'PHC', address: 'Block Road', city: 'Nalanda', state: 'Bihar', phone: '06112-222333', beds: 50, icu_beds: 2, available_beds: 15, latitude: 25.1987, longitude: 85.5206, facilities: ['OPD', 'Maternity', 'Basic Diagnostics'], emergency: 0, rating: 3.2, available_time: '08:00 - 16:00' },
        { id: 7, name: 'CHC Raebareli', type: 'CHC', address: 'Dalmau Road', city: 'Raebareli', state: 'Uttar Pradesh', phone: '0535-2201234', beds: 100, icu_beds: 5, available_beds: 30, latitude: 26.234, longitude: 81.2423, facilities: ['OPD', 'Surgery', 'Maternity', 'X-Ray'], emergency: 1, rating: 3.5, available_time: '24/7' },
        { id: 8, name: 'Osmania General Hospital', type: 'Government', address: 'Afzal Gunj', city: 'Hyderabad', state: 'Telangana', phone: '040-24600116', beds: 1000, icu_beds: 60, available_beds: 80, latitude: 17.385, longitude: 78.4867, facilities: ['Emergency', 'Trauma', 'ICU', 'Cardiology'], emergency: 1, rating: 4.2, available_time: '24/7' },
        { id: 9, name: 'Sankara Nethralaya', type: 'Private', address: '18, College Road', city: 'Chennai', state: 'Tamil Nadu', phone: '044-28271616', beds: 500, icu_beds: 20, available_beds: 45, latitude: 13.0615, longitude: 80.2382, facilities: ['Ophthalmology', 'Optometry', 'Pediatric Eye Care'], emergency: 0, rating: 4.9, available_time: '08:00 - 20:00' },
        { id: 10, name: 'SSKM Hospital', type: 'Government', address: '244, AJC Bose Road', city: 'Kolkata', state: 'West Bengal', phone: '033-22041938', beds: 1200, icu_beds: 80, available_beds: 100, latitude: 22.5448, longitude: 88.3461, facilities: ['Emergency', 'ICU', 'Cardiac', 'Trauma', 'Dialysis'], emergency: 1, rating: 4.3, available_time: '24/7' },
        { id: 11, name: 'PGI Chandigarh', type: 'Government', address: 'Sector 12', city: 'Chandigarh', state: 'Punjab', phone: '0172-2756565', beds: 2100, icu_beds: 110, available_beds: 165, latitude: 30.765, longitude: 76.776, facilities: ['Emergency', 'ICU', 'Transplant', 'Cardiology', 'Oncology'], emergency: 1, rating: 4.7, available_time: '24/7' },
        { id: 12, name: 'SGPGI Lucknow', type: 'Government', address: 'Raebareli Road', city: 'Lucknow', state: 'Uttar Pradesh', phone: '0522-2668700', beds: 800, icu_beds: 70, available_beds: 85, latitude: 26.7606, longitude: 80.9897, facilities: ['Organ Transplant', 'Nephrology', 'Cardiology', 'Neurology'], emergency: 1, rating: 4.6, available_time: '24/7' },
    ],
    alerts: [
        { id: 1, title: 'Dengue Alert – Mumbai', description: 'Rising dengue cases reported in western suburbs.', disease: 'Dengue', state: 'Maharashtra', city: 'Mumbai', severity: 'high', cases: 342 },
        { id: 2, title: 'Malaria Advisory – Bihar', description: 'Increased malaria transmission in flood-affected areas.', disease: 'Malaria', state: 'Bihar', city: 'Patna', severity: 'medium', cases: 218 },
        { id: 3, title: 'TB Screening – UP', description: 'Free TB screening camps in Lucknow and Varanasi.', disease: 'Tuberculosis', state: 'Uttar Pradesh', city: 'Lucknow', severity: 'low', cases: 95 },
        { id: 4, title: 'Cholera Warning – West Bengal', description: 'Cholera cases detected near Hooghly river areas.', disease: 'Cholera', state: 'West Bengal', city: 'Kolkata', severity: 'high', cases: 67 },
        { id: 5, title: 'Chikungunya Alert – Karnataka', description: 'Post-monsoon Chikungunya surge in coastal areas.', disease: 'Chikungunya', state: 'Karnataka', city: 'Mangaluru', severity: 'medium', cases: 156 },
    ],
    bloodDonors: [
        { id: 1, name: 'Rahul Verma', age: 27, blood_type: 'A+', phone: '9876001001', city: 'New Delhi', state: 'Delhi', available: 1 },
        { id: 2, name: 'Sneha Patil', age: 32, blood_type: 'A+', phone: '9876001002', city: 'Mumbai', state: 'Maharashtra', available: 1 },
        { id: 3, name: 'Vikram Singh', age: 24, blood_type: 'B+', phone: '9876001003', city: 'Jaipur', state: 'Rajasthan', available: 1 },
        { id: 4, name: 'Pooja Nair', age: 29, blood_type: 'B+', phone: '9876001004', city: 'Thiruvananthapuram', state: 'Kerala', available: 1 },
        { id: 5, name: 'Arjun Reddy', age: 35, blood_type: 'O+', phone: '9876001005', city: 'Hyderabad', state: 'Telangana', available: 1 },
        { id: 6, name: 'Divya Sharma', age: 22, blood_type: 'O+', phone: '9876001006', city: 'Lucknow', state: 'Uttar Pradesh', available: 1 },
        { id: 7, name: 'Karan Mehta', age: 30, blood_type: 'O-', phone: '9876001007', city: 'Ahmedabad', state: 'Gujarat', available: 1 },
        { id: 8, name: 'Ananya Das', age: 26, blood_type: 'AB+', phone: '9876001008', city: 'Kolkata', state: 'West Bengal', available: 1 },
        { id: 9, name: 'Sunil Kumar', age: 40, blood_type: 'AB+', phone: '9876001009', city: 'Chennai', state: 'Tamil Nadu', available: 1 },
        { id: 10, name: 'Priti Yadav', age: 28, blood_type: 'A-', phone: '9876001010', city: 'Bengaluru', state: 'Karnataka', available: 1 },
        { id: 11, name: 'Mohan Lal', age: 45, blood_type: 'B-', phone: '9876001011', city: 'Chandigarh', state: 'Punjab', available: 1 },
        { id: 12, name: 'Ritu Saxena', age: 33, blood_type: 'AB-', phone: '9876001012', city: 'Nagpur', state: 'Maharashtra', available: 1 },
        { id: 13, name: 'Amit Jha', age: 31, blood_type: 'O-', phone: '9876001013', city: 'Nalanda', state: 'Bihar', available: 1 },
        { id: 14, name: 'Lakshmi Iyer', age: 38, blood_type: 'A+', phone: '9876001014', city: 'Chennai', state: 'Tamil Nadu', available: 1 },
    ],
    organDonors: [
        { id: 1, name: 'Sanjay Gupta', age: 45, organ: 'Kidney', blood_type: 'O+', phone: '9876002001', city: 'New Delhi', state: 'Delhi', available: 1 },
        { id: 2, name: 'Meenakshi Raman', age: 38, organ: 'Liver', blood_type: 'A+', phone: '9876002002', city: 'Chennai', state: 'Tamil Nadu', available: 1 },
        { id: 3, name: 'Rajendra Prasad', age: 50, organ: 'Cornea', blood_type: 'B+', phone: '9876002003', city: 'Hyderabad', state: 'Telangana', available: 1 },
        { id: 4, name: 'Fatima Begum', age: 42, organ: 'Kidney', blood_type: 'AB+', phone: '9876002004', city: 'Mumbai', state: 'Maharashtra', available: 1 },
        { id: 5, name: 'Harish Chandra', age: 55, organ: 'Heart', blood_type: 'O-', phone: '9876002005', city: 'Lucknow', state: 'Uttar Pradesh', available: 1 },
        { id: 6, name: 'Padma Lakshmi', age: 35, organ: 'Bone Marrow', blood_type: 'A-', phone: '9876002006', city: 'Bengaluru', state: 'Karnataka', available: 1 },
        { id: 7, name: 'Dinesh Patel', age: 48, organ: 'Liver', blood_type: 'B+', phone: '9876002007', city: 'Ahmedabad', state: 'Gujarat', available: 1 },
        { id: 8, name: 'Geeta Devi', age: 40, organ: 'Cornea', blood_type: 'O+', phone: '9876002008', city: 'Jaipur', state: 'Rajasthan', available: 1 },
        { id: 9, name: 'Biswajit Sen', age: 52, organ: 'Kidney', blood_type: 'AB-', phone: '9876002009', city: 'Kolkata', state: 'West Bengal', available: 1 },
        { id: 10, name: 'Revathi Menon', age: 37, organ: 'Lung', blood_type: 'A+', phone: '9876002010', city: 'Thiruvananthapuram', state: 'Kerala', available: 1 },
    ],
    appointments: [],
    transactions: [
        { id: 1, user_id: 1, type: 'appointment', amount: 800, payment_method: 'UPI - GPay', status: 'completed', description: 'Consultation with Dr. Priya Sharma', created_at: '2026-02-10' },
        { id: 2, user_id: 1, type: 'medicine', amount: 450, payment_method: 'Credit Card', status: 'completed', description: 'Medicine order - Paracetamol, Cetirizine', created_at: '2026-02-12' },
        { id: 3, user_id: 1, type: 'appointment', amount: 600, payment_method: 'UPI - PhonePe', status: 'completed', description: 'Teleconsult with Dr. Meera Iyer', created_at: '2026-02-18' },
        { id: 4, user_id: 1, type: 'ambulance', amount: 0, payment_method: 'Free (108)', status: 'completed', description: 'Emergency ambulance - AIIMS Delhi', created_at: '2026-02-20' },
    ],
    records: [
        { id: 1, name: 'Arun Kumar', age: 28, hospital_name: 'AIIMS New Delhi', room_number: '305-A', bed_number: 'B-12', patient_number: 'MED-2026-001', admission_date: '2026-01-15', status: 'discharged', diagnosis: 'Viral Fever' },
        { id: 2, name: 'Arun Kumar', age: 28, hospital_name: 'KEM Hospital', room_number: '210-B', bed_number: 'B-04', patient_number: 'MED-2026-042', admission_date: '2026-02-05', status: 'admitted', diagnosis: 'Observation - Chest Pain' },
    ],
    user: { id: 1, name: 'Arun Kumar', email: 'arun@mediconnect.in', phone: '9876543210', age: 28, gender: 'Male', height_cm: 175, weight_kg: 70, address: '42, Anna Nagar East', city: 'Chennai', state: 'Tamil Nadu', pincode: '600102' },
    _nextId: 100,
};

// ---- Symptom Triage Engine ----
const SYMPTOM_RULES = {
    emergency: { symptoms: ['chest pain', 'heart attack', 'stroke', 'unconscious', 'difficulty breathing', 'severe bleeding', 'seizure', 'paralysis'], specialty: 'Emergency Medicine', recommendation: 'EMERGENCY: Call 108 immediately or go to the nearest emergency room.', urgency: 'emergency' },
    high: { symptoms: ['high fever', 'blood in urine', 'blood in stool', 'severe headache', 'severe abdominal pain', 'vomiting blood', 'jaundice', 'shortness of breath', 'chest tightness'], specialty: 'Internal Medicine', recommendation: 'High priority: Seek medical attention within 24 hours.', urgency: 'high' },
    medium: { symptoms: ['fever', 'cough', 'cold', 'diarrhea', 'vomiting', 'body pain', 'headache', 'rash', 'joint pain', 'back pain', 'urinary burning'], specialty: 'General Physician', recommendation: 'Moderate concern: Schedule a doctor visit within 2-3 days.', urgency: 'medium' },
    low: { symptoms: ['fatigue', 'mild cough', 'sneezing', 'runny nose', 'mild headache', 'acne', 'mild stomach ache', 'insomnia'], specialty: 'General Physician', recommendation: 'Low concern: Rest, hydrate. Consult a doctor if symptoms persist beyond 5 days.', urgency: 'low' },
};
const SPECIALTY_MAP = { 'chest pain': 'Cardiologist', 'heart': 'Cardiologist', 'skin': 'Dermatologist', 'rash': 'Dermatologist', 'eye': 'Ophthalmologist', 'vision': 'Ophthalmologist', 'ear': 'ENT Specialist', 'bone': 'Orthopedician', 'joint': 'Orthopedician', 'mental': 'Psychiatrist', 'anxiety': 'Psychiatrist', 'depression': 'Psychiatrist', 'pregnancy': 'Gynecologist', 'child': 'Pediatrician', 'diabetes': 'Endocrinologist', 'kidney': 'Nephrologist', 'cancer': 'Oncologist' };

function triageSymptoms(symptoms) {
    const text = symptoms.map(s => s.toLowerCase()).join(' ');
    for (const sev of ['emergency', 'high', 'medium', 'low']) {
        const rule = SYMPTOM_RULES[sev];
        for (const s of rule.symptoms) {
            if (text.includes(s)) {
                let spec = rule.specialty;
                for (const [kw, sp] of Object.entries(SPECIALTY_MAP)) { if (text.includes(kw)) { spec = sp; break; } }
                return { urgency: rule.urgency, recommended_specialty: spec, recommendation: rule.recommendation, matched_symptom: s };
            }
        }
    }
    return { urgency: 'low', recommended_specialty: 'General Physician', recommendation: 'No critical symptoms detected. Monitor and consult if needed.', matched_symptom: null };
}

// ---- Medicines Catalog ----
const MEDICINES = [
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 25, unit: 'Strip of 10' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', price: 85, unit: 'Strip of 10' },
    { id: 3, name: 'Cetirizine 10mg', category: 'Antiallergic', price: 30, unit: 'Strip of 10' },
    { id: 4, name: 'Metformin 500mg', category: 'Diabetes', price: 45, unit: 'Strip of 10' },
    { id: 5, name: 'Amlodipine 5mg', category: 'BP & Heart', price: 55, unit: 'Strip of 10' },
    { id: 6, name: 'Omeprazole 20mg', category: 'Gastro', price: 60, unit: 'Strip of 10' },
    { id: 7, name: 'Azithromycin 500mg', category: 'Antibiotic', price: 120, unit: 'Strip of 3' },
    { id: 8, name: 'Vitamin C 500mg', category: 'Vitamins', price: 35, unit: 'Strip of 10' },
    { id: 9, name: 'ORS Electrolytes', category: 'Hydration', price: 20, unit: 'Sachet' },
    { id: 10, name: 'Betadine 5%', category: 'Antiseptic', price: 75, unit: '30ml Bottle' },
    { id: 11, name: 'Insulin (Regular)', category: 'Diabetes', price: 280, unit: '10ml Vial' },
    { id: 12, name: 'Salbutamol Inhaler', category: 'Respiratory', price: 180, unit: 'Inhaler' },
    { id: 13, name: 'Ibuprofen 400mg', category: 'Pain Relief', price: 30, unit: 'Strip of 10' },
    { id: 14, name: 'Iron + Folic Acid', category: 'Vitamins', price: 40, unit: 'Strip of 10' },
    { id: 15, name: 'Doxycycline 100mg', category: 'Antibiotic', price: 95, unit: 'Strip of 10' },
];

// ---- Mock API object (same interface as the real api.js) ----
const api = {
    doctors: {
        list: (params = {}) => {
            let docs = [..._store.doctors];
            if (params.city) docs = docs.filter(d => d.city.toLowerCase().includes(params.city.toLowerCase()));
            if (params.specialization) docs = docs.filter(d => d.specialization.toLowerCase().includes(params.specialization.toLowerCase()));
            if (params.language) docs = docs.filter(d => d.languages.some(l => l.toLowerCase().includes(params.language.toLowerCase())));
            if (params.telemedicine === 'true') docs = docs.filter(d => d.telemedicine);
            return Promise.resolve(docs);
        },
        get: (id) => Promise.resolve(_store.doctors.find(d => d.id === id)),
        specializations: () => Promise.resolve([...new Set(_store.doctors.map(d => d.specialization))]),
        cities: () => Promise.resolve([...new Set(_store.doctors.map(d => d.city))]),
    },
    hospitals: {
        list: (params = {}) => {
            let h = [..._store.hospitals];
            if (params.city) h = h.filter(x => x.city.toLowerCase().includes(params.city.toLowerCase()));
            if (params.type) h = h.filter(x => x.type.toLowerCase().includes(params.type.toLowerCase()));
            if (params.emergency === 'true') h = h.filter(x => x.emergency);
            return Promise.resolve(h);
        },
        get: (id) => Promise.resolve(_store.hospitals.find(h => h.id === id)),
    },
    appointments: {
        list: () => Promise.resolve(_store.appointments),
        book: (data) => { const a = { id: ++_store._nextId, ...data, status: 'scheduled', created_at: new Date().toISOString() }; _store.appointments.push(a); return Promise.resolve(a); },
        cancel: (id) => { const a = _store.appointments.find(x => x.id === id); if (a) a.status = 'cancelled'; return Promise.resolve({ message: 'Cancelled' }); },
        slots: (doctorId, date) => {
            const booked = _store.appointments.filter(a => a.doctor_id == doctorId && a.appointment_date === date).map(a => a.appointment_time);
            const all = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
            return Promise.resolve({ available_slots: all.filter(s => !booked.includes(s)), booked_slots: booked });
        },
    },
    symptoms: {
        common: () => Promise.resolve(['Fever', 'Cough', 'Cold', 'Headache', 'Body Pain', 'Fatigue', 'Diarrhea', 'Vomiting', 'Rash', 'Chest Pain', 'Shortness of Breath', 'Abdominal Pain', 'Back Pain', 'Joint Pain', 'Sore Throat', 'High Fever', 'Blood in Urine', 'Jaundice', 'Seizure', 'Difficulty Breathing', 'Severe Headache', 'Urinary Burning', 'Anxiety', 'Depression', 'Insomnia', 'Loss of Appetite']),
        triage: (symptoms) => Promise.resolve(triageSymptoms(symptoms)),
    },
    analytics: {
        overview: () => Promise.resolve({ total_doctors: 15, total_hospitals: 12, total_appointments: _store.appointments.length, total_symptom_checks: 0, telemedicine_doctors: _store.doctors.filter(d => d.telemedicine).length, emergency_hospitals: _store.hospitals.filter(h => h.emergency).length, active_alerts: 3 }),
        alerts: () => Promise.resolve(_store.alerts),
        diseaseTrends: () => Promise.resolve([{ month: 'Sep', Malaria: 320, Dengue: 180, Tuberculosis: 95, Typhoid: 140 }, { month: 'Oct', Malaria: 280, Dengue: 250, Tuberculosis: 88, Typhoid: 120 }, { month: 'Nov', Malaria: 190, Dengue: 310, Tuberculosis: 102, Typhoid: 95 }, { month: 'Dec', Malaria: 140, Dengue: 200, Tuberculosis: 115, Typhoid: 75 }, { month: 'Jan', Malaria: 110, Dengue: 90, Tuberculosis: 130, Typhoid: 60 }, { month: 'Feb', Malaria: 160, Dengue: 70, Tuberculosis: 125, Typhoid: 55 }]),
        stateHealth: () => Promise.resolve([{ state: 'Maharashtra', doctors_per_1000: 1.8, hospitals: 4200, coverage: 78 }, { state: 'Uttar Pradesh', doctors_per_1000: 0.6, hospitals: 2800, coverage: 42 }, { state: 'Bihar', doctors_per_1000: 0.4, hospitals: 1200, coverage: 31 }, { state: 'Rajasthan', doctors_per_1000: 0.9, hospitals: 1800, coverage: 55 }, { state: 'Tamil Nadu', doctors_per_1000: 2.1, hospitals: 3600, coverage: 85 }, { state: 'Kerala', doctors_per_1000: 3.2, hospitals: 2400, coverage: 94 }, { state: 'West Bengal', doctors_per_1000: 1.1, hospitals: 2200, coverage: 62 }, { state: 'Gujarat', doctors_per_1000: 1.5, hospitals: 3100, coverage: 71 }]),
        triageStats: () => Promise.resolve([]),
    },
    ambulance: {
        request: (data) => {
            const DRIVERS = [
                { name: 'Ramesh Kumar', phone: '+91-9988776655' },
                { name: 'Sunil Verma', phone: '+91-9877665544' },
                { name: 'Mohan Das', phone: '+91-9766554433' },
                { name: 'Prakash Rao', phone: '+91-9655443322' },
                { name: 'Vijay Singh', phone: '+91-9544332211' },
            ];
            const driver = DRIVERS[Math.floor(Math.random() * DRIVERS.length)];
            const req = { id: ++_store._nextId, ...data, status: 'dispatched', ambulance_number: 'AMB-' + Math.floor(1000 + Math.random() * 9000), eta_minutes: Math.floor(8 + Math.random() * 12), driver_name: driver.name, driver_phone: driver.phone, created_at: new Date().toISOString() };
            return Promise.resolve(req);
        },
    },
    medicine: {
        catalog: (params = {}) => {
            let m = [...MEDICINES];
            if (params.category) m = m.filter(x => x.category.toLowerCase() === params.category.toLowerCase());
            if (params.search) m = m.filter(x => x.name.toLowerCase().includes(params.search.toLowerCase()));
            return Promise.resolve(m);
        },
        categories: () => Promise.resolve([...new Set(MEDICINES.map(m => m.category))].sort()),
        order: (data) => Promise.resolve({ id: ++_store._nextId, status: 'processing', ...data }),
    },
    donors: {
        bloodDonors: (type) => Promise.resolve(_store.bloodDonors.filter(d => d.blood_type === type)),
        organDonors: (organ) => Promise.resolve(_store.organDonors.filter(d => d.organ === organ)),
        bloodTypes: () => Promise.resolve([...new Set(_store.bloodDonors.map(d => d.blood_type))]),
        organTypes: () => Promise.resolve([...new Set(_store.organDonors.map(d => d.organ))]),
        registerBlood: (data) => { _store.bloodDonors.push({ id: ++_store._nextId, ...data, available: 1 }); return Promise.resolve({ message: 'Registered' }); },
        registerOrgan: (data) => { _store.organDonors.push({ id: ++_store._nextId, ...data, available: 1 }); return Promise.resolve({ message: 'Registered' }); },
    },
    profile: {
        get: () => Promise.resolve({ ..._store.user }),
        update: (data) => { Object.assign(_store.user, data); return Promise.resolve(_store.user); },
        appointments: () => Promise.resolve(_store.appointments),
        transactions: () => Promise.resolve(_store.transactions),
        records: () => Promise.resolve(_store.records),
        addRecord: (data) => { const r = { id: ++_store._nextId, ...data }; _store.records.push(r); return Promise.resolve(r); },
    },
    news: {
        list: () => Promise.resolve([
            { id: 1, title: 'WHO Reports Decline in Global Malaria Cases', summary: 'Global malaria cases decreased by 12%.', source: 'WHO', icon: '🦟', time: '2 hours ago' },
            { id: 2, title: 'India Launches Universal Health Coverage Scheme', summary: 'Ayushman Bharat expansion for 50 million families.', source: 'Ministry of Health', icon: '🏥', time: '5 hours ago' },
            { id: 3, title: 'Breakthrough in AI-Powered Cancer Detection', summary: 'AI detects early-stage cancer with 97% accuracy.', source: 'Nature Medicine', icon: '🔬', time: '1 day ago' },
            { id: 4, title: 'New Guidelines for Digital Health Records', summary: 'NHA releases updated ABHA guidelines.', source: 'NHA', icon: '📋', time: '1 day ago' },
            { id: 5, title: 'COVID-19 Booster Shots Now Available at PHCs', summary: 'Updated boosters at all Primary Health Centres.', source: 'ICMR', icon: '💉', time: '2 days ago' },
            { id: 6, title: 'Mental Health Awareness Reaches Record High', summary: '40% increase in rural mental health awareness.', source: 'NIMHANS', icon: '🧠', time: '3 days ago' },
        ]),
    },
    chatbot: {
        chat: (message) => {
            const KB = [
                { kw: ['appointment', 'book', 'schedule', 'doctor visit'], resp: "To book an appointment:\n1. Go to 'Find Doctors' from the sidebar\n2. Browse or search for a specialist\n3. Click 'Book Appointment'\n4. Choose your preferred date and time slot\n5. Add symptoms/reason\n6. Select payment method (UPI/Card/Net Banking)\n7. Confirm booking!\n\nYou can also book via the Telemedicine section for video consultations." },
                { kw: ['emergency', 'ambulance', '108', 'urgent', 'accident'], resp: "🚨 For emergencies:\n• Click the 🚨 Emergency button in the header\n• Or call 108 (Toll-free) for ambulance\n• Average ambulance response: 8-20 minutes\n• You'll get driver name, contact & live tracking\n• For immediate help, describe your emergency type\n\nEmergency services are available 24/7." },
                { kw: ['symptom', 'sick', 'fever', 'pain', 'cough', 'cold', 'headache'], resp: "For symptom checking:\n1. Go to 'Symptom Checker' from sidebar\n2. Type your symptoms freely in the text box\n3. You can also use voice input (click microphone)\n4. Add patient details (age, gender, etc.)\n5. Set pain scale and duration\n6. Upload any medical images if needed\n7. Click 'Analyse' for AI recommendations\n\nThe AI will suggest urgency level and recommend specialists." },
                { kw: ['medicine', 'drug', 'pharmacy', 'order', 'tablet'], resp: "To order medicines:\n1. Go to 'Medicine Delivery' section\n2. Search for your medicine or browse categories\n3. Add items to your cart\n4. Enter delivery address\n5. Pay via UPI/Card/Net Banking\n6. Expected delivery: 2-4 hours\n\n💡 Free delivery on orders above ₹299!" },
                { kw: ['hospital', 'nearby', 'bed', 'icu'], resp: "To find nearby hospitals:\n1. Click 'Emergency & Hospitals' in sidebar\n2. View live map with hospital markers\n3. Click any marker for details (beds, ICU, phone)\n4. Red markers = Emergency hospitals\n5. Blue = Government, Green = Private\n\nYou can also use 'Detect My Live Location' for nearest results." },
                { kw: ['payment', 'pay', 'upi', 'card', 'billing'], resp: "Payment options available:\n• UPI (GPay, PhonePe, Paytm, BHIM) — enter your UPI ID\n• Credit/Debit Cards\n• Net Banking (SBI, HDFC, ICICI, PNB, etc.)\n\n🔒 All payments are 256-bit SSL encrypted and PCI DSS compliant.\n\nFor UPI, you'll be redirected to your UPI app directly." },
                { kw: ['blood', 'donate', 'donor', 'organ'], resp: "Blood & Organ Donation:\n1. Go to 'Blood & Organ Donor' section\n2. Search by blood type (A+, B+, O+, etc.)\n3. View donor details and contact them\n4. Register yourself as a donor to save lives!\n\nAll blood types and organ donors are available in our database." },
                { kw: ['profile', 'account', 'personal', 'details'], resp: "To manage your profile:\n1. Click your avatar icon (top right)\n2. View and edit personal details\n3. See appointment history\n4. View transaction records\n5. Update medical information\n\nEnsure your profile is complete for better healthcare experience." },
                { kw: ['telemedicine', 'video', 'online', 'consult'], resp: "Telemedicine consultation:\n1. Go to 'Telemedicine' section\n2. Browse available doctors\n3. Click a doctor to book directly\n4. Choose date and time slot\n5. Describe your health concern\n6. Consultation fee: ₹200-₹800\n7. Mode: Video/Audio via WhatsApp or Zoom\n\nDoctors are available 09:00-17:00." },
                { kw: ['diet', 'food', 'nutrition', 'healthy'], resp: "For diet & nutrition plans:\n1. Go to 'Diet & Lifestyle' section\n2. Get personalized diet recommendations\n3. Plans based on common Indian diets\n4. Recovery-specific meal suggestions\n\nGeneral tips: Stay hydrated, eat fruits rich in Vitamin C, avoid oily food during illness." },
                { kw: ['hello', 'hi', 'hey', 'namaste', 'good'], resp: "Namaste! 🙏 Welcome to MediConnect!\n\nI'm your AI powered Health Assistant. I can help you with:\n• 📅 Booking appointments\n• 🩺 Symptom checking\n• 💊 Medicine ordering\n• 🏥 Finding hospitals\n• 🚑 Emergency services\n• 💳 Payments\n• 🩸 Blood donation\n\nJust ask me anything!" },
                { kw: ['thank', 'thanks', 'bye', 'ok'], resp: "You're welcome! 😊 Stay healthy and take care. Remember, MediConnect is available 24/7 for your healthcare needs. Don't hesitate to reach out anytime! 🏥" },
            ];
            const lower = message.toLowerCase();
            let best = null, bestScore = 0;
            for (const entry of KB) {
                const score = entry.kw.filter(k => lower.includes(k)).length;
                if (score > bestScore) { bestScore = score; best = entry; }
            }
            const response = best && bestScore > 0 ? best.resp : "Hello! I'm MediConnect AI powered Health Assistant. I can help you with:\n\n• Booking appointments with doctors\n• Checking symptoms with AI\n• Finding nearby hospitals\n• Ordering medicines\n• Emergency ambulance services\n• Payment queries\n• Blood & organ donation\n\nPlease ask me about any of these topics!";
            return Promise.resolve({ message, response, id: Date.now() });
        },
        history: () => Promise.resolve([]),
    },
};

// ---- Payment Modal ----
function showPaymentModal(amount, description, onSuccess) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">💳 Payment</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div style="text-align:center;margin-bottom:18px;">
        <div class="text-muted text-sm">${description}</div>
        <div style="font-size:32px;font-weight:800;color:var(--success);margin-top:6px;">₹${amount}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px;">
        <button class="payment-method-btn" onclick="selectPayment(this,'UPI')"><span style="font-size:20px;">📱</span> UPI (GPay / PhonePe / Paytm)</button>
        <button class="payment-method-btn" onclick="selectPayment(this,'Credit Card')"><span style="font-size:20px;">💳</span> Credit / Debit Card</button>
        <button class="payment-method-btn" onclick="selectPayment(this,'Net Banking')"><span style="font-size:20px;">🏛️</span> Net Banking</button>
      </div>
      <div id="payment-form-area"></div>
      <button class="btn btn-success btn-full btn-lg" id="pay-confirm-btn" style="display:none;" onclick="confirmPayment()">
        <i class="fas fa-lock"></i> Pay ₹${amount} Securely
      </button>
      <div class="text-center text-xs text-muted mt-2">🔒 256-bit SSL Encrypted · PCI DSS Compliant</div>
    </div>
  `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    let selectedMethod = '';
    window.selectPayment = (btn, method) => {
        selectedMethod = method;
        document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('pay-confirm-btn').style.display = 'flex';
        const area = document.getElementById('payment-form-area');
        if (method === 'UPI') {
            area.innerHTML = `<div class="form-group"><label class="form-label">UPI ID</label><input class="form-control" placeholder="name@upi" id="upi-id" /></div><div style="display:flex;gap:6px;margin-top:6px;"><span class="tag">GPay</span><span class="tag">PhonePe</span><span class="tag">Paytm</span><span class="tag">BHIM</span></div>`;
        } else if (method === 'Credit Card') {
            area.innerHTML = '<div class="form-group"><label class="form-label">Card Number</label><input class="form-control" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" /></div><div class="form-row"><div class="form-group"><label class="form-label">Expiry</label><input class="form-control" placeholder="MM/YY" maxlength="5" /></div><div class="form-group"><label class="form-label">CVV</label><input class="form-control" placeholder="***" maxlength="3" type="password" /></div></div>';
        } else {
            area.innerHTML = '<div class="form-group"><label class="form-label">Select Bank</label><select class="form-control"><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Punjab National Bank</option><option>Bank of Baroda</option><option>Axis Bank</option></select></div>';
        }
    };
    window.confirmPayment = () => {
        if (selectedMethod === 'UPI') {
            const upiId = document.getElementById('upi-id')?.value?.trim();
            if (!upiId) { showToast('Please enter your UPI ID', 'warning'); return; }
            // Generate UPI deep link
            const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=MediConnect&am=${amount}&cu=INR&tn=${encodeURIComponent(description)}`;
            window.open(upiLink, '_blank');
            showToast(`UPI payment request sent to ${upiId}. Complete in your UPI app. ✅`);
        } else {
            showToast(`Payment of ₹${amount} via ${selectedMethod} successful! ✅`);
        }
        overlay.remove();
        if (onSuccess) onSuccess(selectedMethod);
    };
}
