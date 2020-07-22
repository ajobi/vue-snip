import { snipByCSS, snipByJS } from '../method'

export const getSnipText = (state) => (el) => {
  const elState = state.elementMap.get(el)

  console.log('Snip')

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
