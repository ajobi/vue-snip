import { elementLines } from './element.lines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_SUBSENTENCE = ', '
const SEPARATOR_WORD = ' '
const SEPARATOR_LETTER = ''

export class ElementSnipper {
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
      this.el.textContent = `${this.processed}${chunk}${this.state.options.ellipsis}`

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
      this.el.textContent = ''
      this.optout = true
      return this
    }

    this.el.textContent = fullText

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

  snipCharacters () {
    return this._snipChunks(SEPARATOR_LETTER)
  }

  addEllipsis () {
    if (this.optout) {
      return
    }

    // strip trailing spaces, commas, and dots before ellipsis is applied
    while ([' ', '.', ','].includes(this.processed[this.processed.length - 1])) {
      this.processed = this.processed.substring(0, this.processed.length - 1)
    }

    this.el.textContent = `${this.processed}${this.state.options.ellipsis}`
  }
}
