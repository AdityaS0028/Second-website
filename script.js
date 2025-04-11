document.addEventListener('DOMContentLoaded', function() {
    // Ensure header is visible
    document.querySelector('header').style.opacity = '1';
    document.querySelector('header').style.display = 'block';
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Add event listener for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menuIcon = document.querySelector('.menu-icon');
    const navMobile = document.querySelector('.mobile-nav');
    
    if (menuBtn && menuIcon && navMobile) {
        menuBtn.addEventListener('click', function() {
            menuIcon.classList.toggle('open');
            navMobile.classList.toggle('active');
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Mobile menu links - close menu when clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    if (mobileLinks.length > 0) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (menuIcon && navMobile) {
                    menuIcon.classList.remove('open');
                    navMobile.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .contact-content, .about-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = window.innerHeight * 0.8;
            
            if (elementTop < elementVisible) {
                element.classList.add('animate');
            }
        });
        
        // Highlight timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemHeight = item.offsetHeight;
            const itemCenter = itemTop + (itemHeight / 2);
            const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
            
            if (distanceFromCenter < viewportHeight * 0.3) {
                item.classList.add('highlight');
            } else {
                item.classList.remove('highlight');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    setTimeout(animateOnScroll, 100);
});
