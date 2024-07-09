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
            if (window.innerWidth > 899) {
                let existingFullView = document.querySelector('.full-view');
                if (existingFullView) {
                    existingFullView.remove();
                }

                const fullViewImage = document.createElement('img');
                fullViewImage.src = image.src;
                fullViewImage.classList.add('full-view');
                document.body.appendChild(fullViewImage);

                // Save the current scroll position
                const scrollY = window.scrollY;
                // Maintain the scrollbar while preventing scrolling
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollY}px`;
                document.body.style.paddingRight = `${getScrollbarWidth()}px`;

                fullViewImage.addEventListener('click', function () {
                    fullViewImage.remove();

                    // re-enable scrolling
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                    document.body.style.position = '';
                    document.body.style.top = '';
                    // Restore the scroll position
                    window.scrollTo(0, scrollY);
                });
            } else {
                const container = document.createElement('div');
                constainer.classList.add('pinch-zoom-container');
            }
        });
    });
}

function getScrollbarWidth() {
    // Create a temporary div to measure the scrollbar width
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);

    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollbarWidth;
}