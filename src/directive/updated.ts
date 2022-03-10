import { snip } from 'js-snip'
import { VueSnipDirectiveHook } from '../types'

export const updated: VueSnipDirectiveHook = (el, { value }) => {
  const { lines, mode, midWord, ellipsis, onSnipped } = value
  snip(el, { lines, mode, midWord, ellipsis }, onSnipped)
}
