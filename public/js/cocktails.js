document.addEventListener('DOMContentLoaded', function() {
    let scrollElementIndex = 0;
    const images = document.querySelectorAll('.image-gallery .image-item');

    function getVisibleElementIndex() {
        for (let i = 0; i < images.length; i++) {
            const rect = images[i].getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                return i;
            }
        }
        return 0;
    }

    function scrollToElement(index) {
        if (images[index]) {
            images[index].scrollIntoView();
        }
    }

    function selectTileView() {
        if (document.getElementById('tile-view-button').classList.contains('active')) {
            return;
        }
        scrollElementIndex = getVisibleElementIndex();
        document.querySelector('.image-gallery').classList.remove('timeline-view');
        document.querySelector('.image-gallery').classList.add('tile-view');
        document.getElementById('tile-view-button').classList.add('active');
        document.getElementById('timeline-view-button').classList.remove('active');
        scrollToElement(scrollElementIndex);
    }

    function selectTimelineView() {
        if (document.getElementById('timeline-view-button').classList.contains('active')) {
            return;
        }
        scrollElementIndex = getVisibleElementIndex();
        document.querySelector('.image-gallery').classList.remove('tile-view');
        document.querySelector('.image-gallery').classList.add('timeline-view');
        document.getElementById('timeline-view-button').classList.add('active');
        document.getElementById('tile-view-button').classList.remove('active');
        scrollToElement(scrollElementIndex);
    }

    // Attach functions to buttons
    document.getElementById('tile-view-button').addEventListener('click', selectTileView);
    document.getElementById('timeline-view-button').addEventListener('click', selectTimelineView);
});