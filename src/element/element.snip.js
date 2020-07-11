import { elementLines } from './element.lines.js'

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

    // strip trailing spaces, commas, and dots before ellipsis is applied
    while ([' ', '.', ','].includes(this.processed[this.processed.length - 1])) {
      this.processed = this.processed.substring(0, this.processed.length - 1)
    }

    this.el.textContent = `${this.processed}${ELLIPSIS}`
  }
}

export const getSnipText = (state) => (el) => {
  const { fullText, maxLines, snipMethod } = state.elementMap.get(el)

  el.textContent = fullText

  if (snipMethod === 'css') {
    // https://css-tricks.com/almanac/properties/l/line-clamp/
    el.style = `display: -webkit-box; -webkit-line-clamp: ${maxLines}; -webkit-box-orient: vertical; overflow: hidden;`
    return
  }

  if (snipMethod === 'js') {
    el.style = ''
    return new ElementSnipper(el, state)
      .initText()
      .snipSentences()
      .snipSubsentences()
      .snipWords()
      .addEllipsis()
  }
}
