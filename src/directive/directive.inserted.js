import { getResizeObserver } from '../element/element.observer.js'
import { normalizeMaxLines, normalizeSnipMethod } from '../utils'

export const getInserted = (state, snipText) => (el, { value, arg }) => {
  const { elementMap } = state

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
    maxLines: normalizeMaxLines(state, value),
    snipMethod: normalizeSnipMethod(state, arg)
  })
}
