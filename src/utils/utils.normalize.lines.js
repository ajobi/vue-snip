import { defaultOptions } from '../defaultOptions'

export const normalizeMaxLines = (state, maxLines) => {
  const parsedMaxLines = parseInt(maxLines)

  if (!Number.isNaN(parsedMaxLines)) {
    return parsedMaxLines
  }

  const { maxLines: globalMaxLines } = state.options
  const parsedGlobalMaxLines = parseInt(globalMaxLines)

  if (!Number.isNaN(parsedGlobalMaxLines)) {
    return parsedGlobalMaxLines
  }

  return defaultOptions.maxLines
}
