class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage(this.currentLang);
        this.setupLanguageSwitcher();
    }

    async loadTranslations() {
        try {
            const response = await fetch('translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to English
            this.translations = await this.getFallbackTranslations();
        }
    }

    async getFallbackTranslations() {
        return {
            en: {
                "app_name": "TouristGuard",
                "nav_home": "Home",
                "nav_area": "Area Coverage",
                "nav_dashboard": "Dashboard",
                "nav_specs": "Specifications",
                "nav_login": "Login",
                "nav_signup": "Sign Up",
                "hero_title": "AI-Powered Tourist Safety Monitoring",
                "hero_subtitle": "Real-time incident detection and emergency response for tourists worldwide using advanced machine learning",
                "hero_get_started": "Get Started",
                "hero_learn_more": "Learn More",
                "features_title": "Advanced Safety Features",
                "features_subtitle": "Powered by cutting-edge machine learning algorithms",
                "feature_safety": "Safety Monitoring",
                "feature_ai": "AI Detection",
                "feature_global": "Global Coverage",
                "feature_realtime_title": "Real-time Location Tracking",
                "feature_realtime_desc": "ML-powered geospatial analysis for precise tourist tracking and safety zone monitoring",
                "feature_crowd_title": "Crowd Behavior Analysis",
                "feature_crowd_desc": "Computer vision models detect unusual crowd patterns and potential safety threats",
                "feature_incident_title": "Incident Prediction",
                "feature_incident_desc": "Predictive analytics identify high-risk areas and prevent incidents before they occur",
                "login_title": "Login to TouristGuard",
                "login_email": "Email address",
                "login_password": "Password",
                "login_button": "Sign In",
                "signup_title": "Create Account",
                "signup_name": "Full Name",
                "signup_email": "Email address",
                "signup_password": "Password",
                "signup_button": "Create Account",
                "area_title": "Global Coverage Area",
                "area_subtitle": "ML-powered safety monitoring across 500+ cities worldwide",
                "ml_map_title": "Real-time Safety Heatmap",
                "ml_loading": "Loading ML Safety Analysis...",
                "ml_loading_desc": "Machine learning model processing real-time safety data",
                "ml_metrics_title": "ML Model Metrics",
                "ml_accuracy": "Model Accuracy",
                "ml_precision": "Precision Rate",
                "ml_response": "Response Time",
                "ml_retrain": "Retrain Model",
                "stat_cities": "Cities Covered",
                "stat_countries": "Countries",
                "stat_monitoring": "Monitoring",
                "stat_accuracy": "ML Accuracy",
                "dashboard_title": "Safety Dashboard",
                "dashboard_live": "LIVE",
                "ml_predictions_title": "ML Incident Predictions",
                "ml_refresh": "Refresh Predictions",
                "ml_chart_loading": "Loading ML Prediction Analytics...",
                "ml_current_stats": "Current Statistics",
                "ml_risk_level": "Risk Level",
                "ml_incidents_predicted": "Incidents Predicted",
                "ml_confidence": "Confidence Score",
                "metric_active_tourists": "Active Tourists",
                "metric_safe_zones": "Safe Zones",
                "metric_incidents_today": "Incidents Today",
                "metric_response_time": "Avg Response Time",
                "alerts_title": "Real-time Alerts",
                "ml_alert": "ML Alert:",
                "alert_crowd_detected": "Unusual crowd pattern detected in Paris"
            },
            hi: {
                "app_name": "टूरिस्टगार्ड",
                "nav_home": "होम",
                "nav_area": "क्षेत्र कवरेज",
                "nav_dashboard": "डैशबोर्ड",
                "nav_specs": "विशेष विवरण",
                "nav_login": "लॉगिन",
                "nav_signup": "साइन अप",
                "hero_title": "एआई-संचालित पर्यटक सुरक्षा निगरानी",
                "hero_subtitle": "उन्नत मशीन लर्निंग का उपयोग करके दुनिया भर में पर्यटकों के लिए रीयल-टाइम घटना पहचान और आपातकालीन प्रतिक्रिया",
                "hero_get_started": "शुरू करें",
                "hero_learn_more": "और जानें",
                "features_title": "उन्नत सुरक्षा सुविधाएँ",
                "features_subtitle": "अत्याधुनिक मशीन लर्निंग एल्गोरिदम द्वारा संचालित",
                "feature_safety": "सुरक्षा निगरानी",
                "feature_ai": "एआई पहचान",
                "feature_global": "वैश्विक कवरेज",
                "feature_realtime_title": "रीयल-टाइम लोकेशन ट्रैकिंग",
                "feature_realtime_desc": "सटीक पर्यटक ट्रैकिंग और सुरक्षा क्षेत्र निगरानी के लिए एमएल-संचालित भू-स्थानिक विश्लेषण",
                "feature_crowd_title": "भीड़ व्यवहार विश्लेषण",
                "feature_crowd_desc": "कंप्यूटर विजन मॉडल असामान्य भीड़ पैटर्न और संभावित सुरक्षा खतरों का पता लगाते हैं",
                "feature_incident_title": "घटना भविष्यवाणी",
                "feature_incident_desc": "भविष्य कहनेवाला विश्लेषण उच्च-जोखिम वाले क्षेत्रों की पहचान करता है और घटनाओं को होने से पहले रोकता है",
                "login_title": "टूरिस्टगार्ड में लॉगिन करें",
                "login_email": "ईमेल पता",
                "login_password": "पासवर्ड",
                "login_button": "साइन इन",
                "signup_title": "खाता बनाएं",
                "signup_name": "पूरा नाम",
                "signup_email": "ईमेल पता",
                "signup_password": "पासवर्ड",
                "signup_button": "खाता बनाएं",
                "area_title": "वैश्विक कवरेज क्षेत्र",
                "area_subtitle": "दुनिया भर के 500+ शहरों में एमएल-संचालित सुरक्षा निगरानी",
                "ml_map_title": "रीयल-टाइम सुरक्षा हीटमैप",
                "ml_loading": "एमएल सुरक्षा विश्लेषण लोड हो रहा है...",
                "ml_loading_desc": "मशीन लर्निंग मॉडल रीयल-टाइम सुरक्षा डेटा प्रोसेस कर रहा है",
                "ml_metrics_title": "एमएल मॉडल मेट्रिक्स",
                "ml_accuracy": "मॉडल सटीकता",
                "ml_precision": "परिशुद्धता दर",
                "ml_response": "प्रतिक्रिया समय",
                "ml_retrain": "मॉडल को पुनः प्रशिक्षित करें",
                "stat_cities": "शहर कवर",
                "stat_countries": "देश",
                "stat_monitoring": "निगरानी",
                "stat_accuracy": "एमएल सटीकता",
                "dashboard_title": "सुरक्षा डैशबोर्ड",
                "dashboard_live": "लाइव",
                "ml_predictions_title": "एमएल घटना भविष्यवाणियाँ",
                "ml_refresh": "भविष्यवाणियाँ ताज़ा करें",
                "ml_chart_loading": "एमएल भविष्यवाणी एनालिटिक्स लोड हो रहा है...",
                "ml_current_stats": "वर्तमान आँकड़े",
                "ml_risk_level": "जोखिम स्तर",
                "ml_incidents_predicted": "भविष्यवाणी की गई घटनाएँ",
                "ml_confidence": "आत्मविश्वास स्कोर",
                "metric_active_tourists": "सक्रिय पर्यटक",
                "metric_safe_zones": "सुरक्षित क्षेत्र",
                "metric_incidents_today": "आज की घटनाएँ",
                "metric_response_time": "औसत प्रतिक्रिया समय",
                "alerts_title": "रीयल-टाइम अलर्ट",
                "ml_alert": "एमएल अलर्ट:",
                "alert_crowd_detected": "पेरिस में असामान्य भीड़ पैटर्न का पता चला"
            }
        };
    }

    setupLanguageSwitcher() {
        const dropdownItems = document.querySelectorAll('[data-lang]');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = item.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
    }

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        this.applyLanguage(lang);
        this.updateLanguageIndicator();
    }

    applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = this.translations[lang][key];
                } else {
                    element.textContent = this.translations[lang][key];
                }
            }
        });
    }

    updateLanguageIndicator() {
        const indicator = document.getElementById('currentLanguage');
        if (indicator) {
            const languageNames = {
                'en': 'English',
                'hi': 'हिन्दी',
                'es': 'Español',
                'fr': 'Français',
                'de': 'Deutsch',
                'ja': '日本語'
            };
            indicator.textContent = languageNames[this.currentLang];
        }
    }
}

// Initialize language manager
const languageManager = new LanguageManager();