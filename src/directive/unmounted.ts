import { unsnip } from 'js-snip'
import { VueSnipDirectiveHook } from '../types'

export const unmounted: VueSnipDirectiveHook = (el) => {
  unsnip(el)
}
