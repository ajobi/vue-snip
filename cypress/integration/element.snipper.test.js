import { ElementSnipper } from '../../src/element/element.snipper'

const getMockState = (element, maxLines = 3, ellipsis = '...') => {
  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.textContent,
    maxLines: maxLines
  })

  return {
    elementMap,
    options: {
      ellipsis
    }
  }
}

describe('ElementSnipper', () => {
  beforeEach(() => {
    cy.visit('element/snipper')
  })

  describe('Complete snipping sequence', () => {
    const executeSequence = elementSnipper => elementSnipper
      .initText()
      .snipSentences()
      .snipSubsentences()
      .snipWords()
      .snipCharacters()
      .addEllipsis()

    it('snips on negative max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const elementSnipper = new ElementSnipper(paragraph, getMockState(paragraph, -1))

        executeSequence(elementSnipper)

        expect(paragraph.innerText).to.equal('')
      })
    })

    it('snips on zero max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const elementSnipper = new ElementSnipper(paragraph, getMockState(paragraph, 0))

        executeSequence(elementSnipper)

        expect(paragraph.innerText).to.equal('')
      })
    })

    it('snips on 1 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const elementSnipper = new ElementSnipper(paragraph, getMockState(paragraph, 1))

        executeSequence(elementSnipper)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum...')
      })
    })

    it('snips on 2 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const elementSnipper = new ElementSnipper(paragraph, getMockState(paragraph, 2))

        executeSequence(elementSnipper)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam ve...')
      })
    })

    it('does not snip on 10 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const elementSnipper = new ElementSnipper(paragraph, getMockState(paragraph, 10))

        executeSequence(elementSnipper)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
      })
    })
  })
})
