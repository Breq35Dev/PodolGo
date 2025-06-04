// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // Animation des nombres (compteur de pas)
    const stepCounter = document.querySelector('.step-count');
    if (stepCounter) {
        let startValue = 0;
        let endValue = 8452;
        let duration = 2000;
        let startTime = null;
        
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const value = Math.floor(percentage * (endValue - startValue) + startValue);
            
            stepCounter.textContent = value.toLocaleString();
            
            if (percentage < 1) {
                requestAnimationFrame(animateCounter);
            }
        }
        
        // Démarrer l'animation lorsque l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stepCounter);
    }

    // Animation du header au scroll
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation des témoignages
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentSlide = 0;

    function showSlide(index) {
        // Masquer toutes les slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Désactiver tous les points
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Afficher la slide active
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }

    if (prevButton && nextButton && testimonialDots.length > 0) {
        // Bouton précédent
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        // Bouton suivant
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        // Navigation par points
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Changement automatique des slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Animation au scroll avec intersection observer
    const fadeElements = document.querySelectorAll('.feature-card, .section-title, .testimonial-slide, .app-features li');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Animation SVG des icônes (onde BlueTooth)
    const animateSVG = () => {
        const bluetoothIcon = document.querySelector('.bluetooth-icon path');
        if (bluetoothIcon) {
            bluetoothIcon.style.fill = 'rgba(74, 144, 226, 0.7)';
            setTimeout(() => {
                bluetoothIcon.style.fill = '#4A90E2';
            }, 1000);
        }
    };

    // Pulser l'icône Bluetooth toutes les 2 secondes
    setInterval(animateSVG, 2000);

    // Animation GSAP pour les éléments principaux
    if (window.gsap) {
        // Timeline principale
        const mainTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Animation du titre et du sous-titre
        mainTimeline.from(".hero h1", { 
            y: 50, 
            opacity: 0, 
            duration: 1 
        });
        
        mainTimeline.from(".hero p", { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, "-=0.6");
        
        mainTimeline.from(".cta-buttons .btn", { 
            y: 20, 
            opacity: 0, 
            stagger: 0.2, 
            duration: 0.6 
        }, "-=0.4");

        // Animation des appareils
        gsap.from(".device", { 
            x: -50, 
            opacity: 0, 
            duration: 1,
            delay: 0.5 
        });
        
        gsap.from(".phone", { 
            x: 50, 
            opacity: 0, 
            duration: 1,
            delay: 0.8 
        });
        
        gsap.from(".connection-line", { 
            opacity: 0, 
            duration: 1,
            delay: 1.2 
        });

        // Animation des cartes de fonctionnalités au scroll
        if (window.ScrollTrigger) {
            gsap.utils.toArray('.feature-card').forEach((card, i) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.2
                });
            });

            // Animation de la section de l'application
            gsap.from(".app-content", {
                x: -50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".app-section",
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(".phone-mockup", {
                x: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".app-section",
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });

            // Animation de la section CTA
            gsap.from(".cta-content", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }

    // Ajout d'une classe spéciale pour activer les animations CSS
    document.body.classList.add('js-loaded');
});

// Animation des vagues sur les logo-wave (utilisant l'API Web Animation si disponible)
const animateWaves = () => {
    const waves = document.querySelectorAll('.logo-wave:not(.animated)');
    
    waves.forEach(wave => {
        if ('animate' in wave) {
            wave.classList.add('animated');
            
            const keyframes = [
                { d: "M45,80 Q60,60 75,80 Q90,100 105,80" },
                { d: "M45,80 Q60,100 75,80 Q90,60 105,80" },
                { d: "M45,80 Q60,60 75,80 Q90,100 105,80" }
            ];
            
            const options = {
                duration: 3000,
                iterations: Infinity,
                easing: 'ease-in-out'
            };
            
            wave.animate(keyframes, options);
        }
    });
};

// Exécuter une fois que la page est chargée
window.addEventListener('load', animateWaves);
