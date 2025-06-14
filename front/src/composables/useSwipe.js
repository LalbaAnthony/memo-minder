import { onMounted, onUnmounted } from 'vue';

export function useSwipe(callback, options = {}) {
    const {
        threshold = 50,
        restraint = 30,
        element = document,
        ignores = [], // list of class names to ignore
    } = options;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let ignore = false;

    function handleGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < restraint) {
            callback && callback(deltaX > 0 ? 'right' : 'left');
        }
    }

    function onTouchStart(e) {
        const target = e.target;

        ignore = ignores.some(cls =>
            target.closest(`.${cls}`)
        );

        if (!ignore) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }
    }

    function onTouchEnd(e) {
        if (ignore) {
            ignore = false;
            return;
        }

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
