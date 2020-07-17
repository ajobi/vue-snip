import { defaultOptions } from '../../../src/defaultOptions'

const { maxLines, snipMethod } = defaultOptions

describe('Directive', () => {
  beforeEach(() => {
    cy.visit('/directive')
  })

  describe('Paragraph without value and parameters', () => {
    it('Does always use default maxLines', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.maxLines).to.equal(maxLines)

          cy.get('[data-cy=linesPlus]').click().then(() => {
            expect(elementState.maxLines).to.equal(maxLines)
          })
        })
      })
    })

    it('Does always use default snipping method', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.snipMethod).to.equal(snipMethod)

          cy.get('[data-cy=methodToggle]').click().then(() => {
            expect(elementState.snipMethod).to.equal(snipMethod)
          })
        })
      })
    })
  })

  describe('Paragraph with value', () => {
    it('Reflects the value changes', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.maxLines).to.equal(maxLines)

          cy.get('[data-cy=linesPlus]').click().then(() => {
            expect(elementState.maxLines).to.equal(4)
          })
        })
      })
    })
  })

  describe('Paragraph with argument', () => {
    it('Reflects the argument changes', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.snipMethod).to.equal(snipMethod)

          cy.get('[data-cy=methodToggle]').click().then(() => {
            expect(elementState.snipMethod).to.equal('js')
          })

          cy.get('[data-cy=methodToggle]').click().then(() => {
            expect(elementState.snipMethod).to.equal('css')
          })
        })
      })
    })
  })
})
