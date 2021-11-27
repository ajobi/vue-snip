import { normalizeMaxLines, normalizeSnipMethod, addObserver } from '../utils/index'

export const getInserted = (state, snipText) => (el, { value, arg }) => {
  const { elementMap } = state

  const elState = {
    fullText: el.textContent,
    maxLines: normalizeMaxLines(state, value),
    snipMethod: normalizeSnipMethod(state, arg)
  }

  elementMap.set(el, elState)

  const needsObserver = elState.snipMethod === 'js'
  needsObserver && typeof ResizeObserver !== 'undefined' ? addObserver(state, snipText, el) : snipText(el)
}
