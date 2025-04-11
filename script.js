document.addEventListener('DOMContentLoaded', function() {
    // Fix header display
    document.querySelector('header').style.display = 'block';
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        // Save theme preference to localStorage
        localStorage.setItem('theme', newTheme);
        console.log('Theme switched to:', newTheme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Cursor trail effect
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail-container';
    document.body.appendChild(trailContainer);
    
    const trailDots = [];
    const numDots = 5;
    
    // Create trail dots
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.opacity = 1 - (i / numDots);
        dot.style.width = 10 - (i * 1.5) + 'px';
        dot.style.height = 10 - (i * 1.5) + 'px';
        trailContainer.appendChild(dot);
        trailDots.push({
            element: dot,
            x: 0,
            y: 0
        });
    }
    
    // Create main cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update main cursor position immediately
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animate trail dots
    function animateTrail() {
        // Update trail dots with delay
        for (let i = 0; i < trailDots.length; i++) {
            const dot = trailDots[i];
            
            // Calculate new position with easing
            dot.x += (mouseX - dot.x) * (0.3 - (i * 0.05));
            dot.y += (mouseY - dot.y) * (0.3 - (i * 0.05));
            
            // Update dot position
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Add hover effect for clickable elements
    const clickableElements = document.querySelectorAll('a, button, .tag, .skill-item, .timeline-content, .education-item, .social-link');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('clickable');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('clickable');
        });
    });
    
    // Add event listener for theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
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
                menuIcon.classList.remove('open');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Interactive tags that follow cursor with parallax effect
    document.addEventListener('mousemove', function(e) {
        const tags = document.querySelectorAll('.tag');
        const bgCircles = document.querySelectorAll('.bg-circle');
        
        if (tags.length === 0 && bgCircles.length === 0) return;
        
        // Get mouse position relative to viewport center
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (mouseX - centerX) / centerX;
        const offsetY = (mouseY - centerY) / centerY;
        
        // Move tags based on mouse position
        tags.forEach(tag => {
            // Each tag moves at slightly different rate for more natural feel
            const speedFactor = Math.random() * 0.5 + 0.5; // between 0.5 and 1
            const moveX = offsetX * 30 * speedFactor;
            const moveY = offsetY * 30 * speedFactor;
            
            tag.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Subtle parallax effect for background circles
        bgCircles.forEach((circle, index) => {
            const parallaxFactor = index === 0 ? 0.05 : 0.03;
            const moveX = -offsetX * 100 * parallaxFactor;
            const moveY = -offsetY * 100 * parallaxFactor;
            
            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
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
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    
    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .contact-content, .about-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = window.innerHeight * 0.8;
            
            if (elementTop < elementVisible) {
                element.classList.add('animate');
            }
        });
        
        // Highlight timeline circles when they're in the center of the viewport
        const timelineItems = document.querySelectorAll('.timeline-item');
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        
        timelineItems.forEach(item => {
            const circle = item.querySelector('::before');
            const itemTop = item.getBoundingClientRect().top;
            const itemHeight = item.offsetHeight;
            const itemCenter = itemTop + (itemHeight / 2);
            const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
            
            // Apply a visual effect to the timeline item based on its proximity to the viewport center
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
