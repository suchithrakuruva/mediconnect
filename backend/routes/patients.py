from flask import Blueprint, request, jsonify
from models import db, Patient

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([p.to_dict() for p in patients])

@patients_bp.route('/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    return jsonify(patient.to_dict())

@patients_bp.route('/', methods=['POST'])
def create_patient():
    data = request.get_json()
    patient = Patient(
        user_id=data.get('user_id', 1),
        age=data.get('age'),
        gender=data.get('gender'),
        blood_group=data.get('blood_group'),
        phone=data.get('phone'),
        address=data.get('address'),
        city=data.get('city'),
        state=data.get('state'),
        medical_history=data.get('medical_history', ''),
        allergies=data.get('allergies', ''),
        current_medications=data.get('current_medications', ''),
        emergency_contact=data.get('emergency_contact', '')
    )
    db.session.add(patient)
    db.session.commit()
    return jsonify(patient.to_dict()), 201

@patients_bp.route('/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    data = request.get_json()
    for field in ['age','gender','blood_group','phone','address','city','state',
                  'medical_history','allergies','current_medications','emergency_contact']:
        if field in data:
            setattr(patient, field, data[field])
    db.session.commit()
    return jsonify(patient.to_dict())
