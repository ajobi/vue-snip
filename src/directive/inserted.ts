import { snip } from 'js-snip'

export const inserted = (el: HTMLElement, { value }) => {
  snip(el, value)
}
