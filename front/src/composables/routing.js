const goBackSafe = (router, defaulting = '/') => {
    const referrer = document.referrer;
    const currentOrigin = window.location.origin;

    if (referrer.startsWith(currentOrigin)) {
        router.go(-1);
    } else {
        router.push(defaulting);
    }
};

export const routing = {
    goBackSafe,
};