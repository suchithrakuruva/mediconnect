from flask import Blueprint, request, jsonify
from models import db, User, Transaction, Appointment, PatientRecord

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['GET'])
def get_profile():
    user = User.query.first()
    if not user:
        return jsonify({'error': 'No user found'}), 404
    return jsonify(user.to_dict())

@profile_bp.route('/', methods=['PUT'])
def update_profile():
    user = User.query.first()
    if not user:
        return jsonify({'error': 'No user found'}), 404
    data = request.json
    for key in ['name', 'email', 'phone', 'age', 'gender', 'height_cm', 'weight_kg',
                'address', 'city', 'state', 'pincode', 'photo_url']:
        if key in data:
            setattr(user, key, data[key])
    db.session.commit()
    return jsonify(user.to_dict())

@profile_bp.route('/transactions', methods=['GET'])
def get_transactions():
    txns = Transaction.query.filter_by(user_id=1).order_by(Transaction.created_at.desc()).all()
    return jsonify([t.to_dict() for t in txns])

@profile_bp.route('/appointments', methods=['GET'])
def get_appointment_history():
    appts = Appointment.query.filter_by(patient_id=1).order_by(Appointment.created_at.desc()).all()
    return jsonify([a.to_dict() for a in appts])

@profile_bp.route('/records', methods=['GET'])
def get_patient_records():
    records = PatientRecord.query.filter_by(patient_id=1).order_by(PatientRecord.created_at.desc()).all()
    return jsonify([r.to_dict() for r in records])

@profile_bp.route('/records', methods=['POST'])
def add_patient_record():
    data = request.json
    rec = PatientRecord(
        patient_id=1, name=data.get('name'), age=data.get('age'),
        hospital_name=data.get('hospital_name'), room_number=data.get('room_number'),
        bed_number=data.get('bed_number'), patient_number=data.get('patient_number'),
        admission_date=data.get('admission_date'), status=data.get('status', 'admitted'),
        diagnosis=data.get('diagnosis', '')
    )
    db.session.add(rec)
    db.session.commit()
    return jsonify(rec.to_dict()), 201
