import { addObserver, normalizeMaxLines, normalizeSnipMethod, destroyObserver } from '../utils'

export const getUpdate = (state, snipText) => (el, { value, arg }) => {
  const elState = state.elementMap.get(el)

  const isJStoCSSChange = arg !== elState.snipMethod && arg === 'css'
  const isMaxLinesChange = value !== elState.maxLines

  elState.maxLines = normalizeMaxLines(state, value)
  elState.snipMethod = normalizeSnipMethod(state, arg)

  const needsObserver = elState.snipMethod === 'js'
  needsObserver && ResizeObserver ? addObserver(state, snipText, el) : destroyObserver(state, el)

  const needsSnipping = isMaxLinesChange || isJStoCSSChange
  needsSnipping && snipText(el)
}
