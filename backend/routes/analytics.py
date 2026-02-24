from flask import Blueprint, jsonify
from models import db, Doctor, Hospital, Appointment, SymptomLog, HealthAlert
from sqlalchemy import func

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/overview', methods=['GET'])
def overview():
    return jsonify({
        'total_doctors': Doctor.query.count(),
        'total_hospitals': Hospital.query.count(),
        'total_appointments': Appointment.query.count(),
        'total_symptom_checks': SymptomLog.query.count(),
        'telemedicine_doctors': Doctor.query.filter_by(telemedicine=True).count(),
        'emergency_hospitals': Hospital.query.filter_by(emergency=True).count(),
        'active_alerts': HealthAlert.query.filter(HealthAlert.severity.in_(['medium','high'])).count(),
    })

@analytics_bp.route('/disease-trends', methods=['GET'])
def disease_trends():
    return jsonify([
        {'month': 'Sep', 'Malaria': 320, 'Dengue': 180, 'Tuberculosis': 95, 'Typhoid': 140},
        {'month': 'Oct', 'Malaria': 280, 'Dengue': 250, 'Tuberculosis': 88, 'Typhoid': 120},
        {'month': 'Nov', 'Malaria': 190, 'Dengue': 310, 'Tuberculosis': 102, 'Typhoid': 95},
        {'month': 'Dec', 'Malaria': 140, 'Dengue': 200, 'Tuberculosis': 115, 'Typhoid': 75},
        {'month': 'Jan', 'Malaria': 110, 'Dengue': 90,  'Tuberculosis': 130, 'Typhoid': 60},
        {'month': 'Feb', 'Malaria': 160, 'Dengue': 70,  'Tuberculosis': 125, 'Typhoid': 55},
    ])

@analytics_bp.route('/state-health', methods=['GET'])
def state_health():
    return jsonify([
        {'state': 'Maharashtra', 'doctors_per_1000': 1.8, 'hospitals': 4200, 'coverage': 78},
        {'state': 'Uttar Pradesh', 'doctors_per_1000': 0.6, 'hospitals': 2800, 'coverage': 42},
        {'state': 'Bihar', 'doctors_per_1000': 0.4, 'hospitals': 1200, 'coverage': 31},
        {'state': 'Rajasthan', 'doctors_per_1000': 0.9, 'hospitals': 1800, 'coverage': 55},
        {'state': 'Tamil Nadu', 'doctors_per_1000': 2.1, 'hospitals': 3600, 'coverage': 85},
        {'state': 'Kerala', 'doctors_per_1000': 3.2, 'hospitals': 2400, 'coverage': 94},
        {'state': 'West Bengal', 'doctors_per_1000': 1.1, 'hospitals': 2200, 'coverage': 62},
        {'state': 'Gujarat', 'doctors_per_1000': 1.5, 'hospitals': 3100, 'coverage': 71},
    ])

@analytics_bp.route('/alerts', methods=['GET'])
def get_alerts():
    alerts = HealthAlert.query.order_by(HealthAlert.created_at.desc()).limit(10).all()
    return jsonify([a.to_dict() for a in alerts])

@analytics_bp.route('/triage-stats', methods=['GET'])
def triage_stats():
    from models import SymptomLog
    results = db.session.query(
        SymptomLog.triage_result, func.count(SymptomLog.triage_result)
    ).group_by(SymptomLog.triage_result).all()
    return jsonify([{'level': r[0], 'count': r[1]} for r in results])
