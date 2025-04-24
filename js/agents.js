// agents.js - JavaScript for the agents page

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations for the agents page
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

    // Agent cards interaction
    const agentCards = document.querySelectorAll('.agent-card');
    const detailedView = document.querySelector('.detailed-view');
    const agentDetailImage = document.querySelector('.agent-detail-image');

    // Function to update detailed view content
    function updateAgentDetails(card) {
        // Get agent information from the card
        const agentName = card.querySelector('.agent-name').textContent;
        const agentRole = card.querySelector('.agent-role').textContent;
        const agentDescription = card.querySelector('.agent-description').textContent;
        const agentImageSrc = card.querySelector('.agent-image').src;
        
        // Update the detailed view with this information
        document.querySelector('.agent-detail-name').textContent = agentName;
        document.querySelector('.agent-detail-role').textContent = agentRole;
        agentDetailImage.src = agentImageSrc;
        
        // Update bio and abilities based on the agent
        const agentBio = getBioByName(agentName);
        document.querySelector('.agent-detail-bio').textContent = agentBio;
        
        // Update abilities
        updateAgentAbilities(agentName);
    }

    // Function to get agent bio by name
    function getBioByName(name) {
        const bios = {
            'Reyna': 'Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores. Her capability is only limited by her raw skill, making her highly dependent on performance.',
            'Sova': 'Born from the eternal winter of Russia\'s tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision.',
            'Sage': 'The bastion of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off forceful assaults, she provides a calm center to a hellish battlefield.',
            'Jett': 'Representing her home country of South Korea, Jett\'s agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies up before they even know what hit them.',
            'Omen': 'A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold as his foe scrambles to uncover where he might strike next.',
            'Brimstone': 'Joining from the USA, Brimstone\'s orbital arsenal ensures his squad always has the advantage. His ability to deliver utility precisely and safely make him an unmatched combat leader.',
            'Killjoy': 'The genius of Germany, Killjoy secures and defends key battlefield positions with a collection of traps, turrets, and mines. Each invention is deployed to maximum efficiency, creating a deadzone no enemy can trespass.',
            'Yoru': 'Hailing from Japan, Yoru rips holes straight through reality to infiltrate enemy lines unseen. Using deception and aggression in equal measure, he gets the drop on each target before they know where to look.',
            'Chamber': 'Well dressed and well armed, French weapons designer Chamber expels aggressors with deadly precision. He leverages his custom arsenal to hold the line and pick off enemies from afar, with a contingency built for every plan.',
            'Breach': 'Breach, the bionic Swede, fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground. The damage and disruption he inflicts ensures no fight is ever fair.',
            'Viper': 'The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy\'s vision. If the toxins don\'t kill her prey, her mind games surely will.'
        };
        
        return bios[name] || 'No biographical information available for this agent.';
    }

    // Function to update agent abilities
    function updateAgentAbilities(agentName) {
        const abilitiesContainer = document.querySelector('.detailed-abilities');
        
        // Clear current abilities
        abilitiesContainer.innerHTML = '';
        
        // Get abilities for this agent
        const abilities = getAbilitiesByName(agentName);
        
        // Add each ability to the container
        abilities.forEach(ability => {
            const abilityDiv = document.createElement('div');
            abilityDiv.className = 'detailed-ability';
            abilityDiv.innerHTML = `
                <div class="detailed-ability-header">
                    <div class="detailed-ability-icon">${ability.key}</div>
                    <div class="detailed-ability-name">${ability.name}</div>
                </div>
                <div class="detailed-ability-description">
                    ${ability.description}
                </div>
            `;
            abilitiesContainer.appendChild(abilityDiv);
        });
    }

    // Function to get abilities by agent name
    function getAbilitiesByName(name) {
        const agentAbilities = {
            'Reyna': [
                { key: 'Q', name: 'Devour', description: 'Enemies killed by Reyna leave behind Soul Orbs that last 3 seconds. Consume a nearby Soul Orb to rapidly heal for a short duration.' },
                { key: 'E', name: 'Dismiss', description: 'Consume a nearby Soul Orb to become intangible for a short duration. If Empress is active, also become invisible.' },
                { key: 'C', name: 'Leer', description: 'Cast an ethereal, destructible eye a short distance forward. The eye will nearsight all enemies who look at it.' },
                { key: 'X', name: 'Empress', description: 'Enter a frenzy, increasing firing, equip and reload speed dramatically. Scoring a kill renews the duration.' }
            ],
            'Sova': [
                { key: 'Q', name: 'Shock Bolt', description: 'Fire an explosive bolt that emits a damaging pulse of static energy upon impact.' },
                { key: 'E', name: 'Recon Bolt', description: 'Fire a bolt that deploys a sonar emitter. The sonar pings enemies in the line of sight, revealing them.' },
                { key: 'C', name: 'Owl Drone', description: 'Deploy a drone that can be piloted to scout for enemies. While piloting, fire a marking dart at enemies to reveal their position.' },
                { key: 'X', name: 'Hunter\'s Fury', description: 'Fire up to three deadly energy blasts that spear across the entire map. Each hit enemy takes damage and is marked.' }
            ],
            // Add more agents here...
        };
        
        // Return default abilities if agent not found
        return agentAbilities[name] || [
            { key: 'Q', name: 'Ability 1', description: 'No description available.' },
            { key: 'E', name: 'Ability 2', description: 'No description available.' },
            { key: 'C', name: 'Ability 3', description: 'No description available.' },
            { key: 'X', name: 'Ultimate', description: 'No description available.' }
        ];
    }

    // Add click event to each agent card
    agentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Update detailed view with agent info
            updateAgentDetails(card);
            
            // Show detailed view
            detailedView.classList.add('active');
            
            // Mark this card as active
            agentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mark this button as active
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.textContent.trim();
            
            // Show all cards if 'All' is selected
            if (filter === 'All') {
                agentCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter cards by role
            agentCards.forEach(card => {
                const role = card.querySelector('.agent-role').textContent;
                if (role === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            detailedView.classList.remove('active');
        });
    }

    // Close modal when clicking outside the content
    if (detailedView) {
        detailedView.addEventListener('click', (e) => {
            if (e.target === detailedView) {
                detailedView.classList.remove('active');
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