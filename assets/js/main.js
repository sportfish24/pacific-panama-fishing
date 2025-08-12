/**
 * Pacific Panama Fishing Expeditions - Main JavaScript
 * Core functionality and initialization
 */

class PacificPanamaFishing {
    constructor() {
        this.currentLanguage = 'en';
        this.weatherData = {
            en: {
                condition: "Partly Cloudy",
                temp: "28°C / 82°F",
                wind: "15 knots E",
                waves: "1-2 feet"
            },
            es: {
                condition: "Parcialmente Nublado", 
                temp: "28°C / 82°F",
                wind: "15 nudos E",
                waves: "1-2 pies"
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initScrollEffects();
        this.initImageLightbox();
        this.initFormHandlers();
        this.loadWeatherData();
        this.initIntersectionObserver();
        
        // Load saved language preference
        this.loadLanguagePreference();
    }

    bindEvents() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));
        
        // Form submissions
        document.addEventListener('submit', this.handleFormSubmission.bind(this));
        
        // Smooth scrolling for hash links
        document.addEventListener('click', this.handleHashLinks.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Page visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    initScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    initImageLightbox() {
        // Image lightbox functionality
        document.querySelectorAll('.species-image, .log-image, .gallery-image').forEach(img => {
            img.addEventListener('click', this.openLightbox.bind(this));
        });
    }

    openLightbox(event) {
        const img = event.target;
        
        // Create lightbox overlay
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.src;
        enlargedImg.alt = img.alt;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            enlargedImg.style.transform = 'scale(1)';
        }, 10);
        
        // Close lightbox handlers
        overlay.addEventListener('click', () => this.closeLightbox(overlay));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox(overlay);
            }
        });
    }

    closeLightbox(overlay) {
        if (!document.body.contains(overlay)) return;
        
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }

    initFormHandlers() {
        // Contact form validation and enhancement
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.enhanceForm(form);
        });
    }

    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.required;
        
        let isValid = true;
        let message = '';
        
        if (required && !value) {
            isValid = false;
            message = this.currentLanguage === 'es' ? 'Este campo es requerido' : 'This field is required';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = this.currentLanguage === 'es' ? 'Email inválido' : 'Invalid email';
        } else if (type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = this.currentLanguage === 'es' ? 'Teléfono inválido' : 'Invalid phone number';
        }
        
        this.updateFieldValidation(field, isValid, message);
        return isValid;
    }

    updateFieldValidation(field, isValid, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        // Remove existing validation elements
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Update field styling
        field.style.borderColor = isValid ? '' : '#e74c3c';
        
        // Add error message if needed
        if (!isValid && message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: #e74c3c;
                font-size: 0.9rem;
                margin-top: 5px;
            `;
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        }
    }

    handleFormSubmission(event) {
        if (!event.target.matches('form')) return;
        
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Validate all fields
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification(
                this.currentLanguage === 'es' ? 
                'Por favor, corrija los errores en el formulario' : 
                'Please correct the errors in the form',
                'error'
            );
            return;
        }
        
        // Process form submission
        this.processFormSubmission(form, formData);
    }

    processFormSubmission(form, formData) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = this.currentLanguage === 'es' ? 'Envian
