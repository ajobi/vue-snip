export default {
  install (Vue, options) {
    Vue.directive('snip-text', {
      bind (el, binding, vnode, oldVnode) {
        console.log(el)
      }
    })
  }
}
