document.addEventListener('DOMContentLoaded', () => {
    
    // --- Opening Screen Logic ---
    const openBtn = document.getElementById('open-invite-btn');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    
    // Audio and Music Control Elements
    const bgMusic = document.getElementById('bg-music');
    const musicControlBtn = document.getElementById('music-control');
    const musicIcon = musicControlBtn.querySelector('i');
    
    // Set volume to soft
    bgMusic.volume = 0.3;

    openBtn.addEventListener('click', () => {
        // Play music on interaction
        bgMusic.play().catch(e => console.log('Audio playback failed: ', e));
        
        // Show music control
        musicControlBtn.classList.remove('hidden');

        // Trigger fade out
        openingScreen.classList.add('fade-out');
        
        // Show main content and start scroll at top
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // Allow time for fade out before completely hiding it from DOM flow
        setTimeout(() => {
            openingScreen.style.display = 'none';
            // Init scroll animations after opening
            checkScroll();
        }, 1500);
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
