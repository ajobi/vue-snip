export const getUnbind = (state) => (el) => {
  const { elementMap } = state

  elementMap.delete(el)
  elementMap.get(el).observer.disconnect()
}
