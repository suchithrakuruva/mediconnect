// =====================================================
// MediConnect Multilingual System — All 22 Official Indian Languages
// =====================================================

const LANGUAGES = {
    en: 'English', hi: 'हिन्दी', bn: 'বাংলা', te: 'తెలుగు', mr: 'मराठी',
    ta: 'தமிழ்', gu: 'ગુજરાતી', kn: 'ಕನ್ನಡ', ml: 'മലയാളം', pa: 'ਪੰਜਾਬੀ',
    or: 'ଓଡ଼ିଆ', as: 'অসমীয়া', mai: 'मैथिली', sa: 'संस्कृतम्', ne: 'नेपाली',
    sd: 'سنڌي', ks: 'कॉशुर', doi: 'डोगरी', kok: 'कोंकणी', sat: 'संताली',
    mni: 'মৈতৈলোন্', bodo: 'बड़ो'
};

const TRANSLATIONS = {
    en: {
        home: 'Home', dashboard: 'Dashboard', symptom_checker: 'Symptom Checker',
        find_doctors: 'Find Doctors', emergency: 'Emergency & Hospitals',
        appointments: 'Appointments', telemedicine: 'Telemedicine',
        analytics: 'Health Analytics', medicine: 'Medicine Delivery',
        education: 'Health Education', profile: 'Profile', donors: 'Blood & Organ Donor',
        diet: 'Diet & Lifestyle', records: 'Patient Records',
        website_name: 'MediConnect', affiliated: 'Affiliated by KMC',
        check_symptoms: 'Check Symptoms', find_doctor: 'Find a Doctor',
        nearby_hospitals: 'Nearby Hospitals', book_appointment: 'Book Appointment',
        order_medicine: 'Order Medicine', emergency_108: 'Emergency 108',
        about_us: 'About Us', contact_us: 'Contact Us', latest_news: 'Latest Medical News',
        reviews: 'What Our Users Say', payment: 'Payment', pay_now: 'Pay Now',
        upi: 'UPI Payment', credit_card: 'Credit/Debit Card', net_banking: 'Net Banking',
        total: 'Total', cart: 'Cart', place_order: 'Place Order',
        chatbot: 'AI Health Assistant', send: 'Send', type_message: 'Type your message...',
        search: 'Search', filter: 'Filter', loading: 'Loading...',
        upload_files: 'Upload Photos/Videos/Files', duration: 'Duration (days)',
        pain_scale: 'Pain Scale (1-10)', height: 'Height (cm)', weight: 'Weight (kg)',
        gender: 'Gender', analyse: 'Analyse Symptoms', male: 'Male', female: 'Female', other: 'Other',
        select_language: 'Select Language', all_languages: 'All Languages',
    },
    hi: {
        home: 'होम', dashboard: 'डैशबोर्ड', symptom_checker: 'लक्षण जांचकर्ता',
        find_doctors: 'डॉक्टर खोजें', emergency: 'आपातकालीन और अस्पताल',
        appointments: 'अपॉइंटमेंट', telemedicine: 'टेलीमेडिसिन',
        analytics: 'स्वास्थ्य विश्लेषण', medicine: 'दवा डिलीवरी',
        education: 'स्वास्थ्य शिक्षा', profile: 'प्रोफाइल', donors: 'रक्त और अंग दाता',
        diet: 'आहार और जीवनशैली', records: 'रोगी रिकॉर्ड',
        website_name: 'मेडीकनेक्ट', affiliated: 'KMC से संबद्ध',
        check_symptoms: 'लक्षण जांचें', find_doctor: 'डॉक्टर खोजें',
        nearby_hospitals: 'निकटतम अस्पताल', book_appointment: 'अपॉइंटमेंट बुक करें',
        order_medicine: 'दवा ऑर्डर करें', emergency_108: 'आपातकालीन 108',
        about_us: 'हमारे बारे में', contact_us: 'संपर्क करें', latest_news: 'नवीनतम चिकित्सा समाचार',
        reviews: 'हमारे उपयोगकर्ता क्या कहते हैं', payment: 'भुगतान', pay_now: 'अभी भुगतान करें',
        upi: 'UPI भुगतान', credit_card: 'क्रेडिट/डेबिट कार्ड', net_banking: 'नेट बैंकिंग',
        total: 'कुल', cart: 'कार्ट', place_order: 'ऑर्डर दें',
        chatbot: 'AI स्वास्थ्य सहायक', send: 'भेजें', type_message: 'अपना संदेश लिखें...',
        search: 'खोजें', filter: 'फिल्टर', loading: 'लोड हो रहा है...',
        upload_files: 'फ़ोटो/वीडियो/फ़ाइलें अपलोड करें', duration: 'अवधि (दिन)',
        pain_scale: 'दर्द स्केल (1-10)', height: 'ऊँचाई (सेमी)', weight: 'वज़न (किलो)',
        gender: 'लिंग', analyse: 'लक्षण विश्लेषण', male: 'पुरुष', female: 'महिला', other: 'अन्य',
        select_language: 'भाषा चुनें', all_languages: 'सभी भाषाएं',
    },
    ta: {
        home: 'முகப்பு', dashboard: 'டாஷ்போர்டு', symptom_checker: 'அறிகுறி சோதனை',
        find_doctors: 'மருத்துவர் தேடு', emergency: 'அவசரம் & மருத்துவமனை',
        appointments: 'சந்திப்புகள்', telemedicine: 'டெலிமெடிசின்',
        analytics: 'சுகாதார பகுப்பாய்வு', medicine: 'மருந்து விநியோகம்',
        education: 'சுகாதாரக் கல்வி', profile: 'சுயவிவரம்', donors: 'இரத்த & உறுப்பு தானம்',
        diet: 'உணவு & வாழ்க்கை முறை', records: 'நோயாளி பதிவுகள்',
        website_name: 'மெடிகனெக்ட்', affiliated: 'KMC உடன் இணைந்த',
        check_symptoms: 'அறிகுறிகளை சோதிக்கவும்', find_doctor: 'மருத்துவரைக் கண்டறியவும்',
        nearby_hospitals: 'அருகிலுள்ள மருத்துவமனைகள்', book_appointment: 'சந்திப்பு முன்பதிவு',
        total: 'மொத்தம்', cart: 'கார்ட்', payment: 'பணம் செலுத்துதல்', pay_now: 'இப்போது செலுத்து',
        chatbot: 'AI சுகாதார உதவியாளர்', send: 'அனுப்பு',
        search: 'தேடு', loading: 'ஏற்றுகிறது...',
        about_us: 'எங்களை பற்றி', contact_us: 'தொடர்பு கொள்ள',
        select_language: 'மொழி தேர்வு', analyse: 'பகுப்பாய்வு',
    },
    te: {
        home: 'హోమ్', dashboard: 'డాష్‌బోర్డ్', symptom_checker: 'లక్షణ పరీక్ష',
        find_doctors: 'డాక్టర్‌ను కనుగొనండి', emergency: 'అత్యవసరం & ఆసుపత్రులు',
        appointments: 'అపాయింట్‌మెంట్లు', website_name: 'మెడికనెక్ట్',
        affiliated: 'KMC అనుబంధం', about_us: 'మా గురించి', contact_us: 'సంప్రదించండి',
        select_language: 'భాష ఎంచుకోండి', payment: 'చెల్లింపు',
    },
    bn: {
        home: 'হোম', dashboard: 'ড্যাশবোর্ড', symptom_checker: 'লক্ষণ পরীক্ষক',
        find_doctors: 'ডাক্তার খুঁজুন', emergency: 'জরুরি ও হাসপাতাল',
        website_name: 'মেডিকানেক্ট', affiliated: 'KMC অনুমোদিত',
        about_us: 'আমাদের সম্পর্কে', contact_us: 'যোগাযোগ করুন',
        select_language: 'ভাষা নির্বাচন করুন', payment: 'পেমেন্ট',
    },
    mr: {
        home: 'मुखपृष्ठ', dashboard: 'डॅशबोर्ड', symptom_checker: 'लक्षण तपासक',
        find_doctors: 'डॉक्टर शोधा', emergency: 'आणीबाणी आणि रुग्णालये',
        website_name: 'मेडीकनेक्ट', affiliated: 'KMC संलग्न',
        about_us: 'आमच्याबद्दल', contact_us: 'संपर्क करा', select_language: 'भाषा निवडा',
    },
    gu: {
        home: 'હોમ', find_doctors: 'ડૉક્ટર શોધો', emergency: 'ઇમરજન્સી',
        website_name: 'મેડીકનેક્ટ', affiliated: 'KMC સંલગ્ન', select_language: 'ભાષા પસંદ કરો',
    },
    kn: {
        home: 'ಮುಖಪುಟ', find_doctors: 'ವೈದ್ಯರನ್ನು ಹುಡುಕಿ', emergency: 'ತುರ್ತು',
        website_name: 'ಮೆಡಿಕನೆಕ್ಟ್', affiliated: 'KMC ಸಂಯೋಜಿತ', select_language: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    },
    ml: {
        home: 'ഹോം', find_doctors: 'ഡോക്ടർ കണ്ടെത്തുക', emergency: 'അടിയന്തരം',
        website_name: 'മെഡിക‌ണ‌ക്ട്', affiliated: 'KMC അഫിലിയേറ്റഡ്', select_language: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    },
    pa: {
        home: 'ਹੋਮ', find_doctors: 'ਡਾਕਟਰ ਲੱਭੋ', emergency: 'ਐਮਰਜੈਂਸੀ',
        website_name: 'ਮੈਡੀਕਨੈਕਟ', affiliated: 'KMC ਨਾਲ ਸੰਬੰਧਿਤ', select_language: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    },
};

let currentLang = 'en';

function t(key) {
    const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return lang[key] || TRANSLATIONS.en[key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mediconnect_lang', lang);
    // Re-render the current page
    if (typeof buildLayout === 'function') {
        buildLayout();
    }
}

// Load saved language
(function () {
    const saved = localStorage.getItem('mediconnect_lang');
    if (saved && LANGUAGES[saved]) currentLang = saved;
})();
