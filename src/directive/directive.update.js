import { addObserver, normalizeMaxLines, normalizeSnipMethod, destroyObserver } from '../utils'

export const getUpdate = (state, snipText) => (el, { value, arg }) => {
  const { elementMap } = state

  elementMap.get(el).maxLines = normalizeMaxLines(state, value)
  elementMap.get(el).snipMethod = normalizeSnipMethod(state, arg)

  const needsObserver = elementMap.get(el).snipMethod === 'js'
  needsObserver && ResizeObserver ? addObserver(state, snipText, el) : destroyObserver(state, el)

  snipText(el)
}
