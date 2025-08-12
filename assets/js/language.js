/**
 * Pacific Panama Fishing Expeditions - Language Management
 * Handles bilingual functionality (English/Spanish)
 */

class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.supportedLanguages = ['en', 'es'];
        this.translations = {};
        
        this.init();
    }

    init() {
        this.loadSavedLanguage();
        this.bindLanguageToggle();
        this.loadTranslations();
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('pacific-panama-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.setLanguage(savedLang);
        }
    }

    bindLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
        this.setLanguage(newLanguage);
    }

    setLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.warn(`Language ${language} not supported`);
            return;
        }

        this.currentLanguage = language;
        
        // Update HTML lang attribute
        document.documentElement.lang = language;
        
        // Update body class for CSS targeting
        if (language === 'es') {
            document.body.classList.add('spanish');
        } else {
            document.body.classList.remove('spanish');
        }
        
        // Save preference
        localStorage.setItem('pacific-panama-language', language);
        
        // Update dynamic content if translations are loaded
        if (Object.keys(this.translations).length > 0) {
            this.updateDynamicContent();
        }
        
        // Trigger language change event
        this.dispatchLanguageChangeEvent(language);
        
        console.log(`Language changed to: ${language}`);
    }

    async loadTranslations() {
        try {
            // In a real implementation, this would load from a JSON file
            this.translations = {
                en: {
                    // Navigation
                    'nav.home': 'Home',
                    'nav.charters': 'Charters',
                    'nav.species': 'Fish Species',
                    'nav.catch-log': 'Catch Log',
                    'nav.gallery': 'Gallery',
                    'nav.contact': 'Contact',
                    
                    // Common phrases
                    'common.book-now': 'Book Now',
                    'common.call-now': 'Call Now',
                    'common.learn-more': 'Learn More',
                    'common.view-all': 'View All',
                    'common.send': 'Send',
                    'common.loading': 'Loading...',
                    'common.error': 'Error occurred',
                    'common.success': 'Success',
                    
                    // Forms
                    'form.name': 'Full Name',
                    'form.email': 'Email Address',
                    'form.phone': 'Phone Number',
                    'form.message': 'Message',
                    'form.date': 'Preferred Date',
                    'form.submit': 'Send Message',
                    'form.required': 'This field is required',
                    'form.invalid-email': 'Invalid email address',
                    'form.invalid-phone': 'Invalid phone number',
                    
                    // Weather
                    'weather.condition': 'Condition',
                    'weather.temperature': 'Temperature',
                    'weather.wind': 'Wind',
                    'weather.waves': 'Wave Height',
                    
                    // Fish species
                    'fish.blue-marlin': 'Blue Marlin',
                    'fish.sailfish': 'Pacific Sailfish',
                    'fish.yellowfin-tuna': 'Yellowfin Tuna',
                    'fish.roosterfish': 'Roosterfish',
                    'fish.wahoo': 'Wahoo',
                    'fish.cubera-snapper': 'Cubera Snapper',
                    
                    // Seasons
                    'season.peak': 'Peak Season',
                    'season.year-round': 'Year-round',
                    'season.best': 'Best',
                    
                    // Time periods
                    'time.dec-apr': 'Dec-Apr',
                    'time.apr-nov': 'Apr-Nov',
                    'time.nov-mar': 'Nov-Mar',
                    
                    // Charter types
                    'charter.half-day': 'Half Day Inshore',
                    'charter.full-day': 'Full Day Offshore',
                    'charter.multi-day': 'Multi-Day Expedition',
                    
                    // Contact info
                    'contact.phone-us': 'Phone/WhatsApp (US)',
                    'contact.phone-panama': 'Phone/WhatsApp (Panama)',
                    'contact.email': 'Email',
                    'contact.location': 'Location',
                    'contact.response-time': 'Response Time',
                    'contact.hours': 'Available 7 days a week',
                    
                    // Messages
                    'message.booking-success': 'Thank you! We have received your booking request. We will contact you within 2 hours.',
                    'message.form-error': 'Please correct the errors in the form',
                    'message.network-error': 'Network error. Please try again.',
                },
                es: {
                    // Navigation
                    'nav.home': 'Inicio',
                    'nav.charters': 'Excursiones',
                    'nav.species': 'Especies',
                    'nav.catch-log': 'Registro',
                    'nav.gallery': 'Galería',
                    'nav.contact': 'Contacto',
                    
                    // Common phrases
                    'common.book-now': 'Reservar',
                    'common.call-now': 'Llamar',
                    'common.learn-more': 'Aprender Más',
                    'common.view-all': 'Ver Todo',
                    'common.send': 'Enviar',
                    'common.loading': 'Cargando...',
                    'common.error': 'Error ocurrido',
                    'common.success': 'Éxito',
                    
                    // Forms
                    'form.name': 'Nombre Completo',
                    'form.email': 'Correo Electrónico',
                    'form.phone': 'Número de Teléfono',
                    'form.message': 'Mensaje',
                    'form.date': 'Fecha Preferida',
                    'form.submit': 'Enviar Mensaje',
                    'form.required': 'Este campo es requerido',
                    'form.invalid-email': 'Correo electrónico inválido',
                    'form.invalid-phone': 'Número de teléfono inválido',
                    
                    // Weather
                    'weather.condition': 'Condición',
                    'weather.temperature': 'Temperatura',
                    'weather.wind': 'Viento',
                    'weather.waves': 'Altura de Olas',
                    
                    // Fish species
                    'fish.blue-marlin': 'Marlín Azul',
                    'fish.sailfish': 'Pez Vela del Pacífico',
                    'fish.yellowfin-tuna': 'Atún Aleta Amarilla',
                    'fish.roosterfish': 'Pez Gallo',
                    'fish.wahoo': 'Peto',
                    'fish.cubera-snapper': 'Pargo Cubera',
                    
                    // Seasons
                    'season.peak': 'Temporada Alta',
                    'season.year-round': 'Todo el Año',
                    'season.best': 'Mejor',
                    
                    // Time periods
                    'time.dec-apr': 'Dic-Abr',
                    'time.apr-nov': 'Abr-Nov',
                    'time.nov-mar': 'Nov-Mar',
                    
                    // Charter types
                    'charter.half-day': 'Medio Día Cerca de Costa',
                    'charter.full-day': 'Día Completo Mar Adentro',
                    'charter.multi-day': 'Expedición de Varios Días',
                    
                    // Contact info
                    'contact.phone-us': 'Teléfono/WhatsApp (EE.UU.)',
                    'contact.phone-panama': 'Teléfono/WhatsApp (Panamá)',
                    'contact.email': 'Correo Electrónico',
                    'contact.location': 'Ubicación',
                    'contact.response-time': 'Tiempo de Respuesta',
                    'contact.hours': 'Disponible 7 días a la semana',
                    
                    // Messages
                    'message.booking-success': '¡Gracias! Hemos recibido tu solicitud de reserva. Te contactaremos dentro de 2 horas.',
                    'message.form-error': 'Por favor, corrija los errores en el formulario',
                    'message.network-error': 'Error de red. Por favor, inténtalo de nuevo.',
                }
            };
            
            // Update any dynamic content
            this.updateDynamicContent();
            
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    updateDynamicContent() {
        // Update elements with data-translate attributes
        const translatableElements = document.querySelectorAll('[data-translate]');
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update form placeholders
        this.updateFormPlaceholders();
        
        // Update any dynamically generated content
        this.updateWeatherWidget();
    }

    updateFormPlaceholders() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                const placeholderKey = input.getAttribute('data-placeholder');
                if (placeholderKey) {
                    const translation = this.getTranslation(placeholderKey);
                    if (translation) {
                        input.placeholder = translation;
                    }
                }
            });
        });
    }

    updateWeatherWidget() {
        // Update weather widget if it exists
        const weatherWidget = document.querySelector('.weather-widget');
        if (weatherWidget && window.pacificPanamaApp) {
            const weatherData = window.pacificPanamaApp.weatherData[this.currentLanguage];
            if (weatherData) {
                window.pacificPanamaApp.updateWeatherWidget(weatherData);
            }
        }
    }

    getTranslation(key, defaultValue = null) {
        const translation = this.translations[this.currentLanguage]?.[key];
        return translation || defaultValue || key;
    }

    formatDate(date, options = {}) {
        const locale = this.currentLanguage === 'es' ? 'es-PA' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    formatCurrency(amount, currency = 'USD') {
        const locale = this.currentLanguage === 'es' ? 'es-PA' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    formatNumber(number, options = {}) {
        const locale = this.currentLanguage === 'es' ? 'es-PA' : 'en-US';
        return new Intl.NumberFormat(locale, options).format(number);
    }

    dispatchLanguageChangeEvent(language) {
        const event = new CustomEvent('languageChanged', {
            detail: { language, translations: this.translations[language] }
        });
        document.dispatchEvent(event);
    }

    // Utility method to check if text direction should be RTL
    isRTL() {
        // Spanish and English are both LTR, but this could be useful for future languages
        return false;
    }

    // Method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Method to get all supported languages
    getSupportedLanguages() {
        return [...this.supportedLanguages];
    }

    // Method to check if a language is supported
    isLanguageSupported(language) {
        return this.supportedLanguages.includes(language);
    }

    // Method to detect browser language
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        return this.isLanguageSupported(langCode) ? langCode : 'en';
    }

    // Method to auto-detect and set language on first visit
    autoDetectLanguage() {
        const savedLang = localStorage.getItem('pacific-panama-language');
        if (!savedLang) {
            const detectedLang = this.detectBrowserLanguage();
            this.setLanguage(detectedLang);
        }
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    
    // Optional: Auto-detect language on first visit
    // window.languageManager.autoDetectLanguage();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}
