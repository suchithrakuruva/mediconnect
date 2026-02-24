from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='patient')
    phone = db.Column(db.String(15), default='')
    photo_url = db.Column(db.String(300), default='')
    age = db.Column(db.Integer, default=0)
    gender = db.Column(db.String(10), default='')
    height_cm = db.Column(db.Float, default=0)
    weight_kg = db.Column(db.Float, default=0)
    address = db.Column(db.String(500), default='')
    city = db.Column(db.String(100), default='')
    state = db.Column(db.String(100), default='')
    pincode = db.Column(db.String(10), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'email': self.email, 'role': self.role,
            'phone': self.phone, 'photo_url': self.photo_url, 'age': self.age,
            'gender': self.gender, 'height_cm': self.height_cm, 'weight_kg': self.weight_kg,
            'address': self.address, 'city': self.city, 'state': self.state, 'pincode': self.pincode,
            'created_at': str(self.created_at)
        }


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    blood_group = db.Column(db.String(5))
    phone = db.Column(db.String(15))
    address = db.Column(db.String(300))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    medical_history = db.Column(db.Text, default='')
    allergies = db.Column(db.String(300), default='')
    current_medications = db.Column(db.String(300), default='')
    emergency_contact = db.Column(db.String(200))
    height_cm = db.Column(db.Float, default=0)
    weight_kg = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'user_id': self.user_id, 'age': self.age,
            'gender': self.gender, 'blood_group': self.blood_group,
            'phone': self.phone, 'address': self.address, 'city': self.city,
            'state': self.state, 'medical_history': self.medical_history,
            'allergies': self.allergies, 'current_medications': self.current_medications,
            'emergency_contact': self.emergency_contact,
            'height_cm': self.height_cm, 'weight_kg': self.weight_kg
        }


class Doctor(db.Model):
    __tablename__ = 'doctors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    specialization = db.Column(db.String(120), nullable=False)
    qualification = db.Column(db.String(200))
    experience_years = db.Column(db.Integer, default=0)
    hospital = db.Column(db.String(200))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    phone = db.Column(db.String(15))
    email = db.Column(db.String(120))
    languages = db.Column(db.String(200), default='Hindi,English')
    rating = db.Column(db.Float, default=4.0)
    consultation_fee = db.Column(db.Integer, default=300)
    available = db.Column(db.Boolean, default=True)
    telemedicine = db.Column(db.Boolean, default=False)
    photo_url = db.Column(db.String(300), default='')
    available_time = db.Column(db.String(100), default='09:00 - 17:00')

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'specialization': self.specialization,
            'qualification': self.qualification, 'experience_years': self.experience_years,
            'hospital': self.hospital, 'city': self.city, 'state': self.state,
            'phone': self.phone, 'email': self.email,
            'languages': self.languages.split(',') if self.languages else [],
            'rating': self.rating, 'consultation_fee': self.consultation_fee,
            'available': self.available, 'telemedicine': self.telemedicine,
            'photo_url': self.photo_url, 'available_time': self.available_time
        }


class Hospital(db.Model):
    __tablename__ = 'hospitals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50))
    address = db.Column(db.String(300))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    phone = db.Column(db.String(15))
    beds = db.Column(db.Integer, default=0)
    icu_beds = db.Column(db.Integer, default=0)
    available_beds = db.Column(db.Integer, default=0)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    facilities = db.Column(db.Text, default='')
    emergency = db.Column(db.Boolean, default=False)
    rating = db.Column(db.Float, default=3.5)
    available_time = db.Column(db.String(100), default='24/7')

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'type': self.type,
            'address': self.address, 'city': self.city, 'state': self.state,
            'phone': self.phone, 'beds': self.beds, 'icu_beds': self.icu_beds,
            'available_beds': self.available_beds, 'latitude': self.latitude,
            'longitude': self.longitude,
            'facilities': self.facilities.split(',') if self.facilities else [],
            'emergency': self.emergency, 'rating': self.rating,
            'available_time': self.available_time
        }


class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
    appointment_date = db.Column(db.String(20))
    appointment_time = db.Column(db.String(10))
    status = db.Column(db.String(20), default='scheduled')
    type = db.Column(db.String(20), default='in-person')
    symptoms = db.Column(db.Text, default='')
    notes = db.Column(db.Text, default='')
    payment_status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50), default='')
    amount = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'patient_id': self.patient_id, 'doctor_id': self.doctor_id,
            'appointment_date': self.appointment_date, 'appointment_time': self.appointment_time,
            'status': self.status, 'type': self.type, 'symptoms': self.symptoms,
            'notes': self.notes, 'payment_status': self.payment_status,
            'payment_method': self.payment_method, 'amount': self.amount,
            'created_at': str(self.created_at)
        }


