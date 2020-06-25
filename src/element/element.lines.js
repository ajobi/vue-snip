const UA_LINE_HEIGHT = 1.2

export const elementLines = el => {
  const computedStyle = window.getComputedStyle(el)
  const computedHeight = parseInt(computedStyle.height)
  const computedLineHeight = computedStyle.lineHeight === 'normal'
    ? parseInt(computedStyle.fontSize) * UA_LINE_HEIGHT
    : parseInt(computedStyle.lineHeight)

  if (computedHeight === 0 && computedLineHeight === 0) {
    return 0
  }

  return Math.ceil(computedHeight / computedLineHeight)
}
