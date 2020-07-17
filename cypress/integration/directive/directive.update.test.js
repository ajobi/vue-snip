import { elementLines } from '../../../src/element/element.lines'

describe('Directive Update', () => {
  beforeEach(() => {
    cy.visit('/directive')
  })

  it('Updates the map record of the element', () => {
    cy.window().then(window => {
      const { elementMap } = window.__VueSnipState
      cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
        expect(elementMap.get(paragraph).maxLines).to.equal(3)
        expect(elementMap.get(paragraph).snipMethod).to.equal('css')

        cy.get('[data-cy=linesPlus]').click().then(() => {
          expect(elementMap.get(paragraph).maxLines).to.equal(4)
        })

        cy.get('[data-cy=methodToggle]').click().then(() => {
          expect(elementMap.get(paragraph).snipMethod).to.equal('js')
        })
      })
    })
  })

  it('Snips the element', () => {
    cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(10, () => {
        expect(elementLines(paragraph)).equal(3)
      })

      cy.get('[data-cy=linesPlus]').click().then(() => {
        expect(elementLines(paragraph)).equal(4)
      })
    })
  })
})
