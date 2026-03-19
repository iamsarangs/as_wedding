document.addEventListener('DOMContentLoaded', () => {
    
    // --- Opening Screen Logic ---
    const openBtn = document.getElementById('open-invite-btn');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    
    // Audio and Music Control Elements
    const bgMusic = document.getElementById('bgMusic');
    const musicControlBtn = document.getElementById('music-control');
    const musicIcon = musicControlBtn.querySelector('i');
    
    // Helper to fade in audio
    function fadeInAudio(durationMs) {
        let vol = 0;
        const steps = 50;
        const interval = durationMs / steps;
        const targetVol = 0.5; // Soft romantic at 0.5
        bgMusic.volume = 0;
        bgMusic.play().catch(e => console.log('Audio playback failed: ', e));
        
        const fadeInterval = setInterval(() => {
            if (vol < targetVol) {
                vol += targetVol / steps;
                bgMusic.volume = Math.min(vol, targetVol);
            } else {
                clearInterval(fadeInterval);
            }
        }, interval);
    }

    openBtn.addEventListener('click', () => {
        openBtn.style.transition = 'opacity 1s ease, transform 1s ease';
        openBtn.style.opacity = '0';
        openBtn.style.transform = 'translateZ(100px)';
        
        fadeInAudio(3000);
        
        // Trigger 3D Camera Parallax Drift
        document.querySelector('.scene-3d').classList.add('animate-camera');

        // Generate Cinematic Intro Particles
        const introParticlesLayer = document.getElementById('intro-particles');
        for (let i = 0; i < 30; i++) {
            let p = document.createElement('div');
            p.className = 'intro-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            let size = Math.random() * 4 + 1;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.opacity = Math.random() * 0.5 + 0.1;
            introParticlesLayer.appendChild(p);
        }
        
        const text1 = document.getElementById('cinematic-text-1');
        const text2 = document.getElementById('cinematic-text-2');
        const text3 = document.getElementById('cinematic-text-3');

        // Cinematic Sequence with requestAnimationFrame for smooth triggering
        setTimeout(() => {
            openBtn.style.display = 'none';
            
            // Step 1
            text1.classList.remove('hidden');
            requestAnimationFrame(() => requestAnimationFrame(() => text1.classList.add('active')));
            
            setTimeout(() => {
                text1.classList.remove('active');
                text1.classList.add('fade-out');
                
                // Step 2
                setTimeout(() => {
                    text1.classList.add('hidden');
                    text2.classList.remove('hidden');
                    requestAnimationFrame(() => requestAnimationFrame(() => text2.classList.add('active')));
                    
                    setTimeout(() => {
                        text2.classList.remove('active');
                        text2.classList.add('fade-out');
                        
                        // Step 3
                        setTimeout(() => {
                            text2.classList.add('hidden');
                            text3.classList.remove('hidden');
                            requestAnimationFrame(() => requestAnimationFrame(() => text3.classList.add('active')));
                            
                            // Finish and reveal main content
                            setTimeout(() => {
                                openingScreen.classList.add('fade-out');
                                mainContent.classList.remove('hidden');
                                window.scrollTo(0, 0);
                                musicControlBtn.classList.remove('hidden');

                                setTimeout(() => {
                                    openingScreen.style.display = 'none';
                                    checkScroll();
                                }, 2000);
                                
                            }, 4500); // Linger longer on Title for effect
                            
                        }, 1500); // Let previous text fade past camera
                        
                    }, 4000); // Linger on text 2
                    
                }, 1500); // Let previous text fade past camera
                
            }, 3500); // Linger on text 1
            
        }, 1000); // Wait for button to fade out
    });

    // --- Music Toggle Logic ---
    musicControlBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.className = 'fa-solid fa-volume-high';
        } else {
            bgMusic.pause();
            musicIcon.className = 'fa-solid fa-volume-xmark';
        }
    });

    // --- Petal Animation Logic ---
    const petalsContainer = document.getElementById('petals-container');
    const petalColors = ['#FADADD', '#FFE4E1', '#FFF0F5', '#ffffff'];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize petal properties
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 5 + 5; // 5s to 10s
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}vw`;
        petal.style.animationDuration = `${animationDuration}s`;
        petal.style.backgroundColor = color;
        
        petalsContainer.appendChild(petal);
        
        // Remove petal after animation completes to avoid DOM bloat
        setTimeout(() => {
            petal.remove();
        }, animationDuration * 1000);
    }
    
    // Create petals periodically
    setInterval(createPetal, 300);

    // --- Countdown Logic ---
    const weddingDate = new Date('April 26, 2026 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<h2>It's the Big Day!</h2>";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown(); // initial call

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll('.fade-on-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const checkScroll = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        checkScroll();
    });
});
