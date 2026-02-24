from flask import Blueprint, request, jsonify
from models import db, MedicineOrder
import json

medicine_bp = Blueprint('medicine', __name__)

MEDICINES_CATALOG = [
    {'id': 1, 'name': 'Paracetamol 500mg', 'category': 'Pain Relief', 'price': 25, 'unit': 'Strip of 10'},
    {'id': 2, 'name': 'Amoxicillin 250mg', 'category': 'Antibiotic', 'price': 85, 'unit': 'Strip of 10'},
    {'id': 3, 'name': 'Cetirizine 10mg', 'category': 'Antiallergic', 'price': 30, 'unit': 'Strip of 10'},
    {'id': 4, 'name': 'Metformin 500mg', 'category': 'Diabetes', 'price': 45, 'unit': 'Strip of 10'},
    {'id': 5, 'name': 'Amlodipine 5mg', 'category': 'BP & Heart', 'price': 55, 'unit': 'Strip of 10'},
    {'id': 6, 'name': 'Omeprazole 20mg', 'category': 'Gastro', 'price': 60, 'unit': 'Strip of 10'},
    {'id': 7, 'name': 'Azithromycin 500mg', 'category': 'Antibiotic', 'price': 120, 'unit': 'Strip of 3'},
    {'id': 8, 'name': 'Vitamin C 500mg', 'category': 'Vitamins', 'price': 35, 'unit': 'Strip of 10'},
    {'id': 9, 'name': 'ORS Electrolytes', 'category': 'Hydration', 'price': 20, 'unit': 'Sachet'},
    {'id': 10, 'name': 'Betadine 5%', 'category': 'Antiseptic', 'price': 75, 'unit': '30ml Bottle'},
    {'id': 11, 'name': 'Insulin (Regular)', 'category': 'Diabetes', 'price': 280, 'unit': '10ml Vial'},
    {'id': 12, 'name': 'Salbutamol Inhaler', 'category': 'Respiratory', 'price': 180, 'unit': 'Inhaler'},
    {'id': 13, 'name': 'Ibuprofen 400mg', 'category': 'Pain Relief', 'price': 30, 'unit': 'Strip of 10'},
    {'id': 14, 'name': 'Iron + Folic Acid', 'category': 'Vitamins', 'price': 40, 'unit': 'Strip of 10'},
    {'id': 15, 'name': 'Doxycycline 100mg', 'category': 'Antibiotic', 'price': 95, 'unit': 'Strip of 10'},
]

@medicine_bp.route('/catalog', methods=['GET'])
def get_catalog():
    category = request.args.get('category', '')
    search = request.args.get('search', '')
    meds = MEDICINES_CATALOG
    if category:
        meds = [m for m in meds if m['category'].lower() == category.lower()]
    if search:
        meds = [m for m in meds if search.lower() in m['name'].lower()]
    return jsonify(meds)

@medicine_bp.route('/order', methods=['POST'])
def place_order():
    data = request.get_json()
    order = MedicineOrder(
        patient_id=data.get('patient_id', 1),
        medicines=json.dumps(data.get('medicines', [])),
        total_amount=data.get('total_amount', 0),
        delivery_address=data.get('delivery_address', ''),
        status='processing'
    )
    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_dict()), 201

@medicine_bp.route('/orders/<int:patient_id>', methods=['GET'])
def get_orders(patient_id):
    orders = MedicineOrder.query.filter_by(patient_id=patient_id).all()
    return jsonify([o.to_dict() for o in orders])

@medicine_bp.route('/categories', methods=['GET'])
def get_categories():
    cats = list(set(m['category'] for m in MEDICINES_CATALOG))
    return jsonify(sorted(cats))
