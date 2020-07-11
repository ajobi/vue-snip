import { defaultOptions } from '../defaultOptions'

export const normalizeMaxLines = (maxLines) => {
  const parsedMaxLines = parseInt(maxLines)
  return Number.isNaN(parsedMaxLines) ? 0 : parsedMaxLines
}

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
