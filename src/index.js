import { snipElement } from './modules/onElementResized.js'

export default {
  install (Vue, options) {
    Vue.directive('snip-text', {
      inserted (el, { value }) {
        el.__snipText = {
          fullText: el.innerText,
          maxLines: value
        }

        const resizeObserver = new ResizeObserver(() => snipElement(el))
        resizeObserver.observe(el)
      },
      update (el, { value }) {
        el.__snipText.maxLines = value
        snipElement(el)
      }
    })
  }
}
