import { defaultOptions } from '../defaultOptions'

export const normalizeSnipMethod = (state, snipMethod) => {
  if (snipMethod === 'css' || snipMethod === 'js') {
    return snipMethod
  }

  const { snipMethod: globalSnipMethod } = state.options

  if (globalSnipMethod === 'css' || globalSnipMethod === 'js') {
    return globalSnipMethod
  }

  return defaultOptions.snipMethod
}
