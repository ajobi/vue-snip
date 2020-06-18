import { getSnipElement } from './modules/getSnipElement.js'

export default {
  install (Vue, options) {
    const elementMap = new WeakMap()
    const snipElement = getSnipElement(elementMap)

    Vue.directive('snip-text', {
      inserted (el, { value }) {
        const observer = new ResizeObserver(() => snipElement(el))
        observer.observe(el)

        elementMap.set(el, {
          observer: observer,
          fullText: el.innerText,
          maxLines: value
        })
      },
      update (el, { value }) {
        elementMap.get(el).maxLines = value
        snipElement(el)
      },
      unbind (el) {
        elementMap.delete(el)
        elementMap.get(el).observer.disconnect()
      }
    })
  }
}
