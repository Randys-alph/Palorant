document.addEventListener('DOMContentLoaded', () => {
    const newsCards = document.querySelectorAll('.news-card');
    
    // fade-in animation for news cards
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // 3D tilt effect on hover for news cards
    newsCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // show more button interaction
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    // scale up on hover
    showMoreBtn.addEventListener('mouseenter', () => {
        showMoreBtn.style.transform = 'scale(1.1)';
    });
    
    // scale back on mouse leave
    showMoreBtn.addEventListener('mouseleave', () => {
        showMoreBtn.style.transform = 'scale(1)';
    });
    
    // loading more content when clicked
    showMoreBtn.addEventListener('click', () => {
        const originalHtml = showMoreBtn.innerHTML;
        showMoreBtn.innerHTML = 'Loading...';
        
        setTimeout(() => {
            showMoreBtn.innerHTML = originalHtml;
            alert('More news would load here in a real application!');
        }, 1500);
    });

    // current date to footer
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
    
    // mobile menu button
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // burger and X
        const menuIcon = this.querySelector('.menu-icon');
        if (navLinks.classList.contains('active')) {
            menuIcon.innerHTML = '✕';
        } else {
            menuIcon.innerHTML = '☰';
        }
    });
    
    // close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && 
            !event.target.closest('.nav-links') && 
            navLinks.classList.contains('active')) {
            
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
    
    // close menu when window is resized above mobile size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 940 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
});