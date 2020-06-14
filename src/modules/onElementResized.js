import { ElementSnipper } from './ElementSnipper.js'

export const snipElement = (el) => {
  new ElementSnipper(el)
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .applyEllipsis()
}
