from flask import Blueprint, request, jsonify
from models import db, Appointment

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['GET'])
def get_appointments():
    patient_id = request.args.get('patient_id')
    doctor_id = request.args.get('doctor_id')
    query = Appointment.query
    if patient_id:
        query = query.filter_by(patient_id=int(patient_id))
    if doctor_id:
        query = query.filter_by(doctor_id=int(doctor_id))
    return jsonify([a.to_dict() for a in query.all()])

@appointments_bp.route('/', methods=['POST'])
def book_appointment():
    data = request.get_json()
    appt = Appointment(
        patient_id=data.get('patient_id', 1),
        doctor_id=data.get('doctor_id'),
        appointment_date=data.get('appointment_date'),
        appointment_time=data.get('appointment_time'),
        type=data.get('type', 'in-person'),
        symptoms=data.get('symptoms', ''),
        notes=data.get('notes', '')
    )
    db.session.add(appt)
    db.session.commit()
    return jsonify(appt.to_dict()), 201

@appointments_bp.route('/<int:appt_id>', methods=['PUT'])
def update_appointment(appt_id):
    appt = Appointment.query.get_or_404(appt_id)
    data = request.get_json()
    appt.status = data.get('status', appt.status)
    appt.notes = data.get('notes', appt.notes)
    db.session.commit()
    return jsonify(appt.to_dict())

@appointments_bp.route('/<int:appt_id>', methods=['DELETE'])
def cancel_appointment(appt_id):
    appt = Appointment.query.get_or_404(appt_id)
    appt.status = 'cancelled'
    db.session.commit()
    return jsonify({'message': 'Appointment cancelled'})

@appointments_bp.route('/slots', methods=['GET'])
def get_slots():
    doctor_id = request.args.get('doctor_id')
    date = request.args.get('date')
    booked = Appointment.query.filter_by(
        doctor_id=doctor_id, appointment_date=date
    ).all()
    booked_times = [a.appointment_time for a in booked]
    all_slots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ]
    available = [s for s in all_slots if s not in booked_times]
    return jsonify({'available_slots': available, 'booked_slots': booked_times})
