import { snipByCSS, snipByJS } from '../method'

export const getSnipText = (state) => (el) => {
  const { snipMethod } = state.elementMap.get(el)

  if (snipMethod === 'css') {
    snipByCSS(state, el)
    return
  }

  if (snipMethod === 'js') {
    snipByJS(state, el)
  }
}
