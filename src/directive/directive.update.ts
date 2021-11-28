import { addObserver, normalizeMaxLines, normalizeSnipMethod, destroyObserver } from '../utils/index'
import { VueSnipState } from '../index'

export const getUpdate = (state: VueSnipState, snipText) => (el: HTMLElement, { value, arg }) => {
  const elState = state.elementMap.get(el)

  const prevMaxlines = elState.maxLines
  const prevMethod = elState.snipMethod

  elState.maxLines = normalizeMaxLines(state, value)
  elState.snipMethod = normalizeSnipMethod(state, arg)

  const needsObserver = elState.snipMethod === 'js'
  needsObserver && typeof ResizeObserver !== 'undefined' ? addObserver(state, snipText, el) : destroyObserver(state, el)

  const needsSnipping = (prevMaxlines !== elState.maxLines) || (prevMethod !== elState.snipMethod && elState.snipMethod === 'css')
  needsSnipping && snipText(el)
}
