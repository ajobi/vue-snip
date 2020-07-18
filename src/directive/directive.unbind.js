export const getUnbind = (state) => (el) => {
  const { elementMap } = state

  const { observer } = elementMap.get(el)
  observer && observer.disconnect()
  elementMap.delete(el)
}
