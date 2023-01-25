import { snip, unsnip } from 'js-snip'
import { VueSnipDirectiveHook } from '../types'

export const updated: VueSnipDirectiveHook = (el, { value }, vnode) => {
  unsnip(el)
  const text = vnode?.children?.[0]?.el?.textContent
  if (text !== undefined) {
    el.textContent = text
  }
  const { lines, mode, midWord, ellipsis, onSnipped } = value
  snip(el, { lines, mode, midWord, ellipsis }, onSnipped)
}
