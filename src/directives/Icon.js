export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-2xl`;

    if (binding.arg === "full") {
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      iconClass = `float-right ${iconClass}`;
    }

    if (binding.modifiers.yellow) {
      iconClass = `${iconClass} text-yellow-400`;
    } else {
      iconClass = `${iconClass} text-green-400`;
    }

    // esling-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
