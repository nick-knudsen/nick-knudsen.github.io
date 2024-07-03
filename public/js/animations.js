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
    const portrait = document.getElementById('portrait');
    const aboutText = document.getElementById('about-text');

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
});