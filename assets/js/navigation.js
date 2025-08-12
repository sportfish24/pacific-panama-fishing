/**
 * Pacific Panama Fishing Expeditions - Navigation Management
 * Handles navigation, mobile menu, and page transitions
 */

class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPageFromURL();
        this.mobileMenuOpen = false;
        this.scrollPosition = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveNavLink();
        this.handleMobileMenu();
        this.initSmoothScrolling();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', this.handleOutsideClick.bind(this));

        // Handle browser back/forward buttons
        window.addEventListener('popstate', this.handlePopState.bind(this));

        // Close mobile menu on window resize
        window.addEventListener('resize', this.handleWindowResize.bind(this));

        // Handle escape key for mobile menu
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    getCurrentPageFromURL() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        
        // If it's the root or index.html, return 'home'
        if (page === '' || page === 'index.html') {
            return 'home';
        }
        
        // Remove .html extension
        return page.replace('.html', '');
    }

    setActiveNavLink() {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current page link
        const currentPageLink = this.findNavLinkForPage(this.currentPage);
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    }

    findNavLinkForPage(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        for (const link of navLinks) {
            const href = link.getAttribute('href');
            if (href) {
                const linkPage = href.split('/').pop().replace('.html', '');
                if (linkPage === pageName || (pageName === 'home' && linkPage === 'index')) {
                    return link;
                }
            }
        }
        return null;
    }

    handleNavClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        // Handle internal navigation
        if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
            event.preventDefault();
            this.navigateToPage(href);
        }

        // Close mobile menu after clicking
        this.closeMobileMenu();
    }

    navigateToPage(href) {
        // Get the page name from href
        const pageName = href.split('/').pop().replace('.html', '') || 'home';
        
        // Update current page
        this.currentPage = pageName;
        
        // Update active nav link
        this.setActiveNavLink();
        
        // Update URL without page reload
        if (href !== window.location.pathname) {
            history.pushState({ page: pageName }, '', href);
        }
        
        // Scroll to top smoothly
        this.scrollToTop();
        
        // Track page view
        this.trackPageView(pageName);
    }

    scrollToTop(behavior = 'smooth') {
        window.scrollTo({
            top: 0,
            behavior: behavior
        });
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (!navMenu) return;

        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (navMenu) {
            navMenu.classList.add('active');
        }
        
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '✕';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
        
        // Prevent body scroll when menu is open
        this.scrollPosition = window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.width = '100%';
        
        this.mobileMenuOpen = true;
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, this.scrollPosition);
        
        this.mobileMenuOpen = false;
    }

    handleOutsideClick(event) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        // Check if mobile menu is open and click is outside
        if (this.mobileMenuOpen && navMenu && !navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            this.closeMobileMenu();
        }
    }

    handlePopState(event) {
        // Handle browser back/forward buttons
        const state = event.state;
        if (state && state.page) {
            this.currentPage = state.page;
            this.setActiveNavLink();
        } else {
            // Fallback to URL-based detection
            this.currentPage = this.getCurrentPageFromURL();
            this.setActiveNavLink();
        }
    }

    handleWindowResize() {
        // Close mobile menu on desktop breakpoint
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleKeydown(event) {
        // Close mobile menu on Escape key
        if (event.key === 'Escape' && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    initSmoothScrolling() {
        // Handle smooth scrolling for anchor links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            event.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                this.scrollToElement(target);
            }
        });
    }

    scrollToElement(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // Breadcrumb functionality
    generateBreadcrumb() {
        const pages = {
            'home': { name: { en: 'Home', es: 'Inicio' }, url: 'index.html' },
            'charters': { name: { en: 'Charters', es: 'Excursiones' }, url: 'pages/charters.html' },
            'species': { name: { en: 'Fish Species', es: 'Especies' }, url: 'pages/species.html' },
            'catch-log': { name: { en: 'Catch Log', es: 'Registro' }, url: 'pages/catch-log.html' },
            'gallery': { name: { en: 'Gallery', es: 'Galería' }, url: 'pages/gallery.html' },
            'contact': { name: { en: 'Contact', es: 'Contacto' }, url: 'pages/contact.html' }
        };
        
        const currentLang = document.body.classList.contains('spanish') ? 'es' : 'en';
        const currentPageData = pages[this.currentPage];
        
        if (!currentPageData) return '';
        
        let breadcrumb = `<a href="index.html">${pages.home.name[currentLang]}</a>`;
        
        if (this.currentPage !== 'home') {
            breadcrumb += ` > <span>${currentPageData.name[currentLang]}</span>`;
        }
        
        return breadcrumb;
    }

    updateBreadcrumb() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = this.generateBreadcrumb();
        }
    }

    // Page loading state management
    showLoadingState() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }

    hideLoadingState() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.remove();
        }
    }

    // Analytics tracking
    trackPageView(pageName) {
        // Track page views for analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: pageName,
                page_location: window.location.href
            });
        }
        
        // Track with custom event system
        if (window.pacificPanamaApp) {
            window.pacificPanamaApp.trackEvent('page_view', {
                page_name: pageName,
                page_url: window.location.href
            });
        }
    }

    // Utility methods
    getCurrentPage() {
        return this.currentPage;
    }

    isMobileMenuOpen() {
        return this.mobileMenuOpen;
    }

    // Navigation state management
    saveNavigationState() {
        const state = {
            currentPage: this.currentPage,
            scrollPosition: window.pageYOffset
        };
        sessionStorage.setItem('pacific-panama-nav-state', JSON.stringify(state));
    }

    restoreNavigationState() {
        const savedState = sessionStorage.getItem('pacific-panama-nav-state');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.currentPage = state.currentPage || this.getCurrentPageFromURL();
                this.setActiveNavLink();
                
                // Restore scroll position after a short delay
                setTimeout(() => {
                    if (state.scrollPosition) {
                        window.scrollTo(0, state.scrollPosition);
                    }
                }, 100);
            } catch (error) {
                console.error('Failed to restore navigation state:', error);
            }
        }
    }

    // Accessibility improvements
    handleFocusManagement() {
        // Manage focus for keyboard navigation
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                }
            });
        });
    }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    
    // Save navigation state before page unload
    window.addEventListener('beforeunload', () => {
        if (window.navigationManager) {
            window.navigationManager.saveNavigationState();
        }
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}
