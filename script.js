// ================================
// Preloader
// ================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);
});

// ================================
// Hamburger Menu Toggle
// ================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================================
// Dark/Light Mode Toggle
// ================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save theme preference
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// ================================
// Smooth Scrolling
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Header Scroll Effect
// ================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 0) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ================================
// Notify Form Handling
// ================================
const notifyForm = document.getElementById('notifyForm');

if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = notifyForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Store email in localStorage
        let emails = JSON.parse(localStorage.getItem('whiskerworks_emails') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('whiskerworks_emails', JSON.stringify(emails));
        }
        
        // Show success message
        const originalHTML = notifyForm.innerHTML;
        notifyForm.innerHTML = '<p style="color: var(--primary-red); font-weight: 600;">✓ Thanks! We\'ll notify you when merch drops!</p>';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            notifyForm.innerHTML = originalHTML;
            // Re-attach event listener
            const newEmailInput = notifyForm.querySelector('input[type="email"]');
            notifyForm.addEventListener('submit', arguments.callee);
        }, 3000);
    });
}

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.crew-card, .gear-card, .merch-card, .donate-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// Video Card Click Handlers - REMOVED
// ================================

// ================================
// Contact Form Handling
// ================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Let Formspree handle the submission
        // This is just for visual feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Re-enable after 2 seconds (Formspree will handle the actual submission)
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// ================================
// Parallax Effect for Hero Video
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo && scrolled < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ================================
// Dynamic Active Nav Link
// ================================
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================================
// Add CSS for Active Nav Link
// ================================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-red) !important;
    }
`;
document.head.appendChild(style);

// ================================
// Lazy Loading Images
// ================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ================================
// Console Message
// ================================
console.log('%c🐾 WhiskerWorks', 'color: #E63946; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ for Archie, Rocco, Pete & Des', 'color: #64748b; font-size: 14px;');
console.log('%cYouTube: https://www.youtube.com/@PawfectlyWhiskered', 'color: #F77F00; font-size: 12px;');

// ================================
// Prevent Form Resubmission
// ================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ================================
// Easter Egg - Konami Code
// ================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('🎉 Secret pet power activated! 🐾');
    }
});

// ================================
// Performance Monitoring
// ================================
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});
