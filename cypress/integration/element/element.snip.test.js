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

  describe('CSS Method', () => {
    it('Snips on negative max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, -1, 'css'))
        const oldLines = elementLines(paragraph)

        snipText(paragraph)

        expect(elementLines(paragraph)).to.equal(oldLines)
      })
    })

    it('Snips on zero max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 0, 'css'))
        const oldLines = elementLines(paragraph)

        snipText(paragraph)

        expect(elementLines(paragraph)).to.equal(oldLines)
      })
    })

    it('Snips on 1 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 1, 'css'))

        snipText(paragraph)

        expect(elementLines(paragraph)).to.equal(1)
      })
    })

    it('Snips on 2 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 2, 'css'))

        snipText(paragraph)

        expect(elementLines(paragraph)).to.equal(2)
      })
    })

    it('Does not snip on 10 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 10, 'css'))
        const oldLines = elementLines(paragraph)

        snipText(paragraph)

        expect(elementLines(paragraph)).to.equal(oldLines)
      })
    })
  })

  describe('JS Method', () => {
    it('Snips on negative max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, -1, 'js'))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
      })
    })

    it('Snips on zero max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 0, 'js'))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
      })
    })

    it('Snips on 1 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 1, 'js'))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum...')
      })
    })

    it('Snips on 2 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 2, 'js'))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam...')
      })
    })

    it('Does not snip on 10 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 10, 'js'))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
      })
    })
  })

  describe('Unknown Method', () => {
    it('Does not snip anything', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, null, 'unknown method'))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
      })
    })
  })
})
