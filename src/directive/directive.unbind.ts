import { destroyObserver } from '../utils'
import { VueSnipState } from '../types'

export const getUnbind = (state: VueSnipState) => (el: HTMLElement) => {
  const { elementMap } = state

  destroyObserver(state, el)
  elementMap.delete(el)
}
