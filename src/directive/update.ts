import { snip } from 'js-snip'

export const update = (el: HTMLElement, { value }) => {
  snip(el, value)
}
