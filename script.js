// ================================
// Navigation & Smooth Scrolling
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    // Hamburger menu toggle for mobile
    hamburger?.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer?.classList.remove('active');
            updateActiveLink();
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    function updateActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
});

// ================================
// Fade-In Animation on Scroll
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(
        '.about-card, .program-card, .benefit-card, .tournament-card, .info-card, .contact-form, .mission-content'
    );
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

// ================================
// Contact Form Handling
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                formNote.textContent = '❌ Please fill in all required fields.';
                formNote.style.color = '#d32f2f';
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formNote.textContent = '❌ Please enter a valid email address.';
                formNote.style.color = '#d32f2f';
                return;
            }

            // Phone validation (optional - if provided)
            if (phone && !/^\d{10,}$|^[\d\s\-\(\)]+$/.test(phone)) {
                formNote.textContent = '❌ Please enter a valid phone number.';
                formNote.style.color = '#d32f2f';
                return;
            }

            // If validation passes, show success message
            formNote.textContent = '✓ Thank you! Your message has been received. We will get back to you soon!';
            formNote.style.color = '#4caf50';
            formNote.style.fontWeight = 'bold';

            // Optional: You can add code here to send the form data to a server
            console.log('Form Data:', { name, email, phone, message });

            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                formNote.textContent = '';
            }, 3000);
        });
    }
});

// ================================
// Keyboard Navigation Support
// ================================

document.addEventListener('keydown', function(e) {
    // Skip to main content with Alt+S (accessibility feature)
    if (e.altKey && e.key === 's') {
        const mainContent = document.querySelector('#about');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ================================
// Navbar Background on Scroll
// ================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ================================
// Prevent Form Submission on Enter in Text Fields
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-group input[type="text"], .form-group input[type="email"], .form-group input[type="tel"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextElement = this.nextElementSibling || this.parentElement.nextElementSibling?.querySelector('input, textarea');
                if (nextElement) {
                    nextElement.focus();
                }
            }
        });
    });
});

console.log('Longhorn Chess website loaded successfully!');