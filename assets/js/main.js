// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Open mobile menu
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close mobile menu
menuClose.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close menu when clicking navigation links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL POLYFILL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip empty anchors
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// WAITLIST FORM HANDLER (localStorage)
// ============================================
const waitlistForm = document.getElementById('waitlistForm');
const emailInput = document.getElementById('emailInput');
const waitlistMessage = document.getElementById('waitlistMessage');

waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (email) {
        // Get existing waitlist from localStorage
        let waitlist = JSON.parse(localStorage.getItem('whiskerworks_waitlist') || '[]');
        
        // Check if email already exists
        if (!waitlist.includes(email)) {
            waitlist.push(email);
            localStorage.setItem('whiskerworks_waitlist', JSON.stringify(waitlist));
        }
        
        // Show success message
        waitlistMessage.classList.remove('hidden');
        emailInput.value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            waitlistMessage.classList.add('hidden');
        }, 5000);
        
        console.log('Waitlist:', waitlist); // For debugging
    }
});

// ============================================
// HEADER SCROLL EFFECT (Optional enhancement)
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// IMAGE LAZY LOADING FALLBACK
// ============================================
// Modern browsers support native lazy loading, but here's a fallback
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    console.log('Native lazy loading supported');
} else {
    // Fallback for older browsers (simple implementation)
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// CONSOLE EASTER EGG (Optional fun)
// ============================================
console.log('%c🐾 WhiskerWorks ', 'background: #F59E0B; color: #0F172A; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%cLooking for something? Check out our GitHub: https://github.com/WhiskerWorks72/WhiskerWorks', 'color: #F59E0B; font-size: 14px;');
