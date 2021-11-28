import { destroyObserver } from '../utils/index'

export const getUnbind = (state) => (el) => {
  const { elementMap } = state

  destroyObserver(state, el)
  elementMap.delete(el)
}
