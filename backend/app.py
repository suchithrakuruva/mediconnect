from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db
from config import Config
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

    CORS(app, origins='*')
    db.init_app(app)

    from routes.auth import auth_bp
    from routes.patients import patients_bp
    from routes.doctors import doctors_bp
    from routes.hospitals import hospitals_bp
    from routes.appointments import appointments_bp
    from routes.symptoms import symptoms_bp
    from routes.analytics import analytics_bp
    from routes.ambulance import ambulance_bp
    from routes.medicine import medicine_bp
    from routes.donors import donors_bp
    from routes.profile import profile_bp
    from routes.chatbot import chatbot_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patients_bp, url_prefix='/api/patients')
    app.register_blueprint(doctors_bp, url_prefix='/api/doctors')
    app.register_blueprint(hospitals_bp, url_prefix='/api/hospitals')
    app.register_blueprint(appointments_bp, url_prefix='/api/appointments')
    app.register_blueprint(symptoms_bp, url_prefix='/api/symptoms')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(ambulance_bp, url_prefix='/api/ambulance')
    app.register_blueprint(medicine_bp, url_prefix='/api/medicine')
    app.register_blueprint(donors_bp, url_prefix='/api/donors')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
    app.register_blueprint(chatbot_bp, url_prefix='/api/chatbot')

    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'message': 'MediConnect API is running'}

    # News API
    @app.route('/api/news')
    def get_news():
        return [
            {'title': 'WHO Reports Decline in Global Malaria Cases', 'source': 'WHO', 'time': '2 hours ago',
             'summary': 'Global malaria cases have decreased by 12% compared to the previous year, marking significant progress in disease control efforts.', 'icon': '🦟'},
            {'title': 'India Launches Universal Health Coverage Scheme', 'source': 'Ministry of Health', 'time': '5 hours ago',
             'summary': 'The government announces expansion of Ayushman Bharat to cover an additional 50 million families under the universal health coverage initiative.', 'icon': '🏥'},
            {'title': 'Breakthrough in AI-Powered Cancer Detection', 'source': 'Nature Medicine', 'time': '1 day ago',
             'summary': 'Researchers develop an AI model that can detect early-stage cancer with 97% accuracy from routine blood tests, potentially revolutionizing screening.', 'icon': '🔬'},
            {'title': 'New Guidelines for Digital Health Records in India', 'source': 'NHA', 'time': '1 day ago',
             'summary': 'National Health Authority releases updated guidelines for ABHA (Ayushman Bharat Health Account) digital health records standardization.', 'icon': '📋'},
            {'title': 'COVID-19 Booster Shots Now Available at PHCs', 'source': 'ICMR', 'time': '2 days ago',
             'summary': 'Updated COVID-19 booster vaccines targeting latest variants are now available at all Primary Health Centres across India.', 'icon': '💉'},
            {'title': 'Mental Health Awareness Reaches Record High in Rural India', 'source': 'NIMHANS', 'time': '3 days ago',
             'summary': 'A nationwide survey shows a 40% increase in mental health awareness and help-seeking behavior in rural communities.', 'icon': '🧠'},
        ]

    # Serve the SPA frontend for all non-API routes
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        if path.startswith('api/'):
            return {'error': 'Not found'}, 404
        static_dir = os.path.join(os.path.dirname(__file__), 'templates')
        return send_from_directory(static_dir, 'index.html')

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
        from seed_data import seed_all
        seed_all()
    app.run(debug=True, port=5000)
