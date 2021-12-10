import { snip } from 'js-snip'

export const getInserted =
  () =>
  (el: HTMLElement, { value, arg }) => {
    snip(el, { lines: value, method: arg })
  }
