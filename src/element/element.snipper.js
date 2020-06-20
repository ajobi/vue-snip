import { elementLines } from './element.lines.js'

const SEPARATOR_SENTENCE = '. '
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
      this.el.innerText = `${this.processed}${chunk}${this.state.options.ellipsis}`

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
    const { fullText } = this.state.elementMap.get(this.el)

    this.el.innerText = fullText

    this.optout = this._isWithinRange()
    this.unprocessed = fullText
    this.processed = ''

    return this
  }

  snipSentences () {
    return this._snipChunks(SEPARATOR_SENTENCE)
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

    this.el.innerText = `${this.processed}${this.state.options.ellipsis}`
  }
}
