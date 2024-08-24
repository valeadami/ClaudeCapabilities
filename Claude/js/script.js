// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm()) {
                alert('Messaggio inviato con successo!');
                contactForm.reset();
            }
        });
    }

    // Simple form validation function
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            isValid = false;
            highlightField(name, true);
        } else {
            highlightField(name, false);
        }

        if (email.value.trim() === '' || !isValidEmail(email.value)) {
            isValid = false;
            highlightField(email, true);
        } else {
            highlightField(email, false);
        }

        if (subject.value.trim() === '') {
            isValid = false;
            highlightField(subject, true);
        } else {
            highlightField(subject, false);
        }

        if (message.value.trim() === '') {
            isValid = false;
            highlightField(message, true);
        } else {
            highlightField(message, false);
        }

        return isValid;
    }

    // Helper function to highlight invalid fields
    function highlightField(field, isInvalid) {
        if (isInvalid) {
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add animation to skills progress bars
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const progressBars = skillsSection.querySelectorAll('.progress-bar');
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const value = bar.getAttribute('aria-valuenow');
                bar.style.width = value + '%';
            });
        };

        // Animate on page load
        animateProgressBars();

        // Re-animate when skills section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }
});
