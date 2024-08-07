document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/images')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })

        .then(images => {
            const gallery = document.getElementById('image-gallery');

            images.forEach(src => {
                // Add to gallery
                const listItem = document.createElement('li');
                const img = document.createElement('img');
                img.src = `public/images/photography/${src}`;
                // img.loading= 'lazy';
                listItem.appendChild(img);
                gallery.appendChild(listItem);
            });

            initializeFullView();

        })
        .catch(error => console.error('Error fetching images:', error));
});

function initializeFullView() {

    const imageGallery = document.querySelector('.image-gallery');
    const images = document.querySelectorAll('.image-gallery img');
    
    images.forEach(image => {

        image.addEventListener('click', function () {
            // Full view image functionality
            if (imageGallery.classList.contains('tile-view')) {
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

document.addEventListener('DOMContentLoaded', function() {
    let isFirstViewChange = true;
    let scrollOffsetTileView = 0;
    let scrollOffsetTimelineView = 0;
    
    function saveScrollPosition () {
        if (document.getElementById('tile-view-button').classList.contains('active')) {
            scrollOffsetTileView = window.scrollY;
        }
        if (document.getElementById('timeline-view-button').classList.contains('active')) {
            scrollOffsetTimelineView = window.scrollY;
        }
    }

    function scrollToLastPosition(offset) {
        window.scrollTo(0, offset);
    }

    function selectTileView() {
        if (document.getElementById('tile-view-button').classList.contains('active')) {
            return;
        }
        saveScrollPosition();

        document.querySelector('.image-gallery').classList.remove('timeline-view');
        document.querySelector('.image-gallery').classList.add('tile-view');
        document.getElementById('tile-view-button').classList.add('active');
        document.getElementById('timeline-view-button').classList.remove('active');
        
        scrollToLastPosition(scrollOffsetTileView);
    }
    
    function selectTimelineView() {
        if (document.getElementById('timeline-view-button').classList.contains('active')) {
            return;
        }
        saveScrollPosition();

        document.querySelector('.image-gallery').classList.remove('tile-view');
        document.querySelector('.image-gallery').classList.add('timeline-view');
        document.getElementById('timeline-view-button').classList.add('active');
        document.getElementById('tile-view-button').classList.remove('active');
        
        if (isFirstViewChange) {
            isFirstViewChange = false;
            return;
        }
        scrollToLastPosition(scrollOffsetTimelineView);
    }

    // Attach functions to buttons
    document.getElementById('tile-view-button').addEventListener('click', selectTileView);
    document.getElementById('timeline-view-button').addEventListener('click', selectTimelineView);
});