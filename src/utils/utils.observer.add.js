export const addObserver = (state, snipText, el) => {
  const elState = state.elementMap.get(el)

  const observer = elState.observer || new ResizeObserver(([entry]) => {
    if (entry.contentRect.width !== elState.prevWidth) {
      snipText(el)
      elState.prevWidth = el.clientWidth
    }
  })
  observer.observe(el)

  elState.observer = observer
}
