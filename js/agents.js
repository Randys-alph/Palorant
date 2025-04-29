document.addEventListener('DOMContentLoaded', function() {
    // scroll animations for the agents page
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

    // agent cards interaction
    const agentCards = document.querySelectorAll('.agent-card');
    const detailedView = document.querySelector('.detailed-view');
    const agentDetailImage = document.querySelector('.agent-detail-image');

    // function to update detailed view content
    function updateAgentDetails(card) {
        const agentName = card.querySelector('.agent-name').textContent;
        const agentRole = card.querySelector('.agent-role').textContent;
        const agentDescription = card.querySelector('.agent-description').textContent;
        const agentImageSrc = card.querySelector('.agent-image').src;
        
        // update the detailed view
        document.querySelector('.agent-detail-name').textContent = agentName;
        document.querySelector('.agent-detail-role').textContent = agentRole;
        agentDetailImage.src = agentImageSrc;
        
        // update bio and abilities based on the agent
        const agentBio = getBioByName(agentName);
        document.querySelector('.agent-detail-bio').textContent = agentBio;
        
        // update abilities
        updateAgentAbilities(agentName);
    }

    // function to get agent bio by name
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

    // function to update agent abilities
    function updateAgentAbilities(agentName) {
        const abilitiesContainer = document.querySelector('.detailed-abilities');
        abilitiesContainer.innerHTML = '';
        const abilities = getAbilitiesByName(agentName);

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

    // function to get abilities by agent name
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
            'Sage': [
                { key: 'Q', name: 'Slow Orb', description: 'Cast a slowing orb that detonates upon landing, creating a lingering field that slows players caught inside of it.' },
                { key: 'E', name: 'Healing Orb', description: 'Heal an ally or yourself to full health over a few seconds.' },
                { key: 'C', name: 'Barrier Orb', description: 'Create a solid wall. Can be rotated before casting.' },
                { key: 'X', name: 'Resurrection', description: 'Target a friendly corpse to revive them with full health.' }
            ],
            'Jett': [
                { key: 'Q', name: 'Updraft', description: 'Propel yourself upwards after a brief delay.' },
                { key: 'E', name: 'Tailwind', description: 'Dash a short distance in the direction you are moving.' },
                { key: 'C', name: 'Cloudburst', description: 'Throw a projectile that expands into a brief smoke cloud on impact with a surface.' },
                { key: 'X', name: 'Blade Storm', description: 'Equip a set of highly accurate throwing knives. Fire to throw a single knife. Alternative fire throws all remaining daggers at an enemy.' }
            ],
            'Omen': [
                { key: 'Q', name: 'Paranoia', description: 'Fire a shadow projectile forward, briefly reducing the vision range and deafening all players it touches.' },
                { key: 'E', name: 'Dark Cover', description: 'Cast an orb that bursts into a sphere of shadow obscuring vision. Can be charged to increase distance.' },
                { key: 'C', name: 'Shrouded Step', description: 'After a delay, teleport a short distance.' },
                { key: 'X', name: 'From the Shadows', description: 'Select anywhere on the map to teleport and reform. When arriving, appear as a Shade that can be destroyed by enemies to cancel the teleport.' }
            ],
            'Brimstone': [
                { key: 'Q', name: 'Incendiary', description: 'Launch a grenade that deploys a lingering fire zone that damages players within it.' },
                { key: 'E', name: 'Sky Smoke', description: 'Deploy a tactical map and place smoke markers. Confirm to call in orbital smoke strikes at all marked locations.' },
                { key: 'C', name: 'Stim Beacon', description: 'Deploy a stim beacon that gives players RapidFire when in its range.' },
                { key: 'X', name: 'Orbital Strike', description: 'Use your map to target a location, calling down a devastating orbital strike that pulses for high damage over several seconds.' }
            ],
            'Killjoy': [
                { key: 'Q', name: 'Alarmbot', description: 'Deploy a bot that hunts down enemies in range. After reaching its target, the bot explodes, applying vulnerable to enemies in the area.' },
                { key: 'E', name: 'Turret', description: 'Deploy a turret that fires at enemies in a 180-degree cone.' },
                { key: 'C', name: 'Nanoswarm', description: 'Place a hidden canisters that you can trigger to deploy a damaging swarm of nanobots.' },
                { key: 'X', name: 'Lockdown', description: 'Deploy a device that detains all enemies caught in its radius for about 8 seconds after a windup.' }
            ],
            'Yoru': [
                { key: 'Q', name: 'Blindside', description: 'Tear a hole through reality to send out a flash that blinds players looking at it.' },
                { key: 'E', name: 'Gatecrash', description: 'Place a rift tether. Activate to teleport to its location. Can also be triggered remotely.' },
                { key: 'C', name: 'Fakeout', description: 'Deploy an echo that mimics footsteps when activated. Enemies who shoot the echo are revealed.' },
                { key: 'X', name: 'Dimensional Drift', description: 'Equip a mask that allows you to see between dimensions and enter the alternate dimension, becoming invisible to enemies.' }
            ],
            'Chamber': [
                { key: 'Q', name: 'Headhunter', description: 'Activate to equip a heavy pistol. Alt Fire to aim down sights.' },
                { key: 'E', name: 'Rendezvous', description: 'Place two teleport anchors. While on the ground and in range of an anchor, reactivate to quickly teleport to the other anchor.' },
                { key: 'C', name: 'Trademark', description: 'Place a trap that scans for enemies. When a visible enemy comes in range, the trap counts down and then destabilizes the terrain around them, creating a lingering slowing field.' },
                { key: 'X', name: 'Tour De Force', description: 'Activate to summon a powerful, custom sniper rifle that will kill an enemy with any direct hit. Killing an enemy creates a lingering field that slows players caught inside.' }
            ],
            'Breach': [
                { key: 'Q', name: 'Flashpoint', description: 'Equip a blinding charge. Fire the charge to set a fast-acting burst through the wall. The charge detonates to blind all players looking at it.' },
                { key: 'E', name: 'Fault Line', description: 'Equip a seismic blast. Hold Fire to increase the distance. Release to set off the quake, dazing all players in its zone and in a line up to the zone.' },
                { key: 'C', name: 'Aftershock', description: 'Equip a fusion charge. Fire the charge to set a slow-acting burst through the wall. The burst does heavy damage to anyone caught in its area.' },
                { key: 'X', name: 'Rolling Thunder', description: 'Equip a seismic charge. Fire to send a cascading quake through all terrain in a large cone. The quake dazes and knocks up anyone caught in it.' }
            ],
            'Viper': [
                { key: 'Q', name: 'Poison Cloud', description: 'Equip a gas emitter. Fire to throw the emitter that perpetually remains throughout the round. Re-use the ability to create a toxic gas cloud at the cost of fuel.' },
                { key: 'E', name: 'Toxic Screen', description: 'Equip a gas emitter launcher. Fire to deploy a long line of gas emitters. Re-use the ability to create a tall wall of toxic gas at the cost of fuel.' },
                { key: 'C', name: 'Snake Bite', description: 'Equip a chemical launcher. Fire to launch a canister that shatters upon hitting the floor, creating a lingering chemical zone that damages and applies vulnerable.' },
                { key: 'X', name: 'Viper\'s Pit', description: 'Equip a chemical sprayer. Fire to spray a chemical cloud in all directions around Viper, creating a large cloud that reduces the vision range and maximum health of players inside of it.' }
            ]
        };
        
        return agentAbilities[name] || [
            { key: 'Q', name: 'Ability 1', description: 'No description available.' },
            { key: 'E', name: 'Ability 2', description: 'No description available.' },
            { key: 'C', name: 'Ability 3', description: 'No description available.' },
            { key: 'X', name: 'Ultimate', description: 'No description available.' }
        ];
    }

    // click agent to show detailed info
    agentCards.forEach(card => {
        card.addEventListener('click', () => {
            updateAgentDetails(card);
            
            detailedView.classList.add('active');
            
            agentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.textContent.trim();
            
            if (filter === 'All') {
                agentCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
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

    // close detail info when clicking outside the content
    if (detailedView) {
        detailedView.addEventListener('click', (e) => {
            if (e.target === detailedView) {
                detailedView.classList.remove('active');
            }
        });
    }

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
    
    // close menu option when clicking outside
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