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
    snipProgress.unprocessed = snipProgress.unprocessed.split(separator).filter(chunk => {
      el.textContent = `${snipProgress.processed}${chunk}${ellipsis}`

      if (elementLines(el) > maxLines) {
        return true
      }

      snipProgress.processed = `${snipProgress.processed}${chunk}${separator}`
    })[0]
  })

  el.textContent = `${snipProgress.processed.trim()}${ellipsis}`
}
