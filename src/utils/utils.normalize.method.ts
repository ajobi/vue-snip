import { defaultOptions } from '../defaultOptions'
import { VueSnipState } from '../index'

const supportsCSSMethod = (): boolean =>
  typeof CSS !== 'undefined' &&
  CSS.supports('display', '-webkit-box') &&
  CSS.supports('-webkit-line-clamp', '3') &&
  CSS.supports('-webkit-box-orient', 'vertical')

export const normalizeSnipMethod = (state: VueSnipState, snipMethod) => {
  if (!supportsCSSMethod()) {
    return 'js'
  }

  if (snipMethod === 'css' || snipMethod === 'js') {
    return snipMethod
  }

  const { snipMethod: globalSnipMethod } = state.options

  if (globalSnipMethod === 'css' || globalSnipMethod === 'js') {
    return globalSnipMethod
  }

  return defaultOptions.snipMethod
}
