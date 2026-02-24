from flask import Blueprint, request, jsonify
from models import db, Hospital

hospitals_bp = Blueprint('hospitals', __name__)

@hospitals_bp.route('/', methods=['GET'])
def get_hospitals():
    city = request.args.get('city', '')
    state = request.args.get('state', '')
    type_ = request.args.get('type', '')
    emergency = request.args.get('emergency', '')

    query = Hospital.query
    if city:
        query = query.filter(Hospital.city.ilike(f'%{city}%'))
    if state:
        query = query.filter(Hospital.state.ilike(f'%{state}%'))
    if type_:
        query = query.filter(Hospital.type.ilike(f'%{type_}%'))
    if emergency == 'true':
        query = query.filter(Hospital.emergency == True)

    hospitals = query.all()
    return jsonify([h.to_dict() for h in hospitals])

@hospitals_bp.route('/<int:hospital_id>', methods=['GET'])
def get_hospital(hospital_id):
    hospital = Hospital.query.get_or_404(hospital_id)
    return jsonify(hospital.to_dict())

@hospitals_bp.route('/nearby', methods=['GET'])
def get_nearby():
    lat = float(request.args.get('lat', 28.6))
    lng = float(request.args.get('lng', 77.2))
    # Return hospitals within ~50km (simple bounding box)
    hospitals = Hospital.query.filter(
        Hospital.latitude.between(lat - 0.5, lat + 0.5),
        Hospital.longitude.between(lng - 0.5, lng + 0.5)
    ).all()
    return jsonify([h.to_dict() for h in hospitals])
