// ============================================
// BEASISWA DEVELOPER HANDAL 2026
// Interactive JavaScript for Landing Page
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // HAMBURGER MENU TOGGLE
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking links or buttons inside the menu
        navMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS (AOS-like)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            header.style.background = '#000000';
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // QUEST ITEMS SEQUENTIAL ANIMATION
    // ========================================
    const questItems = document.querySelectorAll('.quest-item');
    let hasAnimated = false;

    const questObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                questItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    if (questItems.length > 0) {
        questObserver.observe(questItems[0]);
    }

    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('%')) {
                        // Skip percentage
                        return;
                    } else if (text === 'Global') {
                        // Skip text stats
                        return;
                    } else {
                        const value = parseInt(text);
                        if (!isNaN(value)) {
                            animateCounter(stat, value);
                        }
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ========================================
    // REWARD CARDS TILT EFFECT
    // ========================================
    const rewardCards = document.querySelectorAll('.reward-card');

    rewardCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // LOADING ANIMATION
    // ========================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ========================================
    // PERFORMANCE OPTIMIZATION: Throttle scroll events
    // ========================================
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ========================================
    // CONSOLE MESSAGE (Easter Egg)
    // ========================================
    console.log('%c🚀 SPARK YOUR EDGE! ', 'background: linear-gradient(135deg, #0052D9, #00E5FF); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%cBeasiswa Developer Handal 2026', 'color: #00E5FF; font-size: 16px; font-weight: bold;');
    console.log('%cBergabunglah dengan kami dan kuasai teknologi Edge Computing! 💻', 'color: #A0AEC0; font-size: 14px;');

    // ========================================
    // REGISTER SERVICE WORKER (Optional PWA)
    // ========================================
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(
                registration => {
                    console.log('ServiceWorker registration successful');
                },
                err => {
                    console.log('ServiceWorker registration failed: ', err);
                }
            );
        });
    }
});

// ========================================
// EXTERNAL LINK ANALYTICS (Optional)
// ========================================
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.href && target.href.startsWith('http')) {
        // Track external link clicks
        console.log('External link clicked:', target.href);
        // You can integrate with Google Analytics here
        // gtag('event', 'click', { 'event_category': 'external_link', 'event_label': target.href });
    }
});

// ========================================
// FORM VALIDATION (if needed in future)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// ========================================
// UTILITY: Get device type
// ========================================
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// ========================================
// RESIZE HANDLER (Simplified)
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const deviceType = getDeviceType();
        console.log('Device type:', deviceType);
    }, 250);
});
