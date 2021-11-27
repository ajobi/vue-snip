import { snipByJS } from '../../instrumented/method'
import { defaultOptions as options } from '../../instrumented/defaultOptions'

const getMockState = (element, maxLines = 3) => {
  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.textContent,
    maxLines: maxLines
  })

  return {
    elementMap,
    options
  }
}

describe('snipByJS', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/method.html')
  })

  it('Snips on negative max lines', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      snipByJS(getMockState(paragraph, -1), paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
    })
  })

  it('Snips on zero max lines', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      snipByJS(getMockState(paragraph, 0), paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
    })
  })

  it('Snips on 1 max lines', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      snipByJS(getMockState(paragraph, 1), paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earu.\u200A.\u200A.')
    })
  })

  it('Snips on 2 max lines', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      snipByJS(getMockState(paragraph, 2), paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam ve.\u200A.\u200A.')
    })
  })

  it('Does not snip on 10 max lines', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      snipByJS(getMockState(paragraph, 10), paragraph)

      expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
    })
  })

  it('Maintains the original style attributes', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const originalColor = paragraph.style.color

      snipByJS(getMockState(paragraph, 2), paragraph)

      expect(paragraph.style.color).to.equal(originalColor)
    })
  })
})
