import { snipElement } from './modules/snipElement.js'

export default {
  install (Vue, options) {
    Vue.directive('snip-text', {
      inserted (el, { value }) {
        const resizeObserver = new ResizeObserver(() => snipElement(el))
        resizeObserver.observe(el)

        el.__snipText = {
          observer: resizeObserver,
          fullText: el.innerText,
          maxLines: value
        }
      },
      update (el, { value }) {
        el.__snipText.maxLines = value
        snipElement(el)
      },
      unbind (el) {
        el.__snipText.observer.disconnect()
      }
    })
  }
}
