import { snip } from 'js-snip'
import { VueSnipDirectiveHook } from '../types'

export const updated: VueSnipDirectiveHook = (el, { value }, vNode) => {
  const textContent = vNode?.children?.[0]?.text ?? ''
  const { lines, mode, midWord, ellipsis, onSnipped } = value
  snip(el, { lines, mode, midWord, ellipsis, textContent }, onSnipped)
}
