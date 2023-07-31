const editable = {
  mounted(el, binding, vnode, prevVnode) {
    vnode.dynamicChildren.forEach((child) => {
      if (child.el.nodeName !== 'H3') {
        child.el.setAttribute('contenteditable', binding.value);
      }
    });
  },
  updated(el, binding, vnode, prevVnode) {
    vnode.dynamicChildren.forEach((child) => {
      // console.log('binding.value:', binding.value);
      if (child.el.nodeName !== 'H3') {
        child.el.setAttribute('contenteditable', binding.value);
      }
    });
  },
};

export { editable };
