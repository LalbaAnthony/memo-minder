const goBackSafe = (router, defaulting = '/') => {
    // history.state.back is only set by vue-router for in-app navigations,
    // so a null value means going back would leave the website

    const previous = router.options.history.state?.back;

    if (previous) {
        router.back();
    } else {
        router.push(defaulting);
    }
};

export const routing = {
    goBackSafe,
};