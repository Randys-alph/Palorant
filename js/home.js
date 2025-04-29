document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    // create glow elements
    for (let i = 1; i <= 3; i++) {
        const glow = document.createElement('div');
        glow.classList.add('glow', `glow-${i}`);
        container.appendChild(glow);
    }
    
    // smooth mouse movement effect for the glow elements
    document.addEventListener('mousemove', function(e) {
        const glows = document.querySelectorAll('.glow');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        glows.forEach((glow, index) => {
            const offsetX = (mouseX - 0.5) * 50 * (index + 1);
            const offsetY = (mouseY - 0.5) * 50 * (index + 1);
            
            glow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    // hero character animation on page load
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'all 1s ease';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 300);
    }
    
    // click buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // simple click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // scroll animations
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    const weaponShowcase = document.querySelector('.weapon-showcase');
    if (weaponShowcase) {
        // particle effects while hovering on the weapon showcase
        weaponShowcase.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // create a particle
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            const size = Math.random() * 10 + 5;
            const colors = ['#00dcff', '#ff3e6e', '#8862e0'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = color;
            
            this.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        });
    }
    
    // hover effects for machine guns section
    const machineGuns = document.querySelector('.machine-guns');
    if (machineGuns) {
        machineGuns.addEventListener('mouseenter', function() {
            const title = this.querySelector('h2');
            title.style.transition = 'transform 0.5s ease';
            title.style.transform = 'translateY(-100px)';
        });
        
        machineGuns.addEventListener('mouseleave', function() {
            const title = this.querySelector('h2');
            title.style.transform = 'translateY(0)';
        });
    }
    
    // parallax effect
    document.addEventListener('mousemove', function(e) {
        const gridItems = document.querySelectorAll('.grid-item');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        gridItems.forEach((item, index) => {
            const depth = 15 * (index + 1);
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // animation for nodes and glows
    function animateElements() {
        const nodes = document.querySelectorAll('.node');
        const glows = document.querySelectorAll('.glow');
        
        // animate nodes
        nodes.forEach(node => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            node.animate([
                { left: node.style.left, top: node.style.top },
                { left: `${x}%`, top: `${y}%` }
            ], {
                duration: 30000,
                fill: 'forwards',
                easing: 'ease-in-out'
            });
            
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
        });
        
        // animate glows
        glows.forEach(glow => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            glow.animate([
                { left: glow.style.left, top: glow.style.top },
                { left: `${x}%`, top: `${y}%` }
            ], {
                duration: 20000,
                fill: 'forwards',
                easing: 'ease-in-out'
            });
            
            glow.style.left = `${x}%`;
            glow.style.top = `${y}%`;
        });
        
        // recreate lines after nodes have moved
        setTimeout(() => {
            const lines = document.querySelectorAll('.line');
            lines.forEach(line => line.remove());
            createLines();
        }, 30000);
        
        setTimeout(animateElements, 30000);
    }

    // function to create lines between nodes
    function createLines() {
        const geometricLines = document.querySelector('.geometric-lines');
        const nodes = document.querySelectorAll('.node');
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() > 0.7) {
                    const node1 = nodes[i].getBoundingClientRect();
                    const node2 = nodes[j].getBoundingClientRect();
                    
                    const line = document.createElement('div');
                    line.className = 'line';
                    
                    const x1 = node1.left + node1.width / 2;
                    const y1 = node1.top + node1.height / 2;
                    const x2 = node2.left + node2.width / 2;
                    const y2 = node2.top + node2.height / 2;
                    
                    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    line.style.width = `${length}px`;
                    line.style.left = `${x1}px`;
                    line.style.top = `${y1}px`;
                    line.style.transform = `rotate(${angle}deg)`;
                    
                    geometricLines.appendChild(line);
                }
            }
        }
    }

    // initial animation cycle
    setTimeout(animateElements, 5000);

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    document.querySelector('.navbar').appendChild(mobileMenuBtn);
    
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
});