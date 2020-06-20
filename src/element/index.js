import { ElementSnipper } from './element.snipper.js'

export const getSnipText = (state) => (el) =>
  new ElementSnipper(el, state)
    .initText()
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .addEllipsis()
