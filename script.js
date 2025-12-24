document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation with Intersection Observer for better performance
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Optional: keep animating on scroll back
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Navbar Glassmorphism on Scroll
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.background = "rgba(0, 51, 102, 0.85)";
            nav.style.backdropFilter = "blur(12px)";
            nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            nav.style.padding = "5px 0";
        } else {
            nav.style.background = "var(--primary)";
            nav.style.backdropFilter = "none";
            nav.style.boxShadow = "none";
            nav.style.padding = "0";
        }
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-value');
    const startCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
            const suffix = stat.innerText.replace(/[0-9]/g, '');
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.innerText = Math.ceil(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when in view
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    console.log('THPT Cù Huy Cận - Premium Landing Page Loaded');
});
