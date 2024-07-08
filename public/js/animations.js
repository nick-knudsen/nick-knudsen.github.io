function scrollToElement(elementId, duration) {
    const targetElement = document.getElementById(elementId);
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animate(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t ** 3 : 1 - ((-2 * t + 2) ** 3) / 2;
}

// Add smooth scrolling to all links with class "smooth-scroll"
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToElement(targetId, 1500);
    });
});

// fade in and slide up
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const portrait = document.getElementById('portrait');
    const aboutText = document.getElementById('about-text');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const closeIcon = mobileOverlay.querySelector('.close-icon');
    const imageOverlays = document.querySelectorAll('.overlay');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    imageOverlays.forEach(overlay => {
        observer.observe(overlay);
    });

    menuToggle.addEventListener('click', function(event) {
        mobileOverlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('overlay-active');
    });
    closeIcon.addEventListener('click', function(event) {
        mobileOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('overlay-active');
    });

    if (portrait && aboutText) {
        function onScroll() {
            const portraitRect = portrait.getBoundingClientRect();
            const aboutTextRect = aboutText.getBoundingClientRect();
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

            if (portraitRect.top <= windowHeight && portraitRect.bottom >= 0) {
                portrait.classList.add('visible');
            }
            if (aboutTextRect.top <= windowHeight && aboutTextRect.bottom >= 0) {
                aboutText.classList.add('visible');
            }
        }

        window.addEventListener('scroll', onScroll);
        onScroll(); // Check if the image is already in view on load
    }
});