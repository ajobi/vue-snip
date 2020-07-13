import { elementLines } from '../element/element.lines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_SUBSENTENCE = ', '
const SEPARATOR_WORD = ' '
const ELLIPSIS = '...'

class ElementSnipper {
  constructor (el, state) {
    this.el = el
    this.state = state
    this.unprocessed = null
    this.processed = null
    this.optout = false
  }

  _snipChunks (separator) {
    if (!this.unprocessed || this.optout) {
      return this
    }

    const chunks = this.unprocessed.split(separator)
    this.unprocessed = chunks.find(chunk => {
      this.el.textContent = `${this.processed}${chunk}${ELLIPSIS}`

      if (!this._isWithinRange()) {
        return true
      }

      this.processed = `${this.processed}${chunk}${separator}`
    })

    return this
  }

  _isWithinRange () {
    return elementLines(this.el) <= this.state.elementMap.get(this.el).maxLines
  }

  initText () {
    const { fullText, maxLines } = this.state.elementMap.get(this.el)

    if (maxLines <= 0) {
      this.optout = true
      return this
    }

    this.optout = this._isWithinRange()
    this.unprocessed = fullText
    this.processed = ''

    return this
  }

  snipSentences () {
    return this._snipChunks(SEPARATOR_SENTENCE)
  }

  snipSubsentences () {
    return this._snipChunks(SEPARATOR_SUBSENTENCE)
  }

  snipWords () {
    return this._snipChunks(SEPARATOR_WORD)
  }

  addEllipsis () {
    if (this.optout) {
      return
    }

    this.el.textContent = `${this.processed.trim()}${ELLIPSIS}`
  }
}

export const snipByJS = (state, el) => {
  const { fullText } = state.elementMap.get(el)

  el.textContent = fullText
  el.style = ''

  return new ElementSnipper(el, state)
    .initText()
    .snipSentences()
    .snipSubsentences()
    .snipWords()
    .addEllipsis()
}
