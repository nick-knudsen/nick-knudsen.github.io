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
