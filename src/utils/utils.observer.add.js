export const addObserver = (state, snipText, el) => {
  const elState = state.elementMap.get(el)

  const observer = elState.observer || new ResizeObserver(() => {
    if (el.clientWidth !== elState.prevWidth || el.clientHeight !== elState.prevHeight) {
      snipText(el)
    }
  })
  observer.observe(el)
  elState.observer = observer
}
