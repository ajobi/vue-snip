// https://css-tricks.com/almanac/properties/l/line-clamp/
import { VueSnipState } from '../types'

export const snipByCSS = (state: VueSnipState, el: HTMLElement) => {
  const { fullText, maxLines } = state.elementMap.get(el)

  el.textContent = fullText
  el.style.display = '-webkit-box'
  el.style.webkitLineClamp = maxLines.toString()
  el.style.webkitBoxOrient = 'vertical'
  el.style.overflow = 'hidden'
}
