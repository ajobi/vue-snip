import { snipByCSS, snipByJS } from '../method/index'
import { VueSnipState } from '../index'

export const getSnipText = (state: VueSnipState) => (el: HTMLElement) => {
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
