import { snip } from 'js-snip'

export const inserted = (el: HTMLElement, { value, arg }) => {
  snip(el, { lines: value, mode: arg })
}
