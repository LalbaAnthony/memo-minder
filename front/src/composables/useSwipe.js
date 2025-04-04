import { onMounted, onUnmounted } from 'vue';

export function useSwipe(callback, options = {}) {
    const {
        threshold = 50,
        restraint = 30,
        element = document,
    } = options;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    function handleGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < restraint) {
            if (deltaX > 0) {
                callback && callback('right');
            } else if (deltaX < 0) {
                callback && callback('left');
            }
        }
    }

    function onTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }

    function onTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }

    onMounted(() => {
        element.addEventListener('touchstart', onTouchStart, false);
        element.addEventListener('touchend', onTouchEnd, false);
    });

    onUnmounted(() => {
        element.removeEventListener('touchstart', onTouchStart, false);
        element.removeEventListener('touchend', onTouchEnd, false);
    });
}
