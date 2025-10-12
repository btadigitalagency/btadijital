// ===============================================
// BTA DIJITAL - PHASE 1 JAVASCRIPT
// Smooth Scroll, Mobile Menu, Scroll Effects
// ===============================================

// ========== DOM ELEMENTS ==========
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ========== SCROLL SHADOW EFFECT ==========
// Add shadow to header when user scrolls down
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU TOGGLE ==========
// Toggle mobile navigation menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== SMOOTH SCROLL FOR INTERNAL LINKS ==========
// Smooth scroll to sections when clicking navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION LINK ==========
// Highlight active section in navigation on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ========== FADE-IN ANIMATION ON SCROLL ==========
// Observe elements and add animation when they come into view
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

// Apply to footer elements
document.querySelectorAll('.footer-column').forEach(column => {
    column.style.opacity = '0';
    column.style.transform = 'translateY(30px)';
    column.style.transition = 'all 0.6s ease-out';
    observer.observe(column);
});

// ========== PAGE LOAD ANIMATION ==========
// Hero section animates via CSS animation (fadeInUp with delay)
// No additional JS needed - handled by CSS animation property

// ========== FAQ ACCORDION ==========
// Toggle FAQ items on click
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items (optional - remove if you want multiple open)
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========== TESTIMONIAL FADE-IN ON SCROLL ==========
// Fade in testimonial cards when scrolled into view
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger effect by delaying each card
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 150);
            testimonialObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    testimonialObserver.observe(card);
});

// ========== SERVICE CARDS ANIMATION ==========
// Add animation to service cards on scroll
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            serviceObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    serviceObserver.observe(card);
});

// ========== ABOUT PAGE ANIMATIONS ==========
// Fade in animations for About Us page sections
if (document.querySelector('.who-text')) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe Who We Are section elements
    const whoText = document.querySelector('.who-text');
    const whoImage = document.querySelector('.who-image');
    if (whoText) aboutObserver.observe(whoText);
    if (whoImage) aboutObserver.observe(whoImage);
    
    // Observe Mission & Vision cards
    document.querySelectorAll('.mv-card').forEach(card => {
        aboutObserver.observe(card);
    });
    
    // Observe Values cards
    document.querySelectorAll('.value-card').forEach(card => {
        aboutObserver.observe(card);
    });
    
    // Observe Approach steps
    document.querySelectorAll('.approach-step').forEach(step => {
        aboutObserver.observe(step);
    });
    
    // Observe Team cards
    document.querySelectorAll('.team-card').forEach(card => {
        aboutObserver.observe(card);
    });
}

// ========== SERVICES PAGE ANIMATIONS ==========
// Fade in animations for Services page sections
if (document.querySelector('.overview-card')) {
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                servicesObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe Overview cards
    document.querySelectorAll('.overview-card').forEach(card => {
        servicesObserver.observe(card);
    });
    
    // Observe Service content blocks
    document.querySelectorAll('.service-content').forEach(content => {
        servicesObserver.observe(content);
    });
    
    // Observe Process steps
    document.querySelectorAll('.process-step').forEach(step => {
        servicesObserver.observe(step);
    });
    
    // Observe Why Us cards
    document.querySelectorAll('.why-card').forEach(card => {
        servicesObserver.observe(card);
    });
}

// ========== INFLUENCER PAGE ANIMATIONS ==========
// Fade in animations for Influencer page sections
if (document.querySelector('.why-text-block') || document.querySelector('.process-item')) {
    const influObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                influObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe Why section
    const whyText = document.querySelector('.why-text-block');
    const whyImage = document.querySelector('.why-image');
    if (whyText) influObserver.observe(whyText);
    if (whyImage) influObserver.observe(whyImage);
    
    // Observe Process items
    document.querySelectorAll('.process-item').forEach(item => {
        influObserver.observe(item);
    });
    
    // Observe Format cards
    document.querySelectorAll('.format-card').forEach(card => {
        influObserver.observe(card);
    });
    
    // Observe Tier cards
    document.querySelectorAll('.tier-card').forEach(card => {
        influObserver.observe(card);
    });
    
    // Observe Metric cards
    document.querySelectorAll('.metric-card').forEach(card => {
        influObserver.observe(card);
    });
    
    // Observe Case cards
    document.querySelectorAll('.case-card').forEach(card => {
        influObserver.observe(card);
    });
}

// ========== CONTACT FORM HANDLING ==========
// Handle contact form submission
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormFeedback('error', 'Lütfen tüm zorunlu alanları doldurun.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormFeedback('error', 'Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Simulate form submission (replace with actual backend call)
        showFormFeedback('success', 'Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
        
        // Reset form after successful submission
        setTimeout(() => {
            contactForm.reset();
            hideFormFeedback();
        }, 5000);
        
        // Log to console (for development)
        console.log('Form Submitted:', { name, email, phone, subject, message });
    });
}

function showFormFeedback(type, message) {
    if (formFeedback) {
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.textContent = message;
        formFeedback.style.display = 'block';
    }
}

function hideFormFeedback() {
    if (formFeedback) {
        formFeedback.style.display = 'none';
    }
}

// ========== HERO SCROLL FADE-OUT EFFECT ==========
// Creates a premium cinematic fade-out as user scrolls down
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const video = document.getElementById('heroVideo');
    
    if (!hero) return; // Exit if hero doesn't exist on current page
    
    const scrollY = window.scrollY;
    const fadeStart = 0;
    const fadeEnd = window.innerHeight * 0.8; // Fade out at 80% of viewport height
    
    // Calculate opacity (1 at top, 0 at fadeEnd)
    const opacity = Math.max(1 - scrollY / fadeEnd, 0);
    
    // Apply opacity dynamically to hero container
    hero.style.opacity = opacity;
    
    // Fade video more subtly (respecting max 35% opacity)
    if (video) {
        video.style.opacity = Math.min(opacity * 0.35, 0.35);
    }
    
    // Fade content text
    if (heroContent) {
        heroContent.style.opacity = opacity;
    }
});

// ========== KPI COUNTERS ANIMATION ==========
// Animates numbers from 0 to target value when section comes into view
const counterSection = document.querySelector('.kpis');
let countersStarted = false;

function animateCounters() {
    if (!counterSection || countersStarted) return;
    
    const rect = counterSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        countersStarted = true;
        
        document.querySelectorAll('.kpi-number').forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isFloat = !Number.isInteger(target);
            let current = 0;
            const duration = 1200; // Animation duration in ms
            const start = performance.now();
            
            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const value = target * progress;
                el.textContent = isFloat ? value.toFixed(1) : Math.floor(value);
                
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }
            
            requestAnimationFrame(tick);
        });
    }
}

// Run on scroll and on page load
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ========== SCROLL REVEAL (INTERSECTION OBSERVER) ==========
// Triggers fade-in animations for new sections when they enter viewport
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.2 });

// Observe the three new sections
document.querySelectorAll('.trusted, .kpis, .cases').forEach(section => {
    scrollObserver.observe(section);
});

// ========== CONSOLE MESSAGE ==========
console.log('🚀 BTA Dijital - Website loaded successfully!');
console.log('👨‍💻 Developed with ❤️ for BTA Dijital');
console.log('✨ Complete: Homepage + About Us + Services + Influencer Marketing + Contact pages');
console.log('🎬 Hero video with scroll fade-out effect active');
console.log('📊 KPI counters and scroll reveal animations enabled');

