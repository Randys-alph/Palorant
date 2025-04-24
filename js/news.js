// Wait for DOM to fully load before running our JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select all news cards
    const newsCards = document.querySelectorAll('.news-card');
    
    // Add fade-in animation for news cards
    newsCards.forEach((card, index) => {
        // Set initial state - invisible and shifted down
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Stagger the animations
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add 3D tilt effect on hover for news cards
    newsCards.forEach(card => {
        // On mouse move over card, calculate tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle based on mouse position
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            // Apply 3D transform 
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        // Reset transform when mouse leaves the card
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Show more button interaction
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    // Scale up on hover
    showMoreBtn.addEventListener('mouseenter', () => {
        showMoreBtn.style.transform = 'scale(1.1)';
    });
    
    // Scale back on mouse leave
    showMoreBtn.addEventListener('mouseleave', () => {
        showMoreBtn.style.transform = 'scale(1)';
    });
    
    // Simulate loading more content when clicked
    showMoreBtn.addEventListener('click', () => {
        const originalHtml = showMoreBtn.innerHTML;
        showMoreBtn.innerHTML = 'Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            showMoreBtn.innerHTML = originalHtml;
            alert('More news would load here in a real application!');
        }, 1500);
    });

    // Add glowing effect to nav buttons on hover
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 15px rgba(0, 191, 213, 0.7)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = 'none';
        });
    });

    // Add current date to footer
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const footer = document.querySelector('footer');
    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = `Current Date: ${dateString}`;
    footer.insertBefore(dateElement, footer.querySelector('.footer-bottom'));

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle menu icon between burger and X
        const menuIcon = this.querySelector('.menu-icon');
        if (navLinks.classList.contains('active')) {
            menuIcon.innerHTML = '✕';
        } else {
            menuIcon.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && 
            !event.target.closest('.nav-links') && 
            navLinks.classList.contains('active')) {
            
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 940 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
});