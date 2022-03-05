import { snip } from 'js-snip'

export const update = (el: HTMLElement, { value, arg }) => {
  snip(el, { lines: value, mode: arg })
}
