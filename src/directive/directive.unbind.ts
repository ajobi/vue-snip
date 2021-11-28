import { destroyObserver } from '../utils/index'
import { VueSnipState } from '../index'

export const getUnbind = (state: VueSnipState) => (el: HTMLElement) => {
  const { elementMap } = state

  destroyObserver(state, el)
  elementMap.delete(el)
}
