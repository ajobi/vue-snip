// https://css-tricks.com/almanac/properties/l/line-clamp/
export const snipByCSS = (state, el) => {
  const { fullText, maxLines } = state.elementMap.get(el)

  el.textContent = fullText
  el.style = `display: -webkit-box; -webkit-line-clamp: ${maxLines}; -webkit-box-orient: vertical; overflow: hidden;`
}
