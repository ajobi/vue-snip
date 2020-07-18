import { normalizeMaxLines, normalizeSnipMethod, addObserver } from '../utils'

export const getInserted = (state, snipText) => (el, { value, arg }) => {
  const { elementMap } = state

  elementMap.set(el, {
    fullText: el.textContent,
    maxLines: normalizeMaxLines(state, value),
    snipMethod: normalizeSnipMethod(state, arg)
  })

  const needsObserver = elementMap.get(el).snipMethod === 'js'
  needsObserver && ResizeObserver ? addObserver(state, snipText, el) : snipText(el)
}
