import { addObserver, normalizeMaxLines, normalizeSnipMethod, destroyObserver } from '../utils'

export const getUpdate = (state, snipText) => (el, { value, arg }) => {
  const { elementMap } = state

  const isJStoCSSChange = arg !== elementMap.get(el).snipMethod && arg === 'css'
  const isMaxLinesChange = value !== elementMap.get(el).maxLines

  elementMap.get(el).maxLines = normalizeMaxLines(state, value)
  elementMap.get(el).snipMethod = normalizeSnipMethod(state, arg)

  const needsObserver = elementMap.get(el).snipMethod === 'js'
  needsObserver && ResizeObserver ? addObserver(state, snipText, el) : destroyObserver(state, el)

  const needsSnipping = isMaxLinesChange || isJStoCSSChange
  needsSnipping && snipText(el)
}
