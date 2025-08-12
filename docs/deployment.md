# Deployment Guide
## Pacific Panama 🇵🇦 Fishing Expeditions

This document provides comprehensive instructions for deploying the Pacific Panama Fishing website to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:
- A complete copy of the repository
- Access to your chosen hosting platform
- Domain name (if using custom domain)
- SSL certificate (recommended)

## Deployment Options

### 1. GitHub Pages (Free)

GitHub Pages is an excellent free option for static websites.

#### Setup Steps:
1. **Push to GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/pacific-panama-fishing.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Save settings

3. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/pacific-panama-fishing`
   - Custom domain can be configured in Pages settings

#### GitHub Pages Configuration:
- Build time: ~1-2 minutes
- SSL: Automatically provided
- CDN: Global distribution included
- Updates: Automatic on git push

### 2. Vercel (Recommended)

Vercel offers excellent performance and easy deployment for static sites.

#### Setup Steps:
1. **Connect Repository**
   - Sign up at [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   ```
   Framework Preset: Other
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: (leave empty)
   ```

3. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - Common variables: `CONTACT_EMAIL`, `ANALYTICS_ID`

4. **Deploy**
   - Click "Deploy"
   - Vercel will provide a URL like `pacific-panama-fishing.vercel.app`

#### Vercel Features:
- Automatic SSL
- Global CDN
- Instant deployment
- Branch previews
- Custom domains

### 3. Netlify

Netlify is another excellent option for static site hosting.

#### Setup Steps:
1. **Connect Repository**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select repository

2. **Build Settings**
   ```
   Build command: (leave empty)
   Publish directory: (leave empty or "./")
   ```

3. **Deploy**
   - Site will be available at random subdomain
   - Custom domain can be added in site settings

#### Netlify Features:
- Form handling
- Edge functions
- Split testing
- Analytics
- Identity management

### 4. Traditional Web Hosting

For shared hosting or VPS deployment:

#### File Upload Method:
1. **Prepare Files**
   ```bash
   # Create production build
   cp -r . /path/to/upload/folder
   # Remove development files
   rm -rf .git node_modules .vscode
   ```

2. **Upload via FTP/SFTP**
   - Use FileZilla, WinSCP, or similar
   - Upload all files to public_html or www directory
   - Ensure file permissions are correct (644 for files, 755 for directories)

3. **Configure Domain**
   - Point domain A record to server IP
   - Set up SSL certificate
   - Configure redirects if needed

## Domain Configuration

### Custom Domain Setup:

1. **DNS Configuration**
   ```
   Type: A
   Name: @
   Value: [Your hosting IP]
   
   Type: CNAME
   Name: www
   Value: yourdomain.com
   ```

2. **SSL Certificate**
   - Most modern hosts provide free SSL via Let's Encrypt
   - Ensure HTTPS redirect is enabled
   - Update any hardcoded HTTP links to HTTPS

3. **Email Setup**
   - Configure email forwarding for info@pacificpanamafishing.com
   - Set up Google Workspace or similar for professional email

## Performance Optimization

### Pre-Deployment Checklist:

1. **Image Optimization**
   - Compress all images using tools like TinyPNG
   - Use appropriate image formats (WebP where supported)
   - Implement lazy loading for gallery images

2. **CSS/JS Optimization**
   - Minify CSS and JavaScript files
   - Remove unused CSS rules
   - Combine multiple CSS/JS files where possible

3. **SEO Optimization**
   - Verify all meta tags are present
   - Check that hreflang tags are implemented
   - Ensure sitemap.xml is created and submitted

4. **Performance Testing**
   - Run Google PageSpeed Insights
   - Test with GTmetrix
   - Verify mobile responsiveness

## Post-Deployment Setup

### Analytics Configuration:

1. **Google Analytics 4**
   ```html
   <!-- Add to all HTML files before closing </head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Google Search Console**
   - Add and verify your domain
   - Submit sitemap.xml
   - Monitor search performance

3. **Facebook Pixel** (if using Facebook ads)
   ```html
   <!-- Add Facebook Pixel code -->
   <script>
     !function(f,b,e,v,n,t,s)
     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
     t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', 'YOUR_PIXEL_ID');
     fbq('track', 'PageView');
   </script>
   ```

### Form Handling Setup:

1. **Netlify Forms** (if using Netlify)
   - Add `netlify` attribute to forms
   - Configure form notifications
   - Set up spam protection

2. **Formspree** (for other hosts)
   - Sign up at formspree.io
   - Update form action URLs
   - Configure email notifications

3. **Custom Backend** (advanced)
   - Set up Node.js/PHP backend for form processing
   - Implement email sending functionality
   - Add spam protection with reCAPTCHA

## Security Considerations

### Security Headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

### Regular Maintenance:
- Monitor for broken links
- Update contact information as needed
- Refresh catch log entries regularly
- Update fish photos seasonally
- Review and update pricing annually

## Backup Strategy

1. **Repository Backup**
   - Maintain GitHub repository as primary backup
   - Use multiple remotes if desired
   - Tag releases for version control

2. **Content Backup**
   - Regular database exports (if dynamic content added)
   - Image backups to cloud storage
   - Form submission exports

## Monitoring and Maintenance

### Performance Monitoring:
- Set up Google PageSpeed monitoring
- Monitor Core Web Vitals
- Track loading times across different locations

### Uptime Monitoring:
- Use UptimeRobot or similar service
- Set up email alerts for downtime
- Monitor from multiple global locations

### Content Updates:
- Update catch log entries weekly
- Refresh gallery photos monthly
- Review and update pricing seasonally
- Update fishing season information annually

## Troubleshooting

### Common Issues:

1. **CSS/JS Not Loading**
   - Check file paths (relative vs absolute)
   - Verify MIME types are set correctly
   - Clear browser cache

2. **Form Submissions Not Working**
   - Verify form action URLs
   - Check spam folder for notifications
   - Test with different email providers

3. **Mobile Display Issues**
   - Test on actual devices
   - Use browser developer tools
   - Verify viewport meta tag

4. **Language Toggle Not Working**
   - Check JavaScript console for errors
   - Verify translation files are loaded
   - Test localStorage functionality

## Support Contacts

For deployment assistance:
- Repository issues: Create GitHub issue
- Hosting support: Contact your hosting provider
- Domain issues: Contact domain registrar
- SSL problems: Check with hosting provider

Remember to keep all credentials secure and never commit sensitive information to the repository.
