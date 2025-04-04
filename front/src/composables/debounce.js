/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's invoked.
 * @returns {Function} Returns the new debounced function.
 */
function debounce(func, wait, options = {}) {
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }

    let timerId, lastArgs, lastThis, lastCallTime, lastInvokeTime = 0, result;
    const leading = !!options.leading;
    const trailing = 'trailing' in options ? !!options.trailing : true;
    const maxWait = options.maxWait;
    const maxing = maxWait != null;

    wait = +wait || 0;
    const invokeFunc = (time) => {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    };

    const startTimer = (pendingFunc, wait) => setTimeout(pendingFunc, wait);
    const cancelTimer = (id) => clearTimeout(id);

    const leadingEdge = (time) => {
        lastInvokeTime = time;
        timerId = startTimer(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    };

    const remainingWait = (time) => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;
        return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    };

    const shouldInvoke = (time) => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        // First call, or time elapsed is greater than wait, or system time went backwards,
        // or we've hit the maxWait.
        return (lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait));
    };

    const timerExpired = () => {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart timer for the remaining wait period.
        timerId = startTimer(timerExpired, remainingWait(time));
    };

    const trailingEdge = (time) => {
        timerId = undefined;
        // Only invoke if we have pending calls and trailing is true.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    };

    const cancel = () => {
        if (timerId !== undefined) {
            cancelTimer(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    };

    const flush = () => timerId === undefined ? result : trailingEdge(Date.now());

    const debounced = function (...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        lastArgs = args;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = startTimer(timerExpired, wait);
        }
        return result;
    };

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

export default debounce;