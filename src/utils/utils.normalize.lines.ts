import { defaultOptions } from '../defaultOptions'
import { VueSnipState } from '../index'

export const normalizeMaxLines = (state: VueSnipState, maxLines) => {
  const parsedMaxLines = parseInt(maxLines)

  if (!isNaN(parsedMaxLines)) {
    return parsedMaxLines
  }

  const { maxLines: globalMaxLines } = state.options
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const parsedGlobalMaxLines = parseInt(globalMaxLines)

  if (!isNaN(parsedGlobalMaxLines)) {
    return parsedGlobalMaxLines
  }

  return defaultOptions.maxLines
}
