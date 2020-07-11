import { getResizeObserver } from '../element/element.observer.js'
import { normalizeMaxLines } from './directive.utils.js'

export const getInserted = (state, snipText) => (el, { value, arg }) => {
  const { elementMap, options } = state

  const ResizeObserver = getResizeObserver()
  const observer = new ResizeObserver(([entry]) => {
    if (entry.contentRect.width !== elementMap.get(el).prevWidth) {
      snipText(el)
      elementMap.get(el).prevWidth = el.clientWidth
    }
  })
  observer.observe(el)

  elementMap.set(el, {
    observer: observer,
    fullText: el.textContent,
    maxLines: normalizeMaxLines(value),
    snipMethod: arg || options.snipMethod
  })
}
