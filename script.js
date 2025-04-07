// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('header');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.nav-mobile')) {
                const navMobile = document.createElement('nav');
                navMobile.className = 'nav-mobile';
                
                // Clone desktop navigation items
                const navDesktop = document.querySelector('.nav-desktop ul');
                const navItems = navDesktop.cloneNode(true);
                
                navMobile.appendChild(navItems);
                header.querySelector('.container').appendChild(navMobile);
                
                // Add event listeners to mobile nav links
                navMobile.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        header.classList.remove('nav-open');
                    });
                });
            }
            
            // Toggle navigation open state
            header.classList.toggle('nav-open');
        });
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            alert('Message sent successfully! (Demo only)');
            contactForm.reset();
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update skills progress bars based on scroll position
    const progressBars = document.querySelectorAll('.progress');
    
    function updateProgressBars() {
        progressBars.forEach(bar => {
            const originalWidth = bar.style.width;
            // We'll animate the width when the element comes into view
            bar.style.width = '0%';
            
            // Create an observer to detect when the bar is in view
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate back to original width
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s ease-in-out';
                            bar.style.width = originalWidth;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar.parentElement);
        });
    }
    
    // Initialize progress bars
    updateProgressBars();
});