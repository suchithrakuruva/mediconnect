from flask import Blueprint, request, jsonify
from models import db, Doctor

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('/', methods=['GET'])
def get_doctors():
    city = request.args.get('city', '')
    state = request.args.get('state', '')
    specialization = request.args.get('specialization', '')
    language = request.args.get('language', '')
    telemedicine = request.args.get('telemedicine', '')

    query = Doctor.query
    if city:
        query = query.filter(Doctor.city.ilike(f'%{city}%'))
    if state:
        query = query.filter(Doctor.state.ilike(f'%{state}%'))
    if specialization:
        query = query.filter(Doctor.specialization.ilike(f'%{specialization}%'))
    if language:
        query = query.filter(Doctor.languages.ilike(f'%{language}%'))
    if telemedicine == 'true':
        query = query.filter(Doctor.telemedicine == True)

    doctors = query.all()
    return jsonify([d.to_dict() for d in doctors])

@doctors_bp.route('/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify(doctor.to_dict())

@doctors_bp.route('/specializations', methods=['GET'])
def get_specializations():
    specs = db.session.query(Doctor.specialization).distinct().all()
    return jsonify([s[0] for s in specs])

@doctors_bp.route('/cities', methods=['GET'])
def get_cities():
    cities = db.session.query(Doctor.city).distinct().all()
    return jsonify([c[0] for c in cities])
