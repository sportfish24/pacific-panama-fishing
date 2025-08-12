# Development Guide
## Pacific Panama 🇵🇦 Fishing Expeditions

This document provides comprehensive instructions for developers working on the Pacific Panama Fishing website.

## Project Overview

The Pacific Panama Fishing website is a modern, bilingual (English/Spanish) static website built with:
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No framework dependencies
- **Mobile-first design** - Responsive across all devices
- **SEO optimized** - Search engine friendly structure

## Development Environment Setup

### Prerequisites

1. **Code Editor**
   - VS Code (recommended)
   - Sublime Text
   - Atom
   - WebStorm

2. **Local Web Server**
   - Live Server (VS Code extension) - recommended
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - XAMPP/WAMP (if using PHP features)

3. **Browser Developer Tools**
   - Chrome DevTools (recommended)
   - Firefox Developer Tools
   - Safari Web Inspector

4. **Git Version Control**
   ```bash
   git --version
   # If not installed, download from git-scm.com
   ```

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "ritwickdey.liveserver",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-css-peek"
  ]
}
```

### Initial Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/pacific-panama-fishing.git
   cd pacific-panama-fishing
   ```

2. **Start Development Server**
   ```bash
   # Using Live Server in VS Code (right-click index.html -> "Open with Live Server")
   # OR using Python
   python -m http.server 8000
   # OR using Node.js
   npx http-server -p 8000
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000`
   - Test responsive design using browser dev tools

## Project Structure Deep Dive

```
pacific-panama-fishing/
├── index.html                 # Homepage
├── assets/                    # Static assets
│   ├── css/
│   │   ├── main.css          # Core styles
│   │   └── responsive.css    # Mobile responsiveness
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   ├── language.js       # Bilingual system
│   │   └── navigation.js     # Navigation handling
│   ├── images/               # Image assets
│   │   ├── logo/            # Brand logos
│   │   ├── fish-species/    # Fish photos
│   │   ├── gallery/         # Gallery images
│   │   └── backgrounds/     # Background images
│   └── data/                # JSON data files
│       ├── translations.json # Language translations
│       └── catch-log.json    # Fishing log entries
├── pages/                   # Individual pages
│   ├── charters.html
│   ├── species.html
│   ├── catch-log.html
│   ├── gallery.html
│   └── contact.html
├── components/              # Reusable components
│   ├── header.html
│   ├── footer.html
│   └── navigation.html
└── docs/                   # Documentation
    ├── deployment.md
    └── development.md
```

## Coding Standards

### HTML Guidelines

1. **Semantic HTML**
   ```html
   <!-- Good -->
   <nav class="navbar">
     <ul class="nav-menu">
       <li><a href="#" class="nav-link">Home</a></li>
     </ul>
   </nav>
   
   <!-- Avoid -->
   <div class="navbar">
     <div class="nav-menu">
       <div><a href="#">Home</a></div>
     </div>
   </div>
   ```

2. **Accessibility**
   ```html
   <!-- Include proper ARIA labels -->
   <button aria-expanded="false" aria-controls="nav-menu">Menu</button>
   
   <!-- Use semantic headings -->
   <h1>Main Title</h1>
   <h2>Section Title</h2>
   <h3>Subsection Title</h3>
   
   <!-- Proper alt text -->
   <img src="marlin.jpg" alt="450lb Blue Marlin caught off Punta Burica">
   ```

3. **Bilingual Content**
   ```html
   <!-- Use language spans for all user-facing text -->
   <h1>
     <span class="lang-en">Pacific Panama Fishing</span>
     <span class="lang-es">Pesca Pacific Panama</span>
   </h1>
   ```

### CSS Guidelines

1. **CSS Variables**
   ```css
   /* Use CSS variables for consistency */
   :root {
     --primary-blue: #0066cc;
     --sunset-orange: #ff6b35;
     --spacing-md: 30px;
   }
   
   .feature-card {
     color: var(--primary-blue);
     margin: var(--spacing-md);
   }
   ```

2. **Mobile-First Approach**
   ```css
   /* Base styles for mobile */
   .container {
     padding: 0 15px;
   }
   
   /* Tablet and up */
   @media (min-width: 768px) {
     .container {
       padding: 0 30px;
     }
   }
   
   /* Desktop and up */
   @media (min-width: 1024px) {
     .container {
       max-width: 1200px;
       margin: 0 auto;
     }
   }
   ```

