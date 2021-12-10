import { snip } from 'js-snip'

export const getUpdate =
  () =>
  (el: HTMLElement, { value, arg }) => {
    snip(el, { lines: value, method: arg })
  }
