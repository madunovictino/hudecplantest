/* ========================================
   HUDEC PLAN - JAVASCRIPT
   Minimal, professional interactions
======================================== */

// ========================================
// NAVIGATION - Sticky navbar & mobile menu
// ========================================

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ========================================
// ACTIVE NAVIGATION LINK - Highlight current section
// ========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// SMOOTH SCROLL - Enhanced smooth scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// PROJECT FILTERING - Filter projects by category
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                // Fade in animation
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                const cardCategory = card.getAttribute('data-category');
                
                if (cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ========================================
// CONTACT FORM - Form validation and submission
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Molimo popunite sva obavezna polja.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Molimo unesite valjanu email adresu.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual backend integration)
    simulateFormSubmission(name, email, phone, subject, message);
});

// Function to show form messages
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(name, email, phone, subject, message) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Šaljem...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Success response
        showFormMessage('Hvala! Vaša poruka je uspješno poslana. Kontaktirat ćemo Vas uskoro.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Log form data (for development - remove in production)
        console.log('Form submitted:', { name, email, phone, subject, message });
        
        // In production, replace the setTimeout with actual fetch/axios call:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, subject, message }),
        })
        .then(response => response.json())
        .then(data => {
            showFormMessage('Hvala! Vaša poruka je uspješno poslana.', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showFormMessage('Došlo je do greške. Molimo pokušajte ponovo.', 'error');
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
        */
    }, 1500);
}

// ========================================
// INTERSECTION OBSERVER - Fade in elements on scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll(
    '.content-card, .service-card, .project-card, .process-step, .benefit-card'
);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// KEYBOARD ACCESSIBILITY - Enhanced keyboard navigation
// ========================================

// Trap focus in mobile menu when open
navMenu.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    // Close menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.focus();
    }
});

// ========================================
// PERFORMANCE - Debounce scroll events
// ========================================

function debounce(func, wait) {
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

// Apply debounce to scroll-heavy functions
const debouncedHighlightNav = debounce(highlightNavigation, 100);
window.addEventListener('scroll', debouncedHighlightNav);

// ========================================
// INITIALIZE - Run on page load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('HUDEC PLAN website loaded successfully');
    
    // Set initial active nav link
    highlightNavigation();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get current year for footer (if needed)
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
}

updateFooterYear();
