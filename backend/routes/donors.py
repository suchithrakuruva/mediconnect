from flask import Blueprint, request, jsonify
from models import db, BloodDonor, OrganDonor

donors_bp = Blueprint('donors', __name__)

@donors_bp.route('/blood', methods=['GET'])
def blood_donors():
    blood_type = request.args.get('blood_type', '')
    q = BloodDonor.query.filter_by(available=True)
    if blood_type:
        q = q.filter_by(blood_type=blood_type)
    donors = q.all()
    return jsonify([d.to_dict() for d in donors])

@donors_bp.route('/blood/types', methods=['GET'])
def blood_types():
    return jsonify(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])

@donors_bp.route('/organs', methods=['GET'])
def organ_donors():
    organ = request.args.get('organ', '')
    q = OrganDonor.query.filter_by(available=True)
    if organ:
        q = q.filter_by(organ=organ)
    donors = q.all()
    return jsonify([d.to_dict() for d in donors])

@donors_bp.route('/organs/types', methods=['GET'])
def organ_types():
    return jsonify(['Kidney', 'Liver', 'Heart', 'Lung', 'Cornea', 'Bone Marrow', 'Pancreas', 'Intestine'])

@donors_bp.route('/blood/register', methods=['POST'])
def register_blood_donor():
    data = request.json
    donor = BloodDonor(
        name=data.get('name'), age=data.get('age'),
        blood_type=data.get('blood_type'), phone=data.get('phone'),
        city=data.get('city', ''), state=data.get('state', '')
    )
    db.session.add(donor)
    db.session.commit()
    return jsonify(donor.to_dict()), 201

@donors_bp.route('/organs/register', methods=['POST'])
def register_organ_donor():
    data = request.json
    donor = OrganDonor(
        name=data.get('name'), age=data.get('age'),
        organ=data.get('organ'), blood_type=data.get('blood_type', ''),
        phone=data.get('phone'), city=data.get('city', ''), state=data.get('state', '')
    )
    db.session.add(donor)
    db.session.commit()
    return jsonify(donor.to_dict()), 201