3. **BEM Methodology (when applicable)**
   ```css
   .pricing-card { }
   .pricing-card__title { }
   .pricing-card__price { }
   .pricing-card--featured { }
   ```

### JavaScript Guidelines

1. **ES6+ Features**
   ```javascript
   // Use const/let instead of var
   const apiEndpoint = 'https://api.example.com';
   let currentLanguage = 'en';
   
   // Arrow functions
   const toggleLanguage = () => {
     currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
   };
   
   // Template literals
   const message = `Current language: ${currentLanguage}`;
   
   // Destructuring
   const { name, email, phone } = formData;
   ```

2. **Error Handling**
   ```javascript
   async function loadTranslations() {
     try {
       const response = await fetch('assets/data/translations.json');
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       const data = await response.json();
       return data;
     } catch (error) {
       console.error('Failed to load translations:', error);
       // Fallback behavior
       return defaultTranslations;
     }
   }
   ```

3. **Event Delegation**
   ```javascript
   // Efficient event handling
   document.addEventListener('click', (event) => {
     if (event.target.matches('.nav-link')) {
       handleNavigation(event);
     }
     if (event.target.matches('.species-image')) {
       openLightbox(event);
     }
   });
   ```

## Bilingual Development

### Translation System

1. **Translation Keys**
   ```javascript
   // Use descriptive, hierarchical keys
   {
     "navigation": {
       "home": "Home",
       "charters": "Charters"
     },
     "hero": {
       "title": "Pacific Panama Fishing",
       "subtitle": "World-class sport fishing"
     }
   }
   ```

2. **Dynamic Content Updates**
   ```javascript
   function updateContent(language) {
     document.querySelectorAll('[data-translate]').forEach(element => {
       const key = element.getAttribute('data-translate');
       const translation = getTranslation(key, language);
       element.textContent = translation;
     });
   }
   ```

3. **Form Translations**
   ```html
   <!-- Use data attributes for form elements -->
   <input type="text" data-placeholder="form.name" required>
   <label data-translate="form.email">Email</label>
   ```

## Component Development

### Reusable Components

1. **Navigation Component**
   ```html
   <!-- components/navigation.html -->
   <nav class="navbar" id="navbar">
     <!-- Navigation content -->
   </nav>
   ```

2. **Footer Component**
   ```html
   <!-- components/footer.html -->
   <footer class="footer">
     <!-- Footer content -->
   </footer>
   ```

3. **Including Components** (for future PHP/SSG integration)
   ```php
   <?php include 'components/navigation.html'; ?>
   ```

### Form Components

1. **Contact Form Enhancement**
   ```javascript
   class ContactForm {
     constructor(formElement) {
       this.form = formElement;
       this.bindEvents();
     }
     
     bindEvents() {
       this.form.addEventListener('submit', this.handleSubmit.bind(this));
       this.form.addEventListener('input', this.handleInput.bind(this));
     }
     
     handleSubmit(event) {
       event.preventDefault();
       // Form submission logic
     }
   }
   ```

## Performance Optimization

### Image Optimization

1. **Responsive Images**
   ```html
   <picture>
     <source media="(min-width: 768px)" srcset="marlin-large.webp">
     <source media="(min-width: 480px)" srcset="marlin-medium.webp">
     <img src="marlin-small.webp" alt="Blue Marlin" loading="lazy">
   </picture>
   ```

2. **Lazy Loading**
   ```javascript
   // Intersection Observer for lazy loading
   const imageObserver = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const img = entry.target;
         img.src = img.dataset.src;
         img.classList.remove('lazy');
         observer.unobserve(img);
       }
     });
   });
   
   document.querySelectorAll('img[data-src]').forEach(img => {
     imageObserver.observe(img);
   });
   ```

### CSS Optimization

1. **Critical CSS**
   ```html
   <!-- Inline critical CSS for above-the-fold content -->
   <style>
     /* Critical styles here */
   </style>
   ```

2. **CSS Loading**
   ```html
   <!-- Preload important CSS -->
   <link rel="preload" href="assets/css/main.css" as="style">
   <link rel="stylesheet" href="assets/css/main.css">
   ```

### JavaScript Optimization

