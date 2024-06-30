document.addEventListener('DOMContentLoaded', function () {
    console.log('document loaded');
    fetch('/api/images')
        .then(response => {
            console.log('Fetch response:', response);  // Log the raw response
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })

        .then(images => {
            console.log('Fetched images:', images);  // Log the parsed JSON response
            const gallery = document.getElementById('imageGallery');
            const carousel = document.querySelector('.carousel');

            images.forEach(src => {
                // Add to gallery
                const listItem = document.createElement('li');
                const img = document.createElement('img');
                img.src = `images/photography/${src}`;
                listItem.appendChild(img);
                gallery.appendChild(listItem);

                // // Add to carousel
                // const slide = document.createElement('div');
                // slide.classList.add('slide');
                // const carouselImg = document.createElement('img');
                // carouselImg.src = `images/${src}`;
                // slide.appendChild(carouselImg);
                // carousel.appendChild(slide);
            });

            initializeCarousel();
            initializeFullView();

        })
        .catch(error => console.error('Error fetching images:', error));
});

function initializeCarousel() {
    // Carousel functionality
    let slideIndex = 0;
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.slide');
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');

    function updateCarousel() {
        carousel.scrollLeft = slideIndex * item.clientWidth;
    }

    function resetAutoAdvanceTimer() {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = setInterval(autoAdvance, 10000);
    }

    function autoAdvance() {
        slideIndex++;
        if (slideIndex >= carousel.children.length) {
            slideIndex = 0;
        }
        updateCarousel();
    }

    right.addEventListener('click', function () {
        slideIndex++;
        if (slideIndex >= carousel.children.length) {
            slideIndex = 0;
        }
        updateCarousel();
        resetAutoAdvanceTimer();
    });

    left.addEventListener('click', function () {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = carousel.children.length - 1;
        }
        updateCarousel();
        resetAutoAdvanceTimer();
    });

    let autoAdvanceInterval = setInterval(autoAdvance, 10000);
}

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
