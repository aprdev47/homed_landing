// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinkItems = navLinks.querySelectorAll('a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Device Detection for App Download
function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const iosDownload = document.getElementById('iosDownload');
    const androidDownload = document.getElementById('androidDownload');
    const deviceDetected = document.getElementById('deviceDetected');

    // Check if elements exist
    if (!iosDownload || !androidDownload || !deviceDetected) {
        return;
    }

    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        androidDownload.classList.add('hide-btn');
        deviceDetected.textContent = '📱 iOS device detected - Download from App Store';

        // Update iOS download link (replace with your actual App Store URL)
        iosDownload.href = 'https://apps.apple.com/app/homed';

        // Track device detection
        trackEvent('Device Detected', { platform: 'iOS' });
        return 'iOS';
    }

    // Detect Android
    if (/android/i.test(userAgent)) {
        iosDownload.classList.add('hide-btn');
        deviceDetected.textContent = '📱 Android device detected - Download from Google Play';

        // Update Android download link (replace with your actual Google Play URL)
        androidDownload.href = 'https://play.google.com/store/apps/details?id=com.homed.app';

        // Track device detection
        trackEvent('Device Detected', { platform: 'Android' });
        return 'Android';
    }

    // Desktop - show both buttons
    deviceDetected.textContent = '💻 Available on iOS and Android';

    // Set default links for desktop users
    iosDownload.href = 'https://apps.apple.com/app/homed';
    androidDownload.href = 'https://play.google.com/store/apps/details?id=com.homed.app';

    trackEvent('Device Detected', { platform: 'Desktop' });
    return 'Desktop';
}

// Run device detection when DOM is loaded
document.addEventListener('DOMContentLoaded', detectDevice);

// Track app download button clicks
document.addEventListener('DOMContentLoaded', () => {
    const iosDownload = document.getElementById('iosDownload');
    const androidDownload = document.getElementById('androidDownload');

    if (iosDownload) {
        iosDownload.addEventListener('click', (e) => {
            // For demo purposes, prevent default navigation
            // Remove e.preventDefault() when you have actual app store links
            e.preventDefault();

            trackEvent('App Download Click', {
                platform: 'iOS',
                url: iosDownload.href
            });

            alert('iOS App Store link - Replace with your actual App Store URL in script.js');
        });
    }

    if (androidDownload) {
        androidDownload.addEventListener('click', (e) => {
            // For demo purposes, prevent default navigation
            // Remove e.preventDefault() when you have actual app store links
            e.preventDefault();

            trackEvent('App Download Click', {
                platform: 'Android',
                url: androidDownload.href
            });

            alert('Google Play Store link - Replace with your actual Google Play URL in script.js');
        });
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);

    // Show success message (you can replace this with a more sophisticated notification)
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to your backend:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
    */
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.problem-card, .service-card, .benefit-card, .testimonial-card, .step'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to mobile menu toggle
mobileMenuToggle.addEventListener('click', function() {
    const spans = this.querySelectorAll('span');
    this.classList.toggle('active');

    if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Simple analytics tracking (replace with your analytics service)
const trackEvent = (eventName, properties) => {
    console.log('Event tracked:', eventName, properties);
    // In production, replace this with your analytics service:
    // analytics.track(eventName, properties);
};

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA Click', {
            text: button.textContent,
            location: window.location.pathname
        });
    });
});

// Track service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        trackEvent('Service Card Click', {
            service: card.querySelector('h3').textContent
        });
    });
});

// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth reveal animation to hero section
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Initialize hero animations
document.querySelectorAll('.hero-text > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
