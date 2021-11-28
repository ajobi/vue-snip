export const destroyObserver = (state, el) => {
  const elState = state.elementMap.get(el)

  elState.observer && elState.observer.disconnect()
  elState.observer && delete elState.prevWidth
  elState.observer && delete elState.prevHeight
  elState.observer && delete elState.observer
}