1. **Code Splitting**
   ```javascript
   // Load non-critical scripts asynchronously
   function loadScript(src) {
     const script = document.createElement('script');
     script.src = src;
     script.async = true;
     document.head.appendChild(script);
   }
   
   // Load analytics after page load
   window.addEventListener('load', () => {
     loadScript('https://www.googletagmanager.com/gtag/js?id=GA_ID');
   });
   ```

## Testing Guidelines

### Browser Testing

1. **Cross-Browser Compatibility**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)
   - Mobile browsers (iOS Safari, Chrome Mobile)

2. **Device Testing**
   ```javascript
   // Test responsive breakpoints
   const breakpoints = {
     mobile: '480px',
     tablet: '768px',
     desktop: '1024px',
     large: '1200px'
   };
   ```

### Accessibility Testing

1. **Tools**
   - axe-core browser extension
   - WAVE Web Accessibility Evaluator
   - Lighthouse accessibility audit

2. **Manual Testing**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast ratios
   - Focus indicators

### Performance Testing

1. **Tools**
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest
   - Lighthouse

2. **Metrics to Monitor**
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

## Debugging

### Common Issues

1. **Language Toggle Problems**
   ```javascript
   // Debug language switching
   console.log('Current language:', document.body.classList.contains('spanish') ? 'es' : 'en');
   console.log('localStorage language:', localStorage.getItem('pacific-panama-language'));
   ```

2. **Mobile Menu Issues**
   ```javascript
   // Debug mobile menu
   const mobileMenu = document.querySelector('.nav-menu');
   console.log('Mobile menu classes:', mobileMenu.className);
   console.log('Mobile menu display:', getComputedStyle(mobileMenu).display);
   ```

3. **Form Validation**
   ```javascript
   // Debug form validation
   function debugForm(form) {
     const formData = new FormData(form);
     for (let [key, value] of formData.entries()) {
       console.log(key, value);
     }
   }
   ```

### Browser Developer Tools

1. **Console Commands**
   ```javascript
   // Test language switching
   window.languageManager.setLanguage('es');
   
   // Test navigation
   window.navigationManager.navigateToPage('charters.html');
   
   // Check form validation
   window.pacificPanamaApp.validateField(document.getElementById('email'));
   ```

## Version Control

### Git Workflow

1. **Branch Naming**
   ```bash
   git checkout -b feature/species-page-enhancement
   git checkout -b fix/mobile-navigation-bug
   git checkout -b hotfix/contact-form-issue
   ```

2. **Commit Messages**
   ```bash
   git commit -m "feat: add species page with detailed fish information"
   git commit -m "fix: resolve mobile navigation menu overlay issue"
   git commit -m "docs: update deployment guide with Vercel instructions"
   ```

3. **Pull Request Process**
   - Create feature branch
   - Make changes and test thoroughly
   - Submit pull request with detailed description
   - Code review and approval
   - Merge to main branch

## Deployment Preparation

### Pre-Deployment Checklist

1. **Code Quality**
   - [ ] HTML validates (W3C Validator)
   - [ ] CSS validates
   - [ ] JavaScript has no console errors
   - [ ] All images have alt text
   - [ ] All links work correctly

2. **Performance**
   - [ ] Images optimized
   - [ ] CSS/JS minified (if applicable)
   - [ ] Lighthouse score > 90
   - [ ] Mobile-friendly test passes

3. **Content**
   - [ ] All text reviewed for accuracy
   - [ ] Contact information verified
   - [ ] Pricing information current
   - [ ] Catch log entries recent

4. **SEO**
   - [ ] Meta descriptions present
   - [ ] Title tags optimized
   - [ ] Structured data implemented
   - [ ] Sitemap.xml created

## Future Enhancements

### Planned Features

1. **Content Management**
   - Admin panel for catch log entries
   - Image upload system
   - Dynamic pricing updates

2. **Booking System**
   - Real-time availability calendar
   - Online payment processing
   - Automatic confirmation emails

3. **Analytics Integration**
   - Enhanced user tracking
   - Conversion funnel analysis
   - A/B testing framework

4. **Progressive Web App**
   - Service worker implementation
   - Offline functionality
   - App-like experience

## Support and Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C Web Standards](https://www.w3.org/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe Accessibility Checker](https://www.deque.com/axe/)
- [GTmetrix](https://gtmetrix.com/)

### Community
- Stack Overflow for technical questions
- GitHub Issues for project-specific problems
- Web development communities for best practices

Remember to keep this documentation updated as the project evolves and new features are added.
