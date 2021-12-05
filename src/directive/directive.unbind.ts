import { unsnip } from 'js-snip'

export const getUnbind = () => (el: HTMLElement) => {
  unsnip(el)
}
