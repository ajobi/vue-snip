import { snip } from 'js-snip'

export const getUpdate = () => (el: HTMLElement, { value, arg }) => {
  snip(el, { maxLines: value, method: arg })
}
