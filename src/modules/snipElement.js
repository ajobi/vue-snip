import { ElementSnipper } from './ElementSnipper.js'

export const snipElement = (el) => {
  if (el.__snipText.maxLines <= 0) {
    el.innerText = ''
    return
  }

  new ElementSnipper(el)
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .ellipsis()
}
