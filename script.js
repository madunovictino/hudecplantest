/* ========================================
   HUDEC PLAN - JAVASCRIPT
   Minimal, professional interactions
======================================== */

// ========================================
// SERVICE METADATA & PROJECT DATA
// ========================================

const SERVICE_META = {
    'projektiranje': {
        title: 'Projektiranje',
        description: 'Izrada projektne dokumentacije svih stupnjeva, za izdavanje lokacijske i građevinske dozvole.',
        details: 'Program istražnih radova, Idejni projekt, Elaborat zaštite na radu, Elaborat zaštite od požara, Glavni projekt, Izvedbeni projekt, Natječajna dokumentacija, Aplikacije za projekte financirane od strane EU fondova.',
        audience: 'Investitori, developeri, jedinice lokalne i regionalne samouprave',
    },
    'zastita-prirode': {
        title: 'Zaštita prirode i okoliša',
        description: 'Izrada dokumentacije iz područja zaštite prirode i okoliša.',
        details: 'Elaborat zaštite okoliša, Elaborat zaštite okoliša za ocjenu o potrebi procjene utjecaja zahvata na okoliš, Sanacijski program klizišta, Plan gospodarenja otpadom, Elaborat gospodarenja otpadom, Studija izvodljivosti, Studija utjecaja na okoliš.',
        audience: 'Komunalna poduzeća, općine, gradovi, županije, privatni investitori',
    },
    'vodjenje-projekata': {
        title: 'Vođenje i praćenje projekata',
        description: 'Vođenje projekata za potrebe investitora, koordiniranje rada projektanata, izvođača i nadzora — od ideje do puštanja u pogon objekta.',
        details: 'Projektantski nadzor, koordinacija dionika projekta, praćenje izvođenja radova prema FIDIC uvjetima.',
        audience: 'Investitori, fondovi, javne ustanove',
    },
    'savjetovanje': {
        title: 'Savjetovanje',
        description: 'Savjetovanje komunalnih poduzeća i organa lokalne samouprave.',
        details: 'Postupanje s otpadom, Izrada projektnih zadataka, Studija gospodarenja otpadom.',
        audience: 'Komunalna poduzeća, općine, gradovi, županije',
    },
    'eu-fondovi': {
        title: 'Izrada dokumentacije za EU fondove',
        description: 'Izrada projektne dokumentacije i natječajne dokumentacije po PRAG-u i FIDIC-u te prema Zakonu o javnoj nabavi.',
        details: 'Priprema projektnih prijedloga, tender dokumentacija, natječajna dokumentacija za EU financirane projekte.',
        audience: 'Jedinice lokalne i regionalne samouprave, javna poduzeća',
    },
};

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

// (Contact form removed per user request)

// ========================================
// INTERSECTION OBSERVER - Fade in elements on scroll
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        } else {
            entry.target.classList.remove('fade-in');
        }
    });
}, observerOptions);

// Observe elements for fade-in/out animation
const animatedElements = document.querySelectorAll(
    '.content-card, .service-card, .contact-item'
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
// SERVICE MODAL - Open, close, populate
// ========================================

const modalOverlay = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocusedElement = null;

function openModal(serviceId) {
    const meta = SERVICE_META[serviceId];
    const data = typeof SERVICE_DATA !== 'undefined' ? SERVICE_DATA[serviceId] : null;

    if (!meta) return;

    lastFocusedElement = document.activeElement;

    modalTitle.textContent = meta.title;
    modalSubtitle.textContent = meta.description;

    modalBody.innerHTML = '';

    if (data && data.projects && data.projects.length > 0) {
        data.projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'modal-project';
            div.innerHTML = `
                <div class="modal-project-name">${escapeHtml(project.name)}</div>
                <div class="modal-project-meta">
                    <span><strong>Investitor:</strong> ${escapeHtml(project.investor)}</span>
                    <span><strong>Godina:</strong> ${project.year}</span>
                </div>
            `;
            modalBody.appendChild(div);
        });
    } else {
        modalBody.innerHTML = '<p style="color: var(--color-text-muted);">Referentni projekti će biti dodani uskoro.</p>';
    }

    modalOverlay.removeAttribute('hidden');
    requestAnimationFrame(() => {
        modalOverlay.classList.add('is-active');
    });
    document.body.classList.add('modal-open');

    modalClose.focus();
}

function closeModal() {
    modalOverlay.classList.remove('is-active');
    document.body.classList.remove('modal-open');

    modalOverlay.addEventListener('transitionend', function handler() {
        modalOverlay.setAttribute('hidden', '');
        modalOverlay.removeEventListener('transitionend', handler);
    });

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Service card click handlers
document.querySelectorAll('.service-card[data-service-id]').forEach(card => {
    card.addEventListener('click', () => {
        openModal(card.getAttribute('data-service-id'));
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card.getAttribute('data-service-id'));
        }
    });
});

// Close modal: X button
modalClose.addEventListener('click', closeModal);

// Close modal: backdrop click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// ========================================
// MODAL ACCESSIBILITY - Focus trap, ESC
// ========================================

modalOverlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    if (e.key === 'Tab') {
        const focusable = modalOverlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});


// ========================================
// MARQUEE - Duplicate items for infinite scroll
// ========================================

(function setupMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    const items = track.innerHTML;
    track.innerHTML = items + items;
})();

// ========================================
// INITIALIZE - Run on page load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    highlightNavigation();
    document.body.classList.add('loaded');
});

// Get current year for footer
(function updateFooterYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
})();
