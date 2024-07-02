document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/images')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })

        .then(images => {
            const gallery = document.getElementById('imageGallery');

            images.forEach(src => {
                // Add to gallery
                const listItem = document.createElement('li');
                const img = document.createElement('img');
                img.src = `public/images/photography/${src}`;
                img.loading= 'lazy';
                listItem.appendChild(img);
                gallery.appendChild(listItem);
            });

            initializeFullView();

        })
        .catch(error => console.error('Error fetching images:', error));
});

function initializeFullView() {

    const images = document.querySelectorAll('.image-gallery img');

    // Full view image functionality
    images.forEach(image => {
        image.addEventListener('click', function () {
            let existingFullView = document.querySelector('.full-view');
            if (existingFullView) {
                existingFullView.remove();
            }

            const fullViewImage = document.createElement('img');
            fullViewImage.src = image.src;
            fullViewImage.classList.add('full-view');

            document.body.appendChild(fullViewImage);
            document.body.style.overflow = 'hidden';

            fullViewImage.addEventListener('click', function () {
                fullViewImage.remove();
                document.body.style.overflow = 'auto';
            });
        });
    });
}

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
