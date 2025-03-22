export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        event.stopPropagation();
        binding.value();
      }
    };
    // Attach in capture phase (third argument true)
    document.body.addEventListener('click', el.clickOutsideEvent, true);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent, true);
  }
};
