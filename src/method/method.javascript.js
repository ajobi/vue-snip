import { elementLines } from '../element/element.lines.js'

export const snipByJS = (state, el) => {
  const { fullText, maxLines } = state.elementMap.get(el)
  const { ellipsis, separators } = state.options

  el.textContent = fullText
  el.removeAttribute('style')

  if (maxLines <= 0 || elementLines(el) <= maxLines) {
    return
  }

  const snipProgress = {
    unprocessed: fullText,
    processed: ''
  }

  separators.forEach(separator => {
    for (const chunk of snipProgress.unprocessed.split(separator)) {
      el.textContent = `${snipProgress.processed}${chunk}${separator}${ellipsis}`

      if (elementLines(el) > maxLines) {
        snipProgress.unprocessed = chunk
        break
      }

      snipProgress.processed = `${snipProgress.processed}${chunk}${separator}`
    }
  })

  el.textContent = `${snipProgress.processed.trim()}${ellipsis}`
}
