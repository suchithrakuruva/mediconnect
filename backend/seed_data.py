from models import db, Doctor, Hospital, HealthAlert, BloodDonor, OrganDonor, PatientRecord, Transaction, User, Patient

def seed_all():
    if Doctor.query.count() > 0:
        return

    # Demo user
    user = User(name='Arun Kumar', email='arun@mediconnect.in', password_hash='demo',
                role='patient', phone='9876543210', age=28, gender='Male',
                height_cm=175, weight_kg=70, address='42, Anna Nagar East',
                city='Chennai', state='Tamil Nadu', pincode='600102')
    db.session.add(user)
    db.session.flush()

    patient = Patient(user_id=user.id, age=28, gender='Male', blood_group='O+',
                      phone='9876543210', address='42, Anna Nagar East',
                      city='Chennai', state='Tamil Nadu', height_cm=175, weight_kg=70,
                      emergency_contact='Father: 9876500000')
    db.session.add(patient)

    doctors = [
        Doctor(name='Dr. Priya Sharma', specialization='Cardiologist', qualification='MBBS, MD (Cardiology)',
               experience_years=15, hospital='AIIMS Delhi', city='New Delhi', state='Delhi',
               phone='9810012345', email='priya.sharma@aiims.edu', languages='Hindi,English',
               rating=4.8, consultation_fee=800, available=True, telemedicine=True, available_time='09:00 - 17:00'),
        Doctor(name='Dr. Rajesh Kumar', specialization='General Physician', qualification='MBBS, MD',
               experience_years=10, hospital='Civil Hospital Lucknow', city='Lucknow', state='Uttar Pradesh',
               phone='9935012345', languages='Hindi,Urdu,English',
               rating=4.5, consultation_fee=200, available=True, telemedicine=True, available_time='08:00 - 16:00'),
        Doctor(name='Dr. Anitha Menon', specialization='Gynecologist', qualification='MBBS, MS (Obs & Gyn)',
               experience_years=18, hospital='Govt Medical College Trivandrum', city='Thiruvananthapuram',
               state='Kerala', phone='9847012345', languages='Malayalam,English,Hindi',
               rating=4.9, consultation_fee=500, available=True, telemedicine=True, available_time='10:00 - 18:00'),
        Doctor(name='Dr. Suresh Patel', specialization='Orthopedician', qualification='MBBS, MS (Ortho)',
               experience_years=12, hospital='Civil Hospital Ahmedabad', city='Ahmedabad', state='Gujarat',
               phone='9824012345', languages='Gujarati,Hindi,English',
               rating=4.3, consultation_fee=400, available=True, telemedicine=False, available_time='09:00 - 15:00'),
        Doctor(name='Dr. Meera Iyer', specialization='Pediatrician', qualification='MBBS, MD (Pediatrics)',
               experience_years=8, hospital='KEM Hospital Mumbai', city='Mumbai', state='Maharashtra',
               phone='9820012345', languages='Marathi,Hindi,English',
               rating=4.7, consultation_fee=600, available=True, telemedicine=True, available_time='09:00 - 17:00'),
        Doctor(name='Dr. Amitabh Singh', specialization='Dermatologist', qualification='MBBS, MD (Skin)',
               experience_years=9, hospital='PGI Chandigarh', city='Chandigarh', state='Punjab',
               phone='9814012345', languages='Punjabi,Hindi,English',
               rating=4.4, consultation_fee=450, available=True, telemedicine=True, available_time='10:00 - 16:00'),
        Doctor(name='Dr. Kavitha Reddy', specialization='Neurologist', qualification='MBBS, DM (Neurology)',
               experience_years=16, hospital='Osmania General Hospital', city='Hyderabad', state='Telangana',
               phone='9848012345', languages='Telugu,Hindi,English',
               rating=4.6, consultation_fee=700, available=True, telemedicine=True, available_time='09:00 - 17:00'),
        Doctor(name='Dr. Ramesh Babu', specialization='General Physician', qualification='MBBS',
               experience_years=5, hospital='PHC Nalanda', city='Nalanda', state='Bihar',
               phone='9801012345', languages='Bhojpuri,Hindi',
               rating=4.2, consultation_fee=100, available=True, telemedicine=True, available_time='08:00 - 14:00'),
        Doctor(name='Dr. Sunita Chauhan', specialization='ENT Specialist', qualification='MBBS, MS (ENT)',
               experience_years=11, hospital='SMS Hospital Jaipur', city='Jaipur', state='Rajasthan',
               phone='9829012345', languages='Rajasthani,Hindi,English',
               rating=4.5, consultation_fee=350, available=True, telemedicine=False, available_time='09:00 - 15:00'),
        Doctor(name='Dr. Prakash Nair', specialization='Psychiatrist', qualification='MBBS, MD (Psychiatry)',
               experience_years=14, hospital='NIMHANS Bangalore', city='Bengaluru', state='Karnataka',
               phone='9845012345', languages='Kannada,Malayalam,English,Hindi',
               rating=4.7, consultation_fee=600, available=True, telemedicine=True, available_time='10:00 - 18:00'),
        Doctor(name='Dr. Deepa Mukherjee', specialization='Endocrinologist', qualification='MBBS, DM (Endocrinology)',
               experience_years=13, hospital='SSKM Hospital Kolkata', city='Kolkata', state='West Bengal',
               phone='9831012345', languages='Bengali,Hindi,English',
               rating=4.6, consultation_fee=650, available=True, telemedicine=True, available_time='09:00 - 16:00'),
        Doctor(name='Dr. Vinod Rathod', specialization='General Surgeon', qualification='MBBS, MS (Surgery)',
               experience_years=20, hospital='Government Hospital Nagpur', city='Nagpur', state='Maharashtra',
               phone='9822012345', languages='Marathi,Hindi,English',
               rating=4.4, consultation_fee=500, available=True, telemedicine=False, available_time='08:00 - 14:00'),
        Doctor(name='Dr. Lalitha Devi', specialization='Ophthalmologist', qualification='MBBS, MS (Ophthalmology)',
               experience_years=7, hospital='Sankara Nethralaya Chennai', city='Chennai', state='Tamil Nadu',
               phone='9842012345', languages='Tamil,Telugu,English',
               rating=4.8, consultation_fee=400, available=True, telemedicine=True, available_time='09:00 - 17:00'),
        Doctor(name='Dr. Arun Joshi', specialization='Nephrologist', qualification='MBBS, DM (Nephrology)',
               experience_years=17, hospital='SGPGI Lucknow', city='Lucknow', state='Uttar Pradesh',
               phone='9839012345', languages='Hindi,English',
               rating=4.5, consultation_fee=800, available=True, telemedicine=True, available_time='10:00 - 16:00'),
        Doctor(name='Dr. Fatima Khan', specialization='General Physician', qualification='MBBS, MD',
               experience_years=6, hospital='PHC Mallapuram', city='Malappuram', state='Kerala',
               phone='9846012345', languages='Malayalam,Arabic,Hindi,English',
               rating=4.3, consultation_fee=150, available=True, telemedicine=True, available_time='08:00 - 16:00'),
    ]

    hospitals = [
        Hospital(name='AIIMS New Delhi', type='Government', address='Sri Aurobindo Marg, Ansari Nagar',
                 city='New Delhi', state='Delhi', phone='011-26588500',
                 beds=2444, icu_beds=120, available_beds=180,
                 latitude=28.5672, longitude=77.2100,
                 facilities='Emergency,ICU,Trauma Center,Dialysis,Cancer Care,Cardiac Surgery',
                 emergency=True, rating=4.8, available_time='24/7'),
        Hospital(name='KEM Hospital', type='Government', address='Acharya Donde Marg, Parel',
                 city='Mumbai', state='Maharashtra', phone='022-24107000',
                 beds=1900, icu_beds=100, available_beds=142,
                 latitude=18.9973, longitude=72.8419,
                 facilities='Emergency,ICU,Trauma,Dialysis,Cardiology',
                 emergency=True, rating=4.5, available_time='24/7'),
        Hospital(name='NIMHANS', type='Government', address='Hosur Road, Lakkasandra',
                 city='Bengaluru', state='Karnataka', phone='080-46110007',
                 beds=800, icu_beds=40, available_beds=60,
                 latitude=12.9426, longitude=77.5968,
                 facilities='Psychiatry,Neurology,Neurosurgery',
                 emergency=True, rating=4.7, available_time='24/7'),
        Hospital(name='Govt Medical College Trivandrum', type='Government',
                 address='Medical College Road', city='Thiruvananthapuram', state='Kerala',
                 phone='0471-2528386', beds=2500, icu_beds=140, available_beds=200,
                 latitude=8.5194, longitude=76.9202,
                 facilities='Emergency,ICU,Maternity,Pediatrics,Oncology',
                 emergency=True, rating=4.6, available_time='24/7'),
        Hospital(name='SMS Hospital Jaipur', type='Government', address='J.L.N. Marg',
                 city='Jaipur', state='Rajasthan', phone='0141-2518888',
                 beds=3700, icu_beds=160, available_beds=290,
                 latitude=26.9124, longitude=75.8224,
                 facilities='Emergency,Trauma,ICU,Burn Unit,Dialysis',
                 emergency=True, rating=4.3, available_time='24/7'),
        Hospital(name='PHC Nalanda', type='PHC', address='Block Road, Bihar Sharif',
                 city='Nalanda', state='Bihar', phone='06112-222333',
                 beds=50, icu_beds=2, available_beds=15,
                 latitude=25.1987, longitude=85.5206,
                 facilities='OPD,Maternity,Basic Diagnostics',
                 emergency=False, rating=3.2, available_time='08:00 - 16:00'),
        Hospital(name='CHC Raebareli', type='CHC', address='Dalmau Road',
                 city='Raebareli', state='Uttar Pradesh', phone='0535-2201234',
                 beds=100, icu_beds=5, available_beds=30,
                 latitude=26.2340, longitude=81.2423,
                 facilities='OPD,Surgery,Maternity,X-Ray',
                 emergency=True, rating=3.5, available_time='24/7'),
        Hospital(name='Osmania General Hospital', type='Government', address='Afzal Gunj',
                 city='Hyderabad', state='Telangana', phone='040-24600116',
                 beds=1000, icu_beds=60, available_beds=80,
                 latitude=17.3850, longitude=78.4867,
                 facilities='Emergency,Trauma,ICU,Cardiology,Neurology',
                 emergency=True, rating=4.2, available_time='24/7'),
        Hospital(name='Sankara Nethralaya', type='Private', address='18, College Road',
                 city='Chennai', state='Tamil Nadu', phone='044-28271616',
                 beds=500, icu_beds=20, available_beds=45,
                 latitude=13.0615, longitude=80.2382,
                 facilities='Ophthalmology,Optometry,Pediatric Eye Care',
                 emergency=False, rating=4.9, available_time='08:00 - 20:00'),
        Hospital(name='SSKM Hospital', type='Government', address='244, AJC Bose Road',
                 city='Kolkata', state='West Bengal', phone='033-22041938',
                 beds=1200, icu_beds=80, available_beds=100,
                 latitude=22.5448, longitude=88.3461,
                 facilities='Emergency,ICU,Cardiac,Trauma,Dialysis',
                 emergency=True, rating=4.3, available_time='24/7'),
        Hospital(name='PGI Chandigarh', type='Government', address='Sector 12, Chandigarh',
                 city='Chandigarh', state='Punjab', phone='0172-2756565',
                 beds=2100, icu_beds=110, available_beds=165,
                 latitude=30.7650, longitude=76.7760,
                 facilities='Emergency,ICU,Transplant,Cardiology,Oncology',
                 emergency=True, rating=4.7, available_time='24/7'),
        Hospital(name='SGPGI Lucknow', type='Government', address='Raebareli Road',
                 city='Lucknow', state='Uttar Pradesh', phone='0522-2668700',
                 beds=800, icu_beds=70, available_beds=85,
                 latitude=26.7606, longitude=80.9897,
                 facilities='Organ Transplant,Nephrology,Cardiology,Neurology',
                 emergency=True, rating=4.6, available_time='24/7'),
    ]

    alerts = [
        HealthAlert(title='Dengue Alert – Mumbai', description='Rising dengue cases reported in western suburbs.',
                    disease='Dengue', state='Maharashtra', city='Mumbai', severity='high', cases=342),
        HealthAlert(title='Malaria Advisory – Bihar', description='Increased malaria transmission in flood-affected areas.',
                    disease='Malaria', state='Bihar', city='Patna', severity='medium', cases=218),
        HealthAlert(title='TB Screening – UP', description='Free TB screening camps in Lucknow and Varanasi.',
                    disease='Tuberculosis', state='Uttar Pradesh', city='Lucknow', severity='low', cases=95),
        HealthAlert(title='Cholera Warning – West Bengal', description='Cholera cases detected near Hooghly river areas.',
                    disease='Cholera', state='West Bengal', city='Kolkata', severity='high', cases=67),
        HealthAlert(title='Chikungunya Alert – Karnataka', description='Post-monsoon Chikungunya surge in coastal areas.',
                    disease='Chikungunya', state='Karnataka', city='Mangaluru', severity='medium', cases=156),
    ]

    # Blood Donors
    blood_donors = [
        BloodDonor(name='Rahul Verma', age=27, blood_type='A+', phone='9876001001', city='New Delhi', state='Delhi', available=True, last_donation='2025-12-10'),
        BloodDonor(name='Sneha Patil', age=32, blood_type='A+', phone='9876001002', city='Mumbai', state='Maharashtra', available=True, last_donation='2025-11-20'),
        BloodDonor(name='Vikram Singh', age=24, blood_type='B+', phone='9876001003', city='Jaipur', state='Rajasthan', available=True, last_donation='2026-01-05'),
        BloodDonor(name='Pooja Nair', age=29, blood_type='B+', phone='9876001004', city='Thiruvananthapuram', state='Kerala', available=True, last_donation='2025-10-15'),
        BloodDonor(name='Arjun Reddy', age=35, blood_type='O+', phone='9876001005', city='Hyderabad', state='Telangana', available=True, last_donation='2026-01-20'),
        BloodDonor(name='Divya Sharma', age=22, blood_type='O+', phone='9876001006', city='Lucknow', state='Uttar Pradesh', available=True, last_donation='2025-09-30'),
        BloodDonor(name='Karan Mehta', age=30, blood_type='O-', phone='9876001007', city='Ahmedabad', state='Gujarat', available=True, last_donation='2025-12-01'),
        BloodDonor(name='Ananya Das', age=26, blood_type='AB+', phone='9876001008', city='Kolkata', state='West Bengal', available=True, last_donation='2026-02-01'),
        BloodDonor(name='Sunil Kumar', age=40, blood_type='AB+', phone='9876001009', city='Chennai', state='Tamil Nadu', available=True, last_donation='2025-11-10'),
        BloodDonor(name='Priti Yadav', age=28, blood_type='A-', phone='9876001010', city='Bengaluru', state='Karnataka', available=True, last_donation='2026-01-15'),
        BloodDonor(name='Mohan Lal', age=45, blood_type='B-', phone='9876001011', city='Chandigarh', state='Punjab', available=True, last_donation='2025-10-05'),
        BloodDonor(name='Ritu Saxena', age=33, blood_type='AB-', phone='9876001012', city='Nagpur', state='Maharashtra', available=True, last_donation='2025-08-20'),
        BloodDonor(name='Amit Jha', age=31, blood_type='O-', phone='9876001013', city='Nalanda', state='Bihar', available=True, last_donation='2025-12-25'),
        BloodDonor(name='Lakshmi Iyer', age=38, blood_type='A+', phone='9876001014', city='Chennai', state='Tamil Nadu', available=True, last_donation='2026-01-30'),
    ]

    # Organ Donors
    organ_donors = [
        OrganDonor(name='Sanjay Gupta', age=45, organ='Kidney', blood_type='O+', phone='9876002001', city='New Delhi', state='Delhi', available=True),
        OrganDonor(name='Meenakshi Raman', age=38, organ='Liver', blood_type='A+', phone='9876002002', city='Chennai', state='Tamil Nadu', available=True),
        OrganDonor(name='Rajendra Prasad', age=50, organ='Cornea', blood_type='B+', phone='9876002003', city='Hyderabad', state='Telangana', available=True),
        OrganDonor(name='Fatima Begum', age=42, organ='Kidney', blood_type='AB+', phone='9876002004', city='Mumbai', state='Maharashtra', available=True),
        OrganDonor(name='Harish Chandra', age=55, organ='Heart', blood_type='O-', phone='9876002005', city='Lucknow', state='Uttar Pradesh', available=True),
        OrganDonor(name='Padma Lakshmi', age=35, organ='Bone Marrow', blood_type='A-', phone='9876002006', city='Bengaluru', state='Karnataka', available=True),
        OrganDonor(name='Dinesh Patel', age=48, organ='Liver', blood_type='B+', phone='9876002007', city='Ahmedabad', state='Gujarat', available=True),
        OrganDonor(name='Geeta Devi', age=40, organ='Cornea', blood_type='O+', phone='9876002008', city='Jaipur', state='Rajasthan', available=True),
        OrganDonor(name='Biswajit Sen', age=52, organ='Kidney', blood_type='AB-', phone='9876002009', city='Kolkata', state='West Bengal', available=True),
        OrganDonor(name='Revathi Menon', age=37, organ='Lung', blood_type='A+', phone='9876002010', city='Thiruvananthapuram', state='Kerala', available=True),
    ]

    # Patient Records
    records = [
        PatientRecord(patient_id=1, name='Arun Kumar', age=28, hospital_name='AIIMS New Delhi',
                      room_number='305-A', bed_number='B-12', patient_number='MED-2026-001',
                      admission_date='2026-01-15', status='discharged', diagnosis='Viral Fever'),
        PatientRecord(patient_id=1, name='Arun Kumar', age=28, hospital_name='KEM Hospital',
                      room_number='210-B', bed_number='B-04', patient_number='MED-2026-042',
                      admission_date='2026-02-05', status='admitted', diagnosis='Observation - Chest Pain'),
    ]

    # Sample Transactions
    transactions = [
        Transaction(user_id=1, type='appointment', reference_id=1, amount=800, payment_method='UPI - GPay',
                    status='completed', description='Consultation with Dr. Priya Sharma'),
        Transaction(user_id=1, type='medicine', reference_id=1, amount=450, payment_method='Credit Card',
                    status='completed', description='Medicine order - Paracetamol, Cetirizine'),
        Transaction(user_id=1, type='appointment', reference_id=2, amount=600, payment_method='UPI - PhonePe',
                    status='completed', description='Teleconsult with Dr. Meera Iyer'),
        Transaction(user_id=1, type='ambulance', reference_id=1, amount=0, payment_method='Free (108)',
                    status='completed', description='Emergency ambulance - AIIMS Delhi'),
    ]

    db.session.add_all(doctors)
    db.session.add_all(hospitals)
    db.session.add_all(alerts)
    db.session.add_all(blood_donors)
    db.session.add_all(organ_donors)
    db.session.add_all(records)
    db.session.add_all(transactions)
    db.session.commit()
    print("✅ Seed data loaded: 15 doctors, 12 hospitals, 5 alerts, 14 blood donors, 10 organ donors, 2 records, 4 transactions")
