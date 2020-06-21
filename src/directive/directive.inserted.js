export const getInserted = (state, snipText) => (el, { value }) => {
  const { elementMap } = state

  const observer = new ResizeObserver(() => snipText(el))
  observer.observe(el)

  elementMap.set(el, {
    observer: observer,
    fullText: el.textContent,
    maxLines: value
  })
}
