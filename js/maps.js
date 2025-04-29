document.addEventListener('DOMContentLoaded', function() {
    // scroll animations for the maps page
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

    changeImage('sunset', 0);
    changeImage('lotus', 0);
    changeImage('icebox', 0);
    changeImage('haven', 0);
    changeImage('split', 0);
    
    // click function in thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            const mapSection = this.closest('.map-section');
            if (!mapSection) return;
            
            let mapName = '';
            if (mapSection.classList.contains('sunset-section')) mapName = 'sunset';
            else if (mapSection.classList.contains('lotus-section')) mapName = 'lotus';
            else if (mapSection.classList.contains('icebox-section')) mapName = 'icebox';
            else if (mapSection.classList.contains('haven-section')) mapName = 'haven';
            else if (mapSection.classList.contains('split-section')) mapName = 'split';
            
            const thumbnailsInSection = mapSection.querySelectorAll('.thumbnail');
            const indexInSection = Array.from(thumbnailsInSection).indexOf(this);
            
            if (mapName && indexInSection !== -1) {
                changeImage(mapName, indexInSection);
            }
        });
    });
    
    // hover effects to map thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });

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

const mapImages = {
    'sunset': [
        'assets/Maps/SUNSET/Loading_Screen_Sunset.webp',
        'assets/Maps/SUNSET/Sunset_Aftermath.webp',
        'assets/Maps/SUNSET/Sunset_Basketball_Court_Radio.webp',
        'assets/Maps/SUNSET/Sunset_Kingdom_Facility.webp',
        'assets/Maps/SUNSET/Sunset_Restaurant_Radio.webp',
        'assets/Maps/SUNSET/Sunset_Transpo_Center_Loudspeakers.webp'
    ],
    'lotus': [
        'assets/Maps/LOTUS/Loading_Screen_Lotus.webp',
        'assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-03.jpg',
        'assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-04.jpg',
        'assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-05.jpg',
        'assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-06.jpg',
        'assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-09.jpg'
    ],
    'icebox': [
        'assets/Maps/ICEBOX/Loading_Screen_Icebox.webp',
        'assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-attackerspawnship1.jpg',
        'assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-attackerspawnship2.jpg',
        'assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-defenderspawnice.jpg',
        'assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-shipinterior.jpg',
        'assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-shipreadyroom.jpg'
    ],
    'haven': [
        'assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-61.jpg',
        'assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-62.jpg',
        'assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-63.jpg',
        'assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-64.jpg',
        'assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-65.jpg',
        'assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-66.jpg'
    ],
    'split': [
        'assets/Maps/SPLIT/Loading_Screen_Split.webp',
        'assets/Maps/SPLIT/eric-durante-durante-valorant-48.jpg',
        'assets/Maps/SPLIT/eric-durante-durante-valorant-49.jpg',
        'assets/Maps/SPLIT/george-sokol-georgesokol-valorant-split-glitchpopstore.jpg',
        'assets/Maps/SPLIT/george-sokol-georgesokol-valorant-split-trainstation.jpg',
        'assets/Maps/SPLIT/george-sokol-georgesokol-valorant-split-trainstation2.jpg'
    ]
};

function changeImage(mapName, imageIndex) {
    const mainImageElement = document.getElementById(mapName + '-main');
    
    if (mainImageElement) {
        mainImageElement.style.backgroundImage = `url('${mapImages[mapName][imageIndex]}')`;
        
        const thumbnails = mainImageElement.parentElement.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === imageIndex) {
                thumb.style.border = '2px solid white';
            } else {
                thumb.style.border = 'none';
            }
        });
    }
}