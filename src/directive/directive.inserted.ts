import { normalizeMaxLines, normalizeSnipMethod, addObserver } from '../utils/index'
import { VueSnipState } from '../index'
import { SnipText } from '../element/element.snip'

export const getInserted = (state: VueSnipState, snipText: SnipText) => (el: HTMLElement, { value, arg }) => {
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
