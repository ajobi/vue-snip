import { defaultOptions } from '../defaultOptions'

export const normalizeMaxLines = (state, maxLines) => {
  const parsedMaxLines = parseInt(maxLines)

  if (!isNaN(parsedMaxLines)) {
    return parsedMaxLines
  }

  const { maxLines: globalMaxLines } = state.options
  const parsedGlobalMaxLines = parseInt(globalMaxLines)

  if (!isNaN(parsedGlobalMaxLines)) {
    return parsedGlobalMaxLines
  }

  return defaultOptions.maxLines
}