class SymptomLog(db.Model):
    __tablename__ = 'symptom_logs'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    symptoms = db.Column(db.Text)
    triage_result = db.Column(db.String(50))
    recommended_specialty = db.Column(db.String(100))
    recommendation = db.Column(db.Text)
    duration_days = db.Column(db.Integer, default=0)
    pain_scale = db.Column(db.Integer, default=0)
    height_cm = db.Column(db.Float, default=0)
    weight_kg = db.Column(db.Float, default=0)
    gender = db.Column(db.String(10), default='')
    uploaded_files = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'symptoms': self.symptoms, 'triage_result': self.triage_result,
            'recommended_specialty': self.recommended_specialty,
            'recommendation': self.recommendation, 'duration_days': self.duration_days,
            'pain_scale': self.pain_scale, 'created_at': str(self.created_at)
        }


class MedicineOrder(db.Model):
    __tablename__ = 'medicine_orders'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    medicines = db.Column(db.Text)
    total_amount = db.Column(db.Float)
    status = db.Column(db.String(30), default='pending')
    delivery_address = db.Column(db.String(300))
    payment_status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'medicines': self.medicines, 'total_amount': self.total_amount,
            'status': self.status, 'delivery_address': self.delivery_address,
            'payment_status': self.payment_status, 'payment_method': self.payment_method,
            'created_at': str(self.created_at)
        }


class AmbulanceRequest(db.Model):
    __tablename__ = 'ambulance_requests'
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(120))
    phone = db.Column(db.String(15))
    pickup_address = db.Column(db.String(300))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    emergency_type = db.Column(db.String(100))
    status = db.Column(db.String(30), default='requested')
    ambulance_number = db.Column(db.String(20))
    eta_minutes = db.Column(db.Integer, default=12)
    hospital_id = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'patient_name': self.patient_name, 'phone': self.phone,
            'pickup_address': self.pickup_address, 'emergency_type': self.emergency_type,
            'status': self.status, 'ambulance_number': self.ambulance_number,
            'eta_minutes': self.eta_minutes, 'hospital_id': self.hospital_id,
            'created_at': str(self.created_at)
        }


class HealthAlert(db.Model):
    __tablename__ = 'health_alerts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    disease = db.Column(db.String(100))
    state = db.Column(db.String(100))
    city = db.Column(db.String(100))
    severity = db.Column(db.String(20))
    cases = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'title': self.title, 'description': self.description,
            'disease': self.disease, 'state': self.state, 'city': self.city,
            'severity': self.severity, 'cases': self.cases, 'created_at': str(self.created_at)
        }


class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, default=1)
    type = db.Column(db.String(50))  # appointment, medicine, ambulance
    reference_id = db.Column(db.Integer)
    amount = db.Column(db.Float, default=0)
    payment_method = db.Column(db.String(50), default='')
    status = db.Column(db.String(20), default='completed')
    description = db.Column(db.String(300), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'user_id': self.user_id, 'type': self.type,
            'reference_id': self.reference_id, 'amount': self.amount,
            'payment_method': self.payment_method, 'status': self.status,
            'description': self.description, 'created_at': str(self.created_at)
        }


class BloodDonor(db.Model):
    __tablename__ = 'blood_donors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer)
    blood_type = db.Column(db.String(5), nullable=False)
    phone = db.Column(db.String(15))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    available = db.Column(db.Boolean, default=True)
    last_donation = db.Column(db.String(20), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'age': self.age,
            'blood_type': self.blood_type, 'phone': self.phone,
            'city': self.city, 'state': self.state, 'available': self.available,
            'last_donation': self.last_donation
        }


class OrganDonor(db.Model):
    __tablename__ = 'organ_donors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer)
    organ = db.Column(db.String(50), nullable=False)
    blood_type = db.Column(db.String(5))
    phone = db.Column(db.String(15))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'age': self.age,
            'organ': self.organ, 'blood_type': self.blood_type,
            'phone': self.phone, 'city': self.city, 'state': self.state,
            'available': self.available
        }


class PatientRecord(db.Model):
    __tablename__ = 'patient_records'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, default=1)
    name = db.Column(db.String(120))
    age = db.Column(db.Integer)
    hospital_name = db.Column(db.String(200))
    room_number = db.Column(db.String(20))
    bed_number = db.Column(db.String(20))
    patient_number = db.Column(db.String(30))
    admission_date = db.Column(db.String(20))
    status = db.Column(db.String(30), default='admitted')
    diagnosis = db.Column(db.String(300), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'patient_id': self.patient_id, 'name': self.name,
            'age': self.age, 'hospital_name': self.hospital_name,
            'room_number': self.room_number, 'bed_number': self.bed_number,
            'patient_number': self.patient_number, 'admission_date': self.admission_date,
            'status': self.status, 'diagnosis': self.diagnosis
        }


class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, default=1)
    message = db.Column(db.Text)
    response = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'message': self.message,
            'response': self.response, 'created_at': str(self.created_at)
        }
