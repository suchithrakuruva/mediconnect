from flask import Blueprint, request, jsonify
from models import db, SymptomLog

symptoms_bp = Blueprint('symptoms', __name__)

SYMPTOM_RULES = {
    'emergency': {
        'symptoms': ['chest pain', 'heart attack', 'stroke', 'unconscious', 'difficulty breathing',
                     'severe bleeding', 'seizure', 'paralysis', 'anaphylaxis'],
        'specialty': 'Emergency Medicine',
        'recommendation': 'EMERGENCY: Call 108 immediately or go to the nearest emergency room.',
        'urgency': 'emergency'
    },
    'high': {
        'symptoms': ['high fever', 'blood in urine', 'blood in stool', 'severe headache',
                     'severe abdominal pain', 'vomiting blood', 'jaundice', 'shortness of breath',
                     'chest tightness', 'sudden vision loss'],
        'specialty': 'Internal Medicine',
        'recommendation': 'High priority: Seek medical attention within 24 hours.',
        'urgency': 'high'
    },
    'medium': {
        'symptoms': ['fever', 'cough', 'cold', 'diarrhea', 'vomiting', 'body pain',
                     'headache', 'rash', 'joint pain', 'back pain', 'urinary burning'],
        'specialty': 'General Physician',
        'recommendation': 'Moderate concern: Schedule a doctor visit within 2-3 days.',
        'urgency': 'medium'
    },
    'low': {
        'symptoms': ['fatigue', 'mild cough', 'sneezing', 'runny nose', 'mild headache',
                     'acne', 'mild stomach ache', 'insomnia'],
        'specialty': 'General Physician',
        'recommendation': 'Low concern: Rest, hydrate. Consult a doctor if symptoms persist beyond 5 days.',
        'urgency': 'low'
    }
}

SPECIALTY_MAP = {
    'chest pain': 'Cardiologist',
    'heart': 'Cardiologist',
    'skin': 'Dermatologist',
    'rash': 'Dermatologist',
    'acne': 'Dermatologist',
    'eye': 'Ophthalmologist',
    'vision': 'Ophthalmologist',
    'ear': 'ENT Specialist',
    'dental': 'Dentist',
    'tooth': 'Dentist',
    'bone': 'Orthopedician',
    'joint': 'Orthopedician',
    'mental': 'Psychiatrist',
    'anxiety': 'Psychiatrist',
    'depression': 'Psychiatrist',
    'pregnancy': 'Gynecologist',
    'periods': 'Gynecologist',
    'child': 'Pediatrician',
    'diabetes': 'Endocrinologist',
    'thyroid': 'Endocrinologist',
    'kidney': 'Nephrologist',
    'urine': 'Urologist',
    'cancer': 'Oncologist',
}

def triage_symptoms(symptom_list):
    symptom_text = ' '.join(s.lower() for s in symptom_list)
    
    for severity in ['emergency', 'high', 'medium', 'low']:
        rule = SYMPTOM_RULES[severity]
        for s in rule['symptoms']:
            if s in symptom_text:
                specialty = rule['specialty']
                for keyword, spec in SPECIALTY_MAP.items():
                    if keyword in symptom_text:
                        specialty = spec
                        break
                return {
                    'urgency': rule['urgency'],
                    'recommended_specialty': specialty,
                    'recommendation': rule['recommendation'],
                    'matched_symptom': s
                }
    
    return {
        'urgency': 'low',
        'recommended_specialty': 'General Physician',
        'recommendation': 'No critical symptoms detected. Monitor your condition and consult a general physician if needed.',
        'matched_symptom': None
    }

@symptoms_bp.route('/triage', methods=['POST'])
def triage():
    data = request.get_json()
    symptoms = data.get('symptoms', [])
    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400
    
    result = triage_symptoms(symptoms)
    log = SymptomLog(
        symptoms=', '.join(symptoms),
        triage_result=result['urgency'],
        recommended_specialty=result['recommended_specialty'],
        recommendation=result['recommendation']
    )
    db.session.add(log)
    db.session.commit()
    return jsonify(result)

@symptoms_bp.route('/common', methods=['GET'])
def get_common_symptoms():
    return jsonify([
        'Fever', 'Cough', 'Cold', 'Headache', 'Body Pain', 'Fatigue',
        'Diarrhea', 'Vomiting', 'Rash', 'Chest Pain', 'Shortness of Breath',
        'Abdominal Pain', 'Back Pain', 'Joint Pain', 'Sore Throat',
        'High Fever', 'Blood in Urine', 'Jaundice', 'Seizure',
        'Difficulty Breathing', 'Severe Headache', 'Urinary Burning',
        'Anxiety', 'Depression', 'Insomnia', 'Loss of Appetite'
    ])
