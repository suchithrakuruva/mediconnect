from flask import Blueprint, request, jsonify
from models import db, AmbulanceRequest
import random
import string

ambulance_bp = Blueprint('ambulance', __name__)

def generate_ambulance_number():
    return 'AMB-' + ''.join(random.choices(string.digits, k=4))

@ambulance_bp.route('/request', methods=['POST'])
def request_ambulance():
    data = request.get_json()
    req = AmbulanceRequest(
        patient_name=data.get('patient_name', 'Unknown'),
        phone=data.get('phone', ''),
        pickup_address=data.get('pickup_address', ''),
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        emergency_type=data.get('emergency_type', 'General Emergency'),
        status='dispatched',
        ambulance_number=generate_ambulance_number(),
        eta_minutes=random.randint(8, 20)
    )
    db.session.add(req)
    db.session.commit()
    return jsonify(req.to_dict()), 201

@ambulance_bp.route('/<int:req_id>', methods=['GET'])
def get_status(req_id):
    req = AmbulanceRequest.query.get_or_404(req_id)
    return jsonify(req.to_dict())

@ambulance_bp.route('/active', methods=['GET'])
def get_active():
    reqs = AmbulanceRequest.query.filter(
        AmbulanceRequest.status.in_(['requested', 'dispatched'])
    ).all()
    return jsonify([r.to_dict() for r in reqs])
