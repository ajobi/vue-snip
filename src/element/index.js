import { ElementSnipper } from './element.snipper.js'

export const getSnipText = (state) => (el) => {
  const { elementMap } = state

  if (elementMap.get(el).maxLines <= 0) {
    el.innerText = ''
    return
  }

  const snipper = new ElementSnipper(el, elementMap)
  if (snipper.isWithinRange()) {
    return
  }

  snipper
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .ellipsis()
}
