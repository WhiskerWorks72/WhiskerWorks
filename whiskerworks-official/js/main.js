/* ===================================
   WHISKER WORKS - MAIN JAVASCRIPT
   Navigation, Dark Mode, Interactivity
   =================================== */

// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.backgroundColor = 'rgba(10, 15, 26, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 15, 26, 0.98)';
        }
        
        lastScroll = currentScroll;
    });
    
});

// ===== DARK MODE TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        // Save preference
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===== FORM HANDLING =====

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Store in localStorage (in production, send to backend)
        let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
            alert('Thank you for subscribing! 🎉');
            this.reset();
        } else {
            alert('You are already subscribed!');
        }
    });
}

// Waitlist Form
const waitlistForm = document.getElementById('waitlist-form');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Store in localStorage (in production, send to backend)
        let waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
        if (!waitlist.includes(email)) {
            waitlist.push(email);
            localStorage.setItem('waitlist', JSON.stringify(waitlist));
            alert('Welcome to the waitlist! We\'ll notify you soon. 🚀');
            this.reset();
        } else {
            alert('You are already on the waitlist!');
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            message: this.querySelector('[name="message"]').value,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage (in production, send to backend)
        let messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        messages.push(formData);
        localStorage.setItem('contact_messages', JSON.stringify(messages));
        
        alert('Thank you for your message! We\'ll get back to you soon. 📧');
        this.reset();
    });
}

// ===== VOTING SYSTEM =====
const voteForms = document.querySelectorAll('.vote-form');
voteForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const pollId = this.dataset.pollId;
        const selectedOption = this.querySelector('input[type="radio"]:checked');
        
        if (!selectedOption) {
            alert('Please select an option!');
            return;
        }
        
        // Store vote in localStorage
        let votes = JSON.parse(localStorage.getItem('votes') || '{}');
        
        // Check if user already voted for this poll
        if (votes[pollId]) {
            alert('You have already voted in this poll!');
            return;
        }
        
        votes[pollId] = selectedOption.value;
        localStorage.setItem('votes', JSON.stringify(votes));
        
        // Update the display
        updateVoteDisplay(pollId);
        
        alert('Thank you for voting! 🗳️');
    });
});

function updateVoteDisplay(pollId) {
    // This would update the progress bars with vote counts
    // In a real implementation, this would fetch data from a backend
    const voteDisplay = document.querySelector(`[data-poll-id="${pollId}"] .vote-results`);
    if (voteDisplay) {
        voteDisplay.classList.remove('hidden');
    }
}

// ===== PROGRESS BAR ANIMATION =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.dataset.progress || '0';
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    });
}

// Animate progress bars when they come into view
const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.dataset.progress || '0';
                bar.style.width = width + '%';
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.progress-container').forEach(container => {
    progressObserver.observe(container);
});

// ===== PRODUCT VOTING =====
const voteButtons = document.querySelectorAll('.vote-btn');
voteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productId = this.dataset.productId;
        const productName = this.dataset.productName;
        
        // Store vote
        let productVotes = JSON.parse(localStorage.getItem('product_votes') || '{}');
        productVotes[productId] = (productVotes[productId] || 0) + 1;
        localStorage.setItem('product_votes', JSON.stringify(productVotes));
        
        // Update button
        this.textContent = '✓ Voted';
        this.disabled = true;
        this.style.opacity = '0.6';
        
        alert(`Thank you for voting for ${productName}! 🎉`);
    });
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    if (stat.dataset.target) {
        statsObserver.observe(stat);
    }
});

// ===== LAZY LOADING IMAGES =====
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== VIDEO AUTOPLAY ON SCROLL =====
const videos = document.querySelectorAll('video[data-autoplay]');
const videoObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    videoObserver.observe(video);
});

// ===== INIT =====
console.log('Whisker Works - Loaded ✨');
