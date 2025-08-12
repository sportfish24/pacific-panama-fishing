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
        submitButton.textContent = this.currentLanguage === 'es' ? 'Enviando...' : 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const successMsg = this.currentLanguage === 'es' 
                ? '¡Gracias! Hemos recibido tu solicitud. Te contactaremos dentro de 2 horas.'
                : 'Thank you! We have received your request. We will contact you within 2 hours.';
            
            this.showNotification(successMsg, 'success');
            
            // Reset form
            form.reset();
            
            // Restore button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Log submission data (for development)
            console.log('Form submission data:', Object.fromEntries(formData));
            
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    handleHashLinks(event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        event.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleResize() {
        // Handle window resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateResponsiveElements();
        }, 250);
    }

    updateResponsiveElements() {
        // Update elements that need responsive adjustments
        const isMobile = window.innerWidth <= 768;
        
        // Adjust navbar behavior
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !isMobile) {
            navMenu.classList.remove('active');
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is now hidden
            this.pauseAnimations();
        } else {
            // Page is now visible
            this.resumeAnimations();
        }
    }

    pauseAnimations() {
        // Pause any running animations to save battery
        const animatedElements = document.querySelectorAll('.fade-in, .hero');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        // Resume animations when page becomes visible
        const animatedElements = document.querySelectorAll('.fade-in, .hero');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    initIntersectionObserver() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    // Optionally stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.feature-card, .species-card, .pricing-card, .log-entry').forEach(el => {
            observer.observe(el);
        });
    }

    loadLanguagePreference() {
        const savedLang = localStorage.getItem('pacific-panama-language');
        if (savedLang === 'spanish') {
            document.body.classList.add('spanish');
            document.documentElement.lang = 'es';
            this.currentLanguage = 'es';
        }
    }

    loadWeatherData() {
        // Load and display current weather data
        const currentWeather = this.weatherData[this.currentLanguage] || this.weatherData.en;
        
        console.log('Weather data loaded for Punta Burica:');
        console.log(`Condition: ${currentWeather.condition}`);
        console.log(`Temperature: ${currentWeather.temp}`);
        console.log(`Wind: ${currentWeather.wind}`);
        console.log(`Wave Height: ${currentWeather.waves}`);
        
        // Update weather widget if it exists
        this.updateWeatherWidget(currentWeather);
    }

    updateWeatherWidget(weatherData) {
        const weatherWidget = document.querySelector('.weather-widget');
        if (weatherWidget) {
            weatherWidget.innerHTML = `
                <div class="weather-info">
                    <div class="weather-condition">${weatherData.condition}</div>
                    <div class="weather-temp">${weatherData.temp}</div>
                    <div class="weather-wind">${weatherData.wind}</div>
                    <div class="weather-waves">${weatherData.waves}</div>
                </div>
            `;
        }
    }

    // Utility functions
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Analytics and tracking (placeholder)
    trackEvent(eventName, eventData = {}) {
        // Integrate with Google Analytics, Facebook Pixel, etc.
        console.log('Event tracked:', eventName, eventData);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    // API integration helpers
    async apiCall(endpoint, method = 'GET', data = null) {
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await fetch(endpoint, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pacificPanamaApp = new PacificPanamaFishing();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PacificPanamaFishing;
}
