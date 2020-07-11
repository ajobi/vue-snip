export const normalizeMaxLines = (maxLines) => {
  const parsedMaxLines = parseInt(maxLines)
  return Number.isNaN(parsedMaxLines) ? 0 : parsedMaxLines
}
