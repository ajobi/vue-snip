import { ElementSnipper } from './element.snipper.js'

export const getSnipText = (state) => (el) => {
  const { elementMap } = state

  if (elementMap.get(el).maxLines <= 0) {
    el.innerText = ''
    return
  }

  new ElementSnipper(el, state)
    .initText()
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .ellipsis()
}
