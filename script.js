// ================================
// Mobile Navigation Toggle
// ================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(9px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ================================
// Smooth Scroll
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Navbar Background on Scroll
// ================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove background based on scroll position
    if (currentScroll > 100) {
        nav.style.background = '#ffffff';
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';
    } else {
        nav.style.background = '#ffffff';
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ================================
// Scroll Animations (Intersection Observer)
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

// Observe elements that should animate in
const animateElements = document.querySelectorAll('.service-card, .diff-item, .stat');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// Contact Form Handling
// ================================
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formResult.style.display = 'none';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                formResult.className = 'form-result success';
                formResult.textContent = 'Thank you for your message. We will respond within one business day.';
                formResult.style.display = 'block';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formResult.className = 'form-result error';
            formResult.textContent = 'There was an error sending your message. Please email us directly at info@propertypreservationllc.com';
            formResult.style.display = 'block';
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

            // Scroll to result
            formResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// ================================
// Prevent Form Resubmission on Page Reload
// ================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ================================
// Add Loading Animation to Page
// ================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ================================
// Hero Scroll Indicator
// ================================
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            heroScroll.style.opacity = '0';
            heroScroll.style.pointerEvents = 'none';
        } else {
            heroScroll.style.opacity = '1';
            heroScroll.style.pointerEvents = 'all';
        }
    });
}

// ================================
// Console Branding (Optional Easter Egg)
// ================================
console.log('%cProperty Preservation LLC', 'font-size: 20px; font-weight: bold; color: #1e3a5f;');
console.log('%cProfessional field services for institutional clients', 'font-size: 12px; color: #475569;');
console.log('%cWebsite: propertypreservationllc.com', 'font-size: 11px; color: #64748b;');
