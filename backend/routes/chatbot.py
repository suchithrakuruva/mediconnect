from flask import Blueprint, request, jsonify
from models import db, ChatMessage
import re

chatbot_bp = Blueprint('chatbot', __name__)

# RAG-style knowledge base (vector DB simulation with keyword matching)
KNOWLEDGE_BASE = [
    {"topic": "appointment", "keywords": ["appointment", "book", "schedule", "doctor", "consult", "visit"],
     "response": "To book an appointment: Go to 'Find Doctors' → Select a doctor → Click 'Book Appointment' → Choose date and time → Confirm. You can also book from the Appointments section directly. Telemedicine options are available for remote consultations."},
    {"topic": "emergency", "keywords": ["emergency", "ambulance", "108", "urgent", "accident", "critical"],
     "response": "For emergencies: Click the 🚨 Emergency button in the top-right corner or call 108 directly. Our system will dispatch the nearest ambulance with GPS tracking. Average response time is 8-20 minutes. For immediate help: Ambulance: 108, Fire: 101, Police: 100."},
    {"topic": "symptom", "keywords": ["symptom", "sick", "fever", "pain", "feeling", "unwell", "diagnosis"],
     "response": "Use our AI Symptom Checker: Go to 'Symptom Checker' → Select your symptoms → Add details like duration, pain scale, height/weight → Upload any medical images/reports → Click 'Analyse'. The AI will provide triage urgency and recommend specialists."},
    {"topic": "medicine", "keywords": ["medicine", "drug", "pharmacy", "order", "prescription", "tablet"],
     "response": "To order medicines: Go to 'Medicine Delivery' → Search or browse medicines → Add to cart → Enter delivery address → Choose payment method (UPI/Credit Card/Debit Card) → Place order. Free delivery on orders above ₹299. Delivery in 2-4 hours."},
    {"topic": "hospital", "keywords": ["hospital", "nearby", "bed", "admission", "icu", "ward"],
     "response": "Find hospitals: Click the 🏥 Emergency & Hospitals button → View the live map → Click on any hospital marker to see details including name, rating, beds available, phone number. You can book ambulance to any hospital directly from the map."},
    {"topic": "payment", "keywords": ["payment", "pay", "upi", "credit", "debit", "transaction", "bill"],
     "response": "We support multiple payment methods: UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery for medicines. All transactions are secured with 256-bit SSL encryption."},
    {"topic": "blood", "keywords": ["blood", "donate", "donor", "transfusion", "blood group"],
     "response": "For blood donation: Go to 'Blood & Organ Donor' section → Select blood type → View available donors with contact info. To register as a donor, click 'Register as Donor' and fill in your details."},
    {"topic": "organ", "keywords": ["organ", "transplant", "kidney", "liver", "cornea", "donor"],
     "response": "For organ donation: Go to 'Blood & Organ Donor' section → Click 'Organ Donors' tab → Browse available donors by organ type (Kidney, Liver, Heart, Lung, Cornea, Bone Marrow). Register as a donor to save lives."},
    {"topic": "profile", "keywords": ["profile", "account", "details", "personal", "history"],
     "response": "View your profile: Click the avatar icon in the top-right → Your profile page shows: Personal details, appointment history, transaction history, medical records. You can update your information anytime."},
    {"topic": "telemedicine", "keywords": ["telemedicine", "video", "call", "online", "remote", "virtual"],
     "response": "Telemedicine consultations: Go to 'Telemedicine' → Choose instant connect or schedule a consultation → Select doctor, date, time → Video consultation via your browser. Requires stable internet (1+ Mbps). Available in multiple languages."},
    {"topic": "language", "keywords": ["language", "hindi", "tamil", "telugu", "translate", "bhasha"],
     "response": "MediConnect supports all 22 official Indian languages. Click the 🌐 language selector in the header to switch. The entire website including all sections will be translated to your preferred language."},
    {"topic": "security", "keywords": ["security", "privacy", "data", "safe", "encrypt", "protect"],
     "response": "Your data is protected with: AES-256 encryption for data at rest, TLS 1.3 for data in transit, JWT-based authentication, role-based access control, HIPAA-compliant data handling, compliance with India's IT Act 2000 and Digital Personal Data Protection Act 2023."},
    {"topic": "diet", "keywords": ["diet", "nutrition", "food", "eat", "lifestyle", "exercise", "health tips"],
     "response": "Access diet & lifestyle recommendations: After symptom analysis, you'll receive personalized diet plans. Visit 'Health Education' for nutrition guides, exercise routines, and wellness tips in your local language."},
    {"topic": "records", "keywords": ["record", "patient record", "admission", "room", "bed", "discharge"],
     "response": "Patient Records: Go to your profile → 'Patient Records' tab → View admission history with hospital name, room number, bed number, patient ID, diagnosis, and status. New records are created automatically upon hospital admission."},
]

def find_best_response(message):
    msg_lower = message.lower()
    best_match = None
    best_score = 0
    for entry in KNOWLEDGE_BASE:
        score = sum(1 for kw in entry["keywords"] if kw in msg_lower)
        if score > best_score:
            best_score = score
            best_match = entry
    if best_match and best_score > 0:
        return best_match["response"]
    return ("Hello! I'm MediConnect AI Assistant. I can help you with:\n"
            "• Booking appointments & finding doctors\n"
            "• Emergency services & ambulance\n"
            "• Symptom checking & health advice\n"
            "• Medicine ordering & payments\n"
            "• Hospital information & bed availability\n"
            "• Blood & organ donation\n"
            "• Your profile & medical records\n\n"
            "Please ask me anything about these topics!")

@chatbot_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    if not message:
        return jsonify({'error': 'Message required'}), 400
    response = find_best_response(message)
    chat_msg = ChatMessage(user_id=1, message=message, response=response)
    db.session.add(chat_msg)
    db.session.commit()
    return jsonify({'message': message, 'response': response, 'id': chat_msg.id})

@chatbot_bp.route('/history', methods=['GET'])
def chat_history():
    msgs = ChatMessage.query.filter_by(user_id=1).order_by(ChatMessage.created_at.desc()).limit(50).all()
    return jsonify([m.to_dict() for m in reversed(msgs)])
