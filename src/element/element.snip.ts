import { snipByCSS, snipByJS } from '../method/index'
import { VueSnipState, SnipText } from '../types'

export const getSnipText = (state: VueSnipState): SnipText => (el) => {
  const elState = state.elementMap.get(el)

  if (elState.snipMethod === 'css') {
    snipByCSS(state, el)
    return
  }

  if (elState.snipMethod === 'js') {
    snipByJS(state, el)
    elState.prevWidth = el.clientWidth
    elState.prevHeight = el.clientHeight
  }
}
