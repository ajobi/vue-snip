import { getResizeObserver } from '../utils/utils.observer'
import { normalizeMaxLines, normalizeSnipMethod } from '../utils'

export const getInserted = (state, snipText) => (el, { value, arg }) => {
  const { elementMap, options } = state

  const ResizeObserver = getResizeObserver(options)
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
