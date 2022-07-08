export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-2xl`;

    if (binding.value.right) {
      iconClass = `float-right ${iconClass}`;
    }

    if (binding.value.active) {
      iconClass = `${iconClass} text-green-400`;
    }

    // esling-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
