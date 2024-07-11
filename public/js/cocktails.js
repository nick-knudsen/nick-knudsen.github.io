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
        
        if (isFirstViewChange) {
            isFirstViewChange = false;
            return;
        }
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
        
        scrollToLastPosition(scrollOffsetTimelineView);
    }

    // Attach functions to buttons
    document.getElementById('tile-view-button').addEventListener('click', selectTileView);
    document.getElementById('timeline-view-button').addEventListener('click', selectTimelineView);
});