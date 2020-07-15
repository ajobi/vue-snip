import { elementLines } from '../element/element.lines.js'

const ELLIPSIS = '...'
const SEPARATORS = ['. ', ', ', ' ', '']

export const snipByJS = (state, el) => {
  const { fullText, maxLines } = state.elementMap.get(el)

  el.textContent = fullText
  el.style = ''

  if (maxLines <= 0 || elementLines(el) <= maxLines) {
    return
  }

  const snipProgress = {
    unprocessed: fullText,
    processed: ''
  }

  SEPARATORS.forEach(separator => {
    snipProgress.unprocessed = snipProgress.unprocessed.split(separator).find(chunk => {
      el.textContent = `${snipProgress.processed}${chunk}${ELLIPSIS}`

      if (elementLines(el) > maxLines) {
        return true
      }

      snipProgress.processed = `${snipProgress.processed}${chunk}${separator}`
    })
  })

  el.textContent = `${snipProgress.processed.trim()}${ELLIPSIS}`
}
