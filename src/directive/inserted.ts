import { snip } from 'js-snip'

export const inserted = (el: HTMLElement, { value }) => {
  const { lines, mode, midWord, ellipsis, onSnipped } = value
  snip(el, { lines, mode, midWord, ellipsis }, onSnipped)
}
