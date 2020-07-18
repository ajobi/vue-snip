import { destroyObserver } from '../utils'

export const getUnbind = (state) => (el) => {
  const { elementMap } = state

  destroyObserver(state, el)
  elementMap.delete(el)
}
