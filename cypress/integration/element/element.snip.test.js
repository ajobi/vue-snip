import { getSnipText } from '../../../src/element/element.snip'
import { elementLines } from '../../../src/element/element.lines'

const getMockState = (element, maxLines = 3, snipMethod = 'css') => {
  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.textContent,
    maxLines: maxLines,
    snipMethod: snipMethod
  })

  return {
    elementMap
  }
}

describe('snipText', () => {
  beforeEach(() => {
    cy.visit('element/snip')
  })

  it('Does snip with CSS method', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const snipText = getSnipText(getMockState(paragraph, 2, 'css'))

      snipText(paragraph)

      expect(elementLines(paragraph)).to.equal(2)
    })
  })

  it('Does snip with JS method', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const snipText = getSnipText(getMockState(paragraph, 2, 'js'))

      snipText(paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam ve...')
    })
  })

  it('Does not snip on undefined method', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const snipText = getSnipText(getMockState(paragraph, null, 'unknown method'))

      snipText(paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
    })
  })
})
