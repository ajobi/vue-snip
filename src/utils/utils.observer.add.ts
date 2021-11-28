import { VueSnipState, SnipText } from '../types'

export const addObserver = (state: VueSnipState, snipText: SnipText, el: HTMLElement) => {
  const elState = state.elementMap.get(el)

  const observer = elState.observer || new ResizeObserver(() => {
    if (el.clientWidth !== elState.prevWidth || el.clientHeight !== elState.prevHeight) {
      snipText(el)
    }
  })
  observer.observe(el)
  elState.observer = observer
}
