import { unsnip } from 'js-snip'
import { VueSnipDirectiveHook } from '../types'

export const unbind: VueSnipDirectiveHook = (el) => {
  unsnip(el)
}
