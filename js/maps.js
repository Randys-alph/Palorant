// maps.js - JavaScript for the maps page

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations for the maps page
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

    // Add CSS for the scroll animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
            
    // Initialize with the first image of each set selected
    changeImage('sunset', 0);
    changeImage('lotus', 0);
    changeImage('icebox', 0);
    changeImage('haven', 0);
    changeImage('split', 0);
    
    // Add click event listeners to thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            // Determine which map section this thumbnail belongs to
            const mapSection = this.closest('.map-section');
            if (!mapSection) return;
            
            // Get the map name from the section
            let mapName = '';
            if (mapSection.classList.contains('sunset-section')) mapName = 'sunset';
            else if (mapSection.classList.contains('lotus-section')) mapName = 'lotus';
            else if (mapSection.classList.contains('icebox-section')) mapName = 'icebox';
            else if (mapSection.classList.contains('haven-section')) mapName = 'haven';
            else if (mapSection.classList.contains('split-section')) mapName = 'split';
            
            // Get the index within this section
            const thumbnailsInSection = mapSection.querySelectorAll('.thumbnail');
            const indexInSection = Array.from(thumbnailsInSection).indexOf(this);
            
            if (mapName && indexInSection !== -1) {
                changeImage(mapName, indexInSection);
            }
        });
    });
    
    // Add hover effects to map thumbnails
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
    
    // Show More button functionality
    const showMoreButton = document.querySelector('.show-more button');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function() {
            const hiddenMaps = document.querySelectorAll('.map-section.hidden');
            hiddenMaps.forEach(map => {
                map.classList.remove('hidden');
                map.classList.add('fade-in');
                observer.observe(map);
            });
            
            // Hide the button if all maps are now visible
            if (document.querySelectorAll('.map-section.hidden').length === 0) {
                this.parentElement.style.display = 'none';
            }
        });
    }

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

// Define image URLs for each map category
const mapImages = {
    'sunset': [
        '/assets/Maps/SUNSET/Loading_Screen_Sunset.webp',
        '/assets/Maps/SUNSET/Sunset_Aftermath.webp',
        '/assets/Maps/SUNSET/Sunset_Basketball_Court_Radio.webp',
        '/assets/Maps/SUNSET/Sunset_Kingdom_Facility.webp',
        '/assets/Maps/SUNSET/Sunset_Restaurant_Radio.webp',
        '/assets/Maps/SUNSET/Sunset_Transpo_Center_Loudspeakers.webp'
    ],
    'lotus': [
        '/assets/Maps/LOTUS/Loading_Screen_Lotus.webp',
        '/assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-03.jpg',
        '/assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-04.jpg',
        '/assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-05.jpg',
        '/assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-06.jpg',
        '/assets/Maps/LOTUS/tobias-koepp-lotus-valorant-tobiaskoepp-mapj-09.jpg'
    ],
    'icebox': [
        '/assets/Maps/ICEBOX/Loading_Screen_Icebox.webp',
        '/assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-attackerspawnship1.jpg',
        '/assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-attackerspawnship2.jpg',
        '/assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-defenderspawnice.jpg',
        '/assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-shipinterior.jpg',
        '/assets/Maps/ICEBOX/george-sokol-georgesokol-valorant-icebox-shipreadyroom.jpg'
    ],
    'haven': [
        '/assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-61.jpg',
        '/assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-62.jpg',
        '/assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-63.jpg',
        '/assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-64.jpg',
        '/assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-65.jpg',
        '/assets/Maps/HAVEN/robin-lhebrard-weststudio-valorant-66.jpg'
    ],
    'split': [
        '/assets/Maps/SPLIT/Loading_Screen_Split.webp',
        '/assets/Maps/SPLIT/eric-durante-durante-valorant-48.jpg',
        '/assets/Maps/SPLIT/eric-durante-durante-valorant-49.jpg',
        '/assets/Maps/SPLIT/george-sokol-georgesokol-valorant-split-glitchpopstore.jpg',
        '/assets/Maps/SPLIT/george-sokol-georgesokol-valorant-split-trainstation.jpg',
        '/assets/Maps/SPLIT/george-sokol-georgesokol-valorant-split-trainstation2.jpg'
    ]
};

// Define changeImage function in the global scope
function changeImage(mapName, imageIndex) {
    const mainImageElement = document.getElementById(mapName + '-main');
    
    if (mainImageElement) {
        mainImageElement.style.backgroundImage = `url('${mapImages[mapName][imageIndex]}')`;
        
        // Add highlighted styles to the selected thumbnail
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